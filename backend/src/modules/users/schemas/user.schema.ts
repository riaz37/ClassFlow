import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export enum UserRole {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    STUDENT = 'student',
    PARENT = 'parent',
}

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: UserRole, default: UserRole.STUDENT })
    role: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Class' })
    studentClass?: string;

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Subject' }])
    teacherSubject?: string[];

    async matchPassword(enteredPassword: string): Promise<boolean> {
        return await bcrypt.compare(enteredPassword, this.password);
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre("save", async function (next: any) {
    const user = this as UserDocument;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};
