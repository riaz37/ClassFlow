import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ActivitiesLogService } from './activities-log.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../modules/users/schemas/user.schema';

@Controller('activities-log')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ActivitiesLogController {
    constructor(private readonly activitiesLogService: ActivitiesLogService) { }

    @Get()
    @Roles(UserRole.ADMIN)
    findAll(@Query('limit') limit: string) {
        return this.activitiesLogService.findAll(parseInt(limit) || 10);
    }
}
