import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { TimetablesService } from './timetables.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../modules/users/schemas/user.schema';

@Controller('timetables')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TimetablesController {
    constructor(private readonly timetablesService: TimetablesService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    create(@Body() createDto: any) {
        return this.timetablesService.create(createDto);
    }

    @Get()
    findAll() {
        return this.timetablesService.findAll();
    }

    @Get('class/:classId')
    findByClass(@Param('classId') classId: string) {
        return this.timetablesService.findByClass(classId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.timetablesService.findOne(id);
    }

    @Put(':id')
    @Roles(UserRole.ADMIN)
    update(@Param('id') id: string, @Body() updateDto: any) {
        return this.timetablesService.update(id, updateDto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string) {
        return this.timetablesService.remove(id);
    }
}
