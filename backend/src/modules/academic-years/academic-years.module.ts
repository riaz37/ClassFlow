import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcademicYearsController } from './academic-years.controller';
import { AcademicYearsService } from './academic-years.service';
import { AcademicYear, AcademicYearSchema } from './schemas/academic-year.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AcademicYear.name, schema: AcademicYearSchema }]),
  ],
  controllers: [AcademicYearsController],
  providers: [AcademicYearsService],
})
export class AcademicYearsModule { }
