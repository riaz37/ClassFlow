import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimetablesController } from './timetables.controller';
import { TimetablesService } from './timetables.service';
import { Timetable, TimetableSchema } from './schemas/timetable.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Timetable.name, schema: TimetableSchema }]),
  ],
  controllers: [TimetablesController],
  providers: [TimetablesService],
})
export class TimetablesModule { }
