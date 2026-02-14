import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InngestController } from './inngest.controller';
import { InngestService } from './inngest.service';
import { Class, ClassSchema } from '../modules/classes/schemas/class.schema';
import { User, UserSchema } from '../modules/users/schemas/user.schema';
import { Timetable, TimetableSchema } from '../modules/timetables/schemas/timetable.schema';
import { Exam, ExamSchema, Submission, SubmissionSchema } from '../modules/exams/schemas/exam.schema';
import { Subject, SubjectSchema } from '../modules/subjects/schemas/subject.schema';
import { AcademicYear, AcademicYearSchema } from '../modules/academic-years/schemas/academic-year.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: User.name, schema: UserSchema },
      { name: Timetable.name, schema: TimetableSchema },
      { name: Exam.name, schema: ExamSchema },
      { name: Submission.name, schema: SubmissionSchema },
      { name: Subject.name, schema: SubjectSchema },
      { name: AcademicYear.name, schema: AcademicYearSchema },
    ]),
  ],
  controllers: [InngestController],
  providers: [InngestService],
})
export class InngestModule { }
