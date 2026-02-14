import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { Class } from '../classes/schemas/class.schema';
import { Subject } from '../subjects/schemas/subject.schema';
import { ActivitiesLogService } from '../activities-log/activities-log.service';

describe('DashboardService', () => {
  let service: DashboardService;

  const mockModel = {
    countDocuments: jest.fn(),
    find: jest.fn(),
  };

  const mockActivitiesLogService = {
    getRecentActivities: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: getModelToken(User.name), useValue: mockModel },
        { provide: getModelToken(Class.name), useValue: mockModel },
        { provide: getModelToken(Subject.name), useValue: mockModel },
        { provide: ActivitiesLogService, useValue: mockActivitiesLogService },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
