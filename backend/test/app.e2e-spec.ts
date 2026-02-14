import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../src/modules/users/users.service';
import { UserRole } from '../src/modules/users/schemas/user.schema';
import cookieParser from 'cookie-parser';

describe('End-to-End Test Suite', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let usersService: UsersService;

  // Auth & Users
  let adminToken: string;
  let teacherToken: string;
  let studentToken: string;
  let adminId: string;
  let teacherId: string;
  let studentId: string;

  // Academic Data
  let academicYearId: string;
  let subjectId: string;
  let classId: string;

  // Feature Data
  let timetableId: string;
  let examId: string;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    process.env.MONGO_URI = uri;
    process.env.JWT_SECRET = 'test-secret';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: (key: string) => {
          if (key === 'MONGO_URI') return uri;
          if (key === 'JWT_SECRET') return 'test-secret';
          return null;
        }
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    usersService = app.get<UsersService>(UsersService);

    // 1. Seed Admin
    const admin = await usersService.create({
      name: 'Admin User',
      email: 'admin@school.com',
      password: 'password123',
      role: UserRole.ADMIN,
    });
    adminId = (admin as any)._id.toString();
  });

  afterAll(async () => {
    await app.close();
    await mongod.stop();
  });

  describe('1. Authentication Flow', () => {
    it('should login as Admin and receive JWT cookie', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({ email: 'admin@school.com', password: 'password123' })
        .expect(201);

      const cookies = res.get('Set-Cookie');
      expect(cookies).toBeDefined();
      const jwtCookie = cookies.find((c: string) => c.startsWith('jwt='));
      expect(jwtCookie).toBeDefined();
      adminToken = jwtCookie.split(';')[0].split('=')[1];
    });

    it('should get Admin profile using JWT', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/users/profile')
        .set('Cookie', [`jwt=${adminToken}`])
        .expect(200);

      expect(res.body.email).toEqual('admin@school.com');
    });

    it('should register a Teacher (Admin only)', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/users/register')
        .set('Cookie', [`jwt=${adminToken}`])
        .send({
          name: 'Teacher User',
          email: 'teacher@school.com',
          password: 'password123',
          role: UserRole.TEACHER
        })
        .expect(201);

      teacherId = res.body._id;
      expect(res.body.role).toEqual(UserRole.TEACHER);
    });

    it('should login as Teacher', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({ email: 'teacher@school.com', password: 'password123' })
        .expect(201);

      const cookies = res.get('Set-Cookie');
      const jwtCookie = cookies.find((c: string) => c.startsWith('jwt='));
      teacherToken = jwtCookie.split(';')[0].split('=')[1];
    });

    it('should register a Student (Admin only)', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/users/register')
        .set('Cookie', [`jwt=${adminToken}`])
        .send({
          name: 'Student User',
          email: 'student@school.com',
          password: 'password123',
          role: UserRole.STUDENT
        })
        .expect(201);

      studentId = res.body._id;
      expect(res.body.role).toEqual(UserRole.STUDENT);
    });

    it('should login as Student', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({ email: 'student@school.com', password: 'password123' })
        .expect(201);

      const cookies = res.get('Set-Cookie');
      const jwtCookie = cookies.find((c: string) => c.startsWith('jwt='));
      studentToken = jwtCookie.split(';')[0].split('=')[1];
    });
  });

  describe('2. Academic Management Flow', () => {
    it('should create an Academic Year (Admin only)', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/academic-years')
        .set('Cookie', [`jwt=${adminToken}`])
        .send({
          name: '2023-2024',
          fromYear: '2023',
          toYear: '2024',
          isCurrent: true
        })
        .expect(201);

      academicYearId = res.body._id;
      expect(res.body.name).toEqual('2023-2024');
    });

    it('should create a Subject (Admin only)', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/subjects')
        .set('Cookie', [`jwt=${adminToken}`])
        .send({
          name: 'Mathematics',
          code: 'MATH101',
          department: 'Science',
          credits: 3,
          teachers: [teacherId]
        })
        .expect(201);

      subjectId = res.body._id;
      expect(res.body.code).toEqual('MATH101');
    });

    it('should create a Class (Admin only)', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/classes')
        .set('Cookie', [`jwt=${adminToken}`])
        .send({
          name: 'Class 1A',
          academicYear: academicYearId,
          teacher: teacherId,
          subjects: [subjectId],
          students: [studentId]
        })
        .expect(201);

      classId = res.body._id;
      expect(res.body.name).toEqual('Class 1A');
    });
  });

  describe('3. Features Flow', () => {
    it('should create a Timetable manually (Admin only)', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/timetables')
        .set('Cookie', [`jwt=${adminToken}`])
        .send({
          class: classId,
          academicYear: academicYearId,
          schedule: [
            { day: 'Monday', slots: [{ time: '09:00', subject: subjectId, teacher: teacherId }] }
          ]
        })
        .expect(201);

      timetableId = res.body._id;
    });

    it('should fetch Timetable by Class', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/timetables/class/${classId}`)
        .set('Cookie', [`jwt=${studentToken}`])
        .expect(200);

      expect(res.body.class._id).toEqual(classId);
    });

    it('should create an Exam (Teacher only)', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/exams')
        .set('Cookie', [`jwt=${teacherToken}`])
        .send({
          title: 'Math Midterm',
          subject: subjectId,
          class: classId,
          date: new Date().toISOString(),
          duration: 60,
          totalMarks: 100,
          questions: [],
          topic: 'Algebra',
          difficulty: 'Medium'
        })
        .expect(201);

      examId = res.body._id;
      expect(res.body.title).toEqual('Math Midterm');
    });

    it('should fetch Exams for Class', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/exams/class/${classId}`)
        .set('Cookie', [`jwt=${studentToken}`])
        .expect(200);

      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]._id).toEqual(examId);
    });
  });

  describe('4. Dashboard Flow', () => {
    it('should get Dashboard Overview (Admin only)', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/dashboard/overview')
        .set('Cookie', [`jwt=${adminToken}`])
        .expect(200);

      expect(res.body).toHaveProperty('totalUsers');
      expect(res.body).toHaveProperty('totalClasses');
    });
  });
});
