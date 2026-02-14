import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAcademicYearDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    fromYear: string;

    @IsNotEmpty()
    @IsString()
    toYear: string;

    @IsOptional()
    @IsBoolean()
    isCurrent?: boolean;
}

export class UpdateAcademicYearDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    fromYear?: string;

    @IsOptional()
    @IsString()
    toYear?: string;

    @IsOptional()
    @IsBoolean()
    isCurrent?: boolean;
}
