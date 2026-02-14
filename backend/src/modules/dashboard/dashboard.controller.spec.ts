import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

describe('DashboardController', () => {
  let controller: DashboardController;
  let service: DashboardService;

  const mockService = {
    getOverview: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        { provide: DashboardService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getOverview', () => {
    it('should return dashboard overview', async () => {
      const result = { totalUsers: 10, totalClasses: 5, recentActivities: [] };
      mockService.getOverview.mockResolvedValue(result);
      expect(await controller.getOverview()).toEqual(result);
      expect(service.getOverview).toHaveBeenCalled();
    });
  });
});
