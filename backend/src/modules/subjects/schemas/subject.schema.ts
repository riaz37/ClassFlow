import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SubjectDocument = Subject & Document;

@Schema({ timestamps: true })
export class Subject {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    code: string;

    @Prop({ required: true })
    department: string;

    @Prop({ type: Number, default: 0 })
    credits: number;

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User' }])
    teachers: string[];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
