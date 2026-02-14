import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesLogController } from './activities-log.controller';

describe('ActivitiesLogController', () => {
  let controller: ActivitiesLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivitiesLogController],
    }).compile();

    controller = module.get<ActivitiesLogController>(ActivitiesLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
