import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto, UpdateSubjectDto } from './dto/subject.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../modules/users/schemas/user.schema';

@Controller('subjects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubjectsController {
    constructor(private readonly subjectsService: SubjectsService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    create(@Body() createDto: CreateSubjectDto) {
        return this.subjectsService.create(createDto);
    }

    @Get()
    findAll() {
        return this.subjectsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.subjectsService.findOne(id);
    }

    @Put(':id')
    @Roles(UserRole.ADMIN)
    update(@Param('id') id: string, @Body() updateDto: UpdateSubjectDto) {
        return this.subjectsService.update(id, updateDto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string) {
        return this.subjectsService.remove(id);
    }
}
