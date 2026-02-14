import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Class, ClassDocument } from '../classes/schemas/class.schema';
import { Subject, SubjectDocument } from '../subjects/schemas/subject.schema';
import { ActivitiesLogService } from '../activities-log/activities-log.service';

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Class.name) private classModel: Model<ClassDocument>,
        @InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>,
        private readonly activitiesLogService: ActivitiesLogService,
    ) { }

    async getStats() {
        const totalStudents = await this.userModel.countDocuments({ role: 'student' });
        const totalTeachers = await this.userModel.countDocuments({ role: 'teacher' });
        const totalForce = await this.userModel.countDocuments(); // Should this be total users? Yes.
        const totalClasses = await this.classModel.countDocuments();
        const recentActivities = await this.activitiesLogService.findAll(5);

        return {
            totalStudents,
            totalTeachers,
            totalClasses,
            totalForce, // Total users
            recentActivities,
        };
    }
}
