import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClassDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    academicYear: string;

    @IsOptional()
    @IsString()
    classTeacher?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    subjects?: string[];

    @IsOptional()
    @IsNumber()
    capacity?: number;
}

export class UpdateClassDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    academicYear?: string;

    @IsOptional()
    @IsString()
    classTeacher?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    subjects?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    students?: string[];

    @IsOptional()
    @IsNumber()
    capacity?: number;
}
