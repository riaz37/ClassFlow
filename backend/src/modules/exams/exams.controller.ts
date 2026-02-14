import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../modules/users/schemas/user.schema';

@Controller('exams')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExamsController {
    constructor(private readonly examsService: ExamsService) { }

    @Post()
    @Roles(UserRole.TEACHER, UserRole.ADMIN)
    create(@Body() createDto: any) {
        return this.examsService.create(createDto);
    }

    @Get()
    findAll() {
        return this.examsService.findAll();
    }

    @Get('class/:classId')
    findByClass(@Param('classId') classId: string) {
        return this.examsService.findByClass(classId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.examsService.findOne(id);
    }

    @Get(':id/submissions')
    @Roles(UserRole.TEACHER, UserRole.ADMIN)
    getSubmissions(@Param('id') id: string) {
        return this.examsService.getSubmissions(id);
    }

    @Put(':id')
    @Roles(UserRole.TEACHER, UserRole.ADMIN)
    update(@Param('id') id: string, @Body() updateDto: any) {
        return this.examsService.update(id, updateDto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string) {
        return this.examsService.remove(id);
    }
}
