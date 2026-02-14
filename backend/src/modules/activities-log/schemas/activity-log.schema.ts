import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ActivityLogDocument = ActivityLog & Document;

@Schema({ timestamps: true })
export class ActivityLog {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    user: string;

    @Prop()
    role: string;
}

export const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog);
