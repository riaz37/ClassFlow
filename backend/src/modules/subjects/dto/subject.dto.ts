import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsString()
    department: string;

    @IsOptional()
    @IsNumber()
    credits?: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    teachers?: string[];
}

export class UpdateSubjectDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    code?: string;

    @IsOptional()
    @IsString()
    department?: string;

    @IsOptional()
    @IsNumber()
    credits?: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    teachers?: string[];
}
