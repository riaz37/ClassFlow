import { Test, TestingModule } from '@nestjs/testing';
import { TimetablesController } from './timetables.controller';
import { TimetablesService } from './timetables.service';

describe('TimetablesController', () => {
  let controller: TimetablesController;
  let service: TimetablesService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByClass: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimetablesController],
      providers: [
        { provide: TimetablesService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<TimetablesController>(TimetablesController);
    service = module.get<TimetablesService>(TimetablesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a timetable', async () => {
      const dto = { class: 'classId' };
      const result = { _id: '1', ...dto };
      mockService.create.mockResolvedValue(result);
      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all timetables', async () => {
      const result = [{ _id: '1' }];
      mockService.findAll.mockResolvedValue(result);
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findByClass', () => {
    it('should return timetable for a class', async () => {
      const result = { _id: '1', class: 'classId' };
      mockService.findByClass.mockResolvedValue(result);
      expect(await controller.findByClass('classId')).toEqual(result);
      expect(service.findByClass).toHaveBeenCalledWith('classId');
    });
  });

  describe('findOne', () => {
    it('should return a timetable', async () => {
      const result = { _id: '1' };
      mockService.findOne.mockResolvedValue(result);
      expect(await controller.findOne('1')).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a timetable', async () => {
      const dto = { class: 'updated' };
      const result = { _id: '1', ...dto };
      mockService.update.mockResolvedValue(result);
      expect(await controller.update('1', dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should remove a timetable', async () => {
      const result = { deleted: true };
      mockService.remove.mockResolvedValue(result);
      expect(await controller.remove('1')).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
