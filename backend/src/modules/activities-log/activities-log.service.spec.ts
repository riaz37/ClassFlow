import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesLogService } from './activities-log.service';
import { getModelToken } from '@nestjs/mongoose';
import { ActivityLog } from './schemas/activity-log.schema';

describe('ActivitiesLogService', () => {
  let service: ActivitiesLogService;

  const mockModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOneAndDelete: jest.fn(),
    findOneAndUpdate: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivitiesLogService,
        { provide: getModelToken(ActivityLog.name), useValue: mockModel },
      ],
    }).compile();

    service = module.get<ActivitiesLogService>(ActivitiesLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
