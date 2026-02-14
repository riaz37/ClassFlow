import { Test, TestingModule } from '@nestjs/testing';
import { InngestController } from './inngest.controller';
import { InngestService } from './inngest.service';

jest.mock('inngest/express', () => ({
  serve: jest.fn().mockReturnValue((req, res) => {
    res.json({ message: 'Inngest handled' });
  }),
}));

describe('InngestController', () => {
  let controller: InngestController;
  let service: InngestService;

  const mockService = {
    getFunctions: jest.fn().mockReturnValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InngestController],
      providers: [
        { provide: InngestService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<InngestController>(InngestController);
    service = module.get<InngestService>(InngestService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('handleRequest', () => {
    it('should call inngest serve handler', async () => {
      const req = {};
      const res = { json: jest.fn() };
      await controller.handleRequest(req, res);
      expect(res.json).toHaveBeenCalledWith({ message: 'Inngest handled' });
      expect(service.getFunctions).toHaveBeenCalled();
    });
  });
});
