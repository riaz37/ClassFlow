import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActivityLog, ActivityLogDocument } from './schemas/activity-log.schema';

@Injectable()
export class ActivitiesLogService {
    constructor(
        @InjectModel(ActivityLog.name) private activityLogModel: Model<ActivityLogDocument>,
    ) { }

    async create(title: string, description: string, userId: string, role: string) {
        return this.activityLogModel.create({
            title,
            description,
            user: userId,
            role,
        });
    }

    async findAll(limit = 10) {
        return this.activityLogModel
            .find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('user', 'name role')
            .exec();
    }
}
