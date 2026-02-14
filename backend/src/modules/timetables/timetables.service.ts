import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Timetable, TimetableDocument } from './schemas/timetable.schema';

@Injectable()
export class TimetablesService {
    constructor(@InjectModel(Timetable.name) private timetableModel: Model<TimetableDocument>) { }

    async create(createTimetableDto: any): Promise<Timetable> {
        const createdTimetable = new this.timetableModel(createTimetableDto);
        return createdTimetable.save();
    }

    async findAll(): Promise<Timetable[]> {
        return this.timetableModel.find().populate('class academicYear').exec();
    }

    async findOne(id: string): Promise<Timetable> {
        const timetable = await this.timetableModel.findById(id).populate('class academicYear').exec();
        if (!timetable) {
            throw new NotFoundException(`Timetable with ID ${id} not found`);
        }
        return timetable;
    }

    async findByClass(classId: string): Promise<Timetable> {
        const timetable = await this.timetableModel.findOne({ class: classId }).populate('class academicYear').exec();
        if (!timetable) {
            throw new NotFoundException(`Timetable for class ${classId} not found`);
        }
        return timetable;
    }

    async update(id: string, updateTimetableDto: any): Promise<Timetable> {
        const updatedTimetable = await this.timetableModel.findByIdAndUpdate(id, updateTimetableDto, { new: true }).exec();
        if (!updatedTimetable) {
            throw new NotFoundException(`Timetable with ID ${id} not found`);
        }
        return updatedTimetable;
    }

    async remove(id: string): Promise<any> {
        const result = await this.timetableModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Timetable with ID ${id} not found`);
        }
        return { deleted: true };
    }
}
