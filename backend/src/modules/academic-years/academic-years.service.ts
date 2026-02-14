import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AcademicYear, AcademicYearDocument } from './schemas/academic-year.schema';
import { CreateAcademicYearDto, UpdateAcademicYearDto } from './dto/academic-year.dto';

@Injectable()
export class AcademicYearsService {
    constructor(
        @InjectModel(AcademicYear.name) private academicYearModel: Model<AcademicYearDocument>,
    ) { }

    async create(createDto: CreateAcademicYearDto): Promise<AcademicYear> {
        const existing = await this.academicYearModel.findOne({ name: createDto.name });
        if (existing) {
            throw new BadRequestException('Academic Year with this name already exists');
        }

        if (createDto.isCurrent) {
            // Unset other current years
            await this.academicYearModel.updateMany({}, { isCurrent: false });
        }

        const created = new this.academicYearModel(createDto);
        return created.save();
    }

    async findAll(): Promise<AcademicYear[]> {
        return this.academicYearModel.find().sort({ createdAt: -1 }).exec();
    }

    async findOne(id: string): Promise<AcademicYear> {
        const year = await this.academicYearModel.findById(id).exec();
        if (!year) throw new NotFoundException('Academic Year not found');
        return year;
    }

    async update(id: string, updateDto: UpdateAcademicYearDto): Promise<AcademicYear> {
        if (updateDto.isCurrent) {
            await this.academicYearModel.updateMany({ _id: { $ne: id } }, { isCurrent: false });
        }

        const updated = await this.academicYearModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .exec();

        if (!updated) throw new NotFoundException('Academic Year not found');
        return updated;
    }

    async remove(id: string): Promise<void> {
        const result = await this.academicYearModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) throw new NotFoundException('Academic Year not found');
    }
}
