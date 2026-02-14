import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto, UpdateClassDto } from './dto/class.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../modules/users/schemas/user.schema';

@Controller('classes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClassesController {
    constructor(private readonly classesService: ClassesService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    create(@Body() createDto: CreateClassDto) {
        return this.classesService.create(createDto);
    }

    @Get()
    findAll() {
        return this.classesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.classesService.findOne(id);
    }

    @Put(':id')
    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    update(@Param('id') id: string, @Body() updateDto: UpdateClassDto) {
        return this.classesService.update(id, updateDto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string) {
        return this.classesService.remove(id);
    }
}
