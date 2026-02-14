import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsArray, IsBoolean, MinLength } from 'class-validator';
import { UserRole } from '../schemas/user.schema';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: string;

    @IsOptional()
    @IsString()
    studentClass?: string;

    @IsOptional()
    @IsArray()
    teacherSubject?: string[];

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: string;

    @IsOptional()
    @IsString()
    studentClass?: string;

    @IsOptional()
    @IsArray()
    teacherSubject?: string[];

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
