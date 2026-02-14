import { Test, TestingModule } from '@nestjs/testing';
import { InngestService } from './inngest.service';
import { getModelToken } from '@nestjs/mongoose';
import { Class } from '../modules/classes/schemas/class.schema';
import { User } from '../modules/users/schemas/user.schema';
import { Timetable } from '../modules/timetables/schemas/timetable.schema';
import { Exam, Submission } from '../modules/exams/schemas/exam.schema';

describe('InngestService', () => {
  let service: InngestService;

  const mockModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOneAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InngestService,
        { provide: getModelToken(Class.name), useValue: mockModel },
        { provide: getModelToken(User.name), useValue: mockModel },
        { provide: getModelToken(Timetable.name), useValue: mockModel },
        { provide: getModelToken(Exam.name), useValue: mockModel },
        { provide: getModelToken(Submission.name), useValue: mockModel },
      ],
    }).compile();

    service = module.get<InngestService>(InngestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
