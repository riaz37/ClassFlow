import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TimetableDocument = Timetable & Document;

@Schema({ timestamps: true })
export class Timetable {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Class', required: true })
    class: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'AcademicYear', required: true })
    academicYear: string;

    @Prop({ type: Array, required: true })
    schedule: any[]; // Array of days/periods
}

export const TimetableSchema = SchemaFactory.createForClass(Timetable);
TimetableSchema.index({ class: 1, academicYear: 1 }, { unique: true });
