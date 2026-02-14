import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ExamDocument = Exam & Document;
export type SubmissionDocument = Submission & Document;

@Schema({ timestamps: true })
export class Exam {
    @Prop({ required: true })
    title: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Subject', required: true })
    subject: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Class', required: true })
    class: string;

    @Prop({ required: true })
    topic: string;

    @Prop({ required: true, enum: ['Easy', 'Medium', 'Hard'] })
    difficulty: string;

    @Prop({ type: Array, default: [] })
    questions: any[];

    @Prop({ default: false })
    isActive: boolean;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    createdBy: string;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);

@Schema({ timestamps: true })
export class Submission {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Exam', required: true })
    exam: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    student: string;

    @Prop({ type: Array, required: true })
    answers: any[];

    @Prop({ default: 0 })
    score: number;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
SubmissionSchema.index({ exam: 1, student: 1 }, { unique: true });
