import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject, SubjectDocument } from './schemas/subject.schema';
import { CreateSubjectDto, UpdateSubjectDto } from './dto/subject.dto';

@Injectable()
export class SubjectsService {
    constructor(
        @InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>,
    ) { }

    async create(createDto: CreateSubjectDto): Promise<Subject> {
        const existing = await this.subjectModel.findOne({ code: createDto.code });
        if (existing) {
            throw new BadRequestException('Subject with this code already exists');
        }
        const created = new this.subjectModel(createDto);
        return created.save();
    }

    async findAll(): Promise<Subject[]> {
        return this.subjectModel.find().populate('teachers', 'name email').exec();
    }

    async findOne(id: string): Promise<Subject> {
        const subject = await this.subjectModel.findById(id).populate('teachers', 'name email').exec();
        if (!subject) throw new NotFoundException('Subject not found');
        return subject;
    }

    async update(id: string, updateDto: UpdateSubjectDto): Promise<Subject> {
        const updated = await this.subjectModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .exec();
        if (!updated) throw new NotFoundException('Subject not found');
        return updated;
    }

    async remove(id: string): Promise<void> {
        const result = await this.subjectModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) throw new NotFoundException('Subject not found');
    }
}
