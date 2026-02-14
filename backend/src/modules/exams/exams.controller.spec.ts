import { Test, TestingModule } from '@nestjs/testing';
import { ExamsController } from './exams.controller';
import { ExamsService } from './exams.service';

describe('ExamsController', () => {
  let controller: ExamsController;
  let service: ExamsService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByClass: jest.fn(),
    getSubmissions: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamsController],
      providers: [
        { provide: ExamsService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<ExamsController>(ExamsController);
    service = module.get<ExamsService>(ExamsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an exam', async () => {
      const dto = { title: 'Exam 1' };
      const result = { _id: '1', ...dto };
      mockService.create.mockResolvedValue(result);
      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all exams', async () => {
      const result = [{ title: 'Exam 1' }];
      mockService.findAll.mockResolvedValue(result);
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findByClass', () => {
    it('should find exams by class', async () => {
      const result = [{ title: 'Exam 1' }];
      mockService.findByClass.mockResolvedValue(result);
      expect(await controller.findByClass('classId')).toEqual(result);
      expect(service.findByClass).toHaveBeenCalledWith('classId');
    });
  });

  describe('findOne', () => {
    it('should find an exam', async () => {
      const result = { title: 'Exam 1' };
      mockService.findOne.mockResolvedValue(result);
      expect(await controller.findOne('1')).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('getSubmissions', () => {
    it('should get submissions for an exam', async () => {
      const result = [{ student: 's1', score: 10 }];
      mockService.getSubmissions.mockResolvedValue(result);
      expect(await controller.getSubmissions('1')).toEqual(result);
      expect(service.getSubmissions).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update an exam', async () => {
      const dto = { title: 'Updated' };
      const result = { _id: '1', ...dto };
      mockService.update.mockResolvedValue(result);
      expect(await controller.update('1', dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should remove an exam', async () => {
      const result = { deleted: true };
      mockService.remove.mockResolvedValue(result);
      expect(await controller.remove('1')).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
