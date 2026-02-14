import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class, ClassDocument } from './schemas/class.schema';
import { CreateClassDto, UpdateClassDto } from './dto/class.dto';

@Injectable()
export class ClassesService {
    constructor(@InjectModel(Class.name) private classModel: Model<ClassDocument>) { }

    async create(createDto: CreateClassDto): Promise<Class> {
        try {
            const created = new this.classModel(createDto);
            return await created.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException('Class with this name already exists in the academic year');
            }
            throw error;
        }
    }

    async findAll(): Promise<Class[]> {
        return this.classModel
            .find()
            .populate('academicYear', 'name')
            .populate('classTeacher', 'name email')
            .populate('subjects', 'name code')
            .exec();
    }

    async findOne(id: string): Promise<Class> {
        const classDoc = await this.classModel
            .findById(id)
            .populate('academicYear')
            .populate('classTeacher', 'name email')
            .populate('subjects')
            .populate('students', 'name email')
            .exec();

        if (!classDoc) throw new NotFoundException('Class not found');
        return classDoc;
    }

    async update(id: string, updateDto: UpdateClassDto): Promise<Class> {
        const updated = await this.classModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .populate('academicYear')
            .populate('classTeacher')
            .populate('subjects')
            .exec();

        if (!updated) throw new NotFoundException('Class not found');
        return updated;
    }

    async remove(id: string): Promise<void> {
        const result = await this.classModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) throw new NotFoundException('Class not found');
    }
}
