import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesLogController } from './activities-log.controller';
import { ActivitiesLogService } from './activities-log.service';

describe('ActivitiesLogController', () => {
  let controller: ActivitiesLogController;
  let service: ActivitiesLogService;

  const mockService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivitiesLogController],
      providers: [
        { provide: ActivitiesLogService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<ActivitiesLogController>(ActivitiesLogController);
    service = module.get<ActivitiesLogService>(ActivitiesLogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all activities', async () => {
      const result = [{ action: 'LOGIN' }];
      mockService.findAll.mockResolvedValue(result);
      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
