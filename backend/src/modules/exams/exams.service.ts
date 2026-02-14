import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exam, ExamDocument, Submission, SubmissionDocument } from './schemas/exam.schema';

@Injectable()
export class ExamsService {
    constructor(
        @InjectModel(Exam.name) private examModel: Model<ExamDocument>,
        @InjectModel(Submission.name) private submissionModel: Model<SubmissionDocument>
    ) { }

    async create(createExamDto: any): Promise<Exam> {
        const createdExam = new this.examModel(createExamDto);
        return createdExam.save();
    }

    async findAll(): Promise<Exam[]> {
        return this.examModel.find().populate('class subject').exec();
    }

    async findOne(id: string): Promise<Exam> {
        const exam = await this.examModel.findById(id).populate('class subject questions').exec();
        if (!exam) {
            throw new NotFoundException(`Exam with ID ${id} not found`);
        }
        return exam;
    }

    async findByClass(classId: string): Promise<Exam[]> {
        return this.examModel.find({ class: classId }).populate('subject').exec();
    }

    async update(id: string, updateExamDto: any): Promise<Exam> {
        const updatedExam = await this.examModel.findByIdAndUpdate(id, updateExamDto, { new: true }).exec();
        if (!updatedExam) {
            throw new NotFoundException(`Exam with ID ${id} not found`);
        }
        return updatedExam;
    }

    async remove(id: string): Promise<any> {
        const result = await this.examModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Exam with ID ${id} not found`);
        }
        return { deleted: true };
    }

    // Submissions
    async getSubmissions(examId: string): Promise<Submission[]> {
        return this.submissionModel.find({ exam: examId }).populate('student').exec();
    }
}
