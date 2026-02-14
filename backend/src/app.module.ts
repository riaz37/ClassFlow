import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { AcademicYearsModule } from './modules/academic-years/academic-years.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { ClassesModule } from './modules/classes/classes.module';
import { InngestModule } from './inngest/inngest.module';
import { TimetablesModule } from './modules/timetables/timetables.module';
import { ExamsModule } from './modules/exams/exams.module';
import { ActivitiesLogModule } from './modules/activities-log/activities-log.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL') || configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    AcademicYearsModule,
    SubjectsModule,
    ClassesModule,
    InngestModule,
    TimetablesModule,
    ExamsModule,
    ActivitiesLogModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
