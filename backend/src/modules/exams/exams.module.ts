import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamsController } from './exams.controller';
import { ExamsService } from './exams.service';
import { Exam, ExamSchema, Submission, SubmissionSchema } from './schemas/exam.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exam.name, schema: ExamSchema },
      { name: Submission.name, schema: SubmissionSchema },
    ]),
  ],
  controllers: [ExamsController],
  providers: [ExamsService],
})
export class ExamsModule { }
