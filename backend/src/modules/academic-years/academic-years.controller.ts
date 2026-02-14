import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { AcademicYearsService } from './academic-years.service';
import { CreateAcademicYearDto, UpdateAcademicYearDto } from './dto/academic-year.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../modules/users/schemas/user.schema';

@Controller('academic-years')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AcademicYearsController {
    constructor(private readonly academicYearsService: AcademicYearsService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    create(@Body() createDto: CreateAcademicYearDto) {
        return this.academicYearsService.create(createDto);
    }

    @Get()
    findAll() {
        return this.academicYearsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.academicYearsService.findOne(id);
    }

    @Put(':id')
    @Roles(UserRole.ADMIN)
    update(@Param('id') id: string, @Body() updateDto: UpdateAcademicYearDto) {
        return this.academicYearsService.update(id, updateDto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string) {
        return this.academicYearsService.remove(id);
    }
}
