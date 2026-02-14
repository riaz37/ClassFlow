import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitiesLogController } from './activities-log.controller';
import { ActivitiesLogService } from './activities-log.service';
import { ActivityLog, ActivityLogSchema } from './schemas/activity-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ActivityLog.name, schema: ActivityLogSchema }]),
  ],
  controllers: [ActivitiesLogController],
  providers: [ActivitiesLogService],
  exports: [ActivitiesLogService],
})
export class ActivitiesLogModule { }
