import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesLogService } from './activities-log.service';

describe('ActivitiesLogService', () => {
  let service: ActivitiesLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivitiesLogService],
    }).compile();

    service = module.get<ActivitiesLogService>(ActivitiesLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
