import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ClassDocument = Class & Document;

@Schema({ timestamps: true })
export class Class {
    @Prop({ required: true })
    name: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'AcademicYear', required: true })
    academicYear: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    classTeacher: string;

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Subject' }])
    subjects: string[];

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User' }])
    students: string[];

    @Prop({ default: 40 })
    capacity: number;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
ClassSchema.index({ name: 1, academicYear: 1 }, { unique: true });
