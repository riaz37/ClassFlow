import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AcademicYearDocument = AcademicYear & Document;

@Schema({ timestamps: true })
export class AcademicYear {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    fromYear: string;

    @Prop({ required: true })
    toYear: string;

    @Prop({ default: false })
    isCurrent: boolean;
}

export const AcademicYearSchema = SchemaFactory.createForClass(AcademicYear);
