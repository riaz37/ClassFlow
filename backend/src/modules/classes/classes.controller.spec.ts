import { Test, TestingModule } from '@nestjs/testing';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { CreateClassDto, UpdateClassDto } from './dto/class.dto';

describe('ClassesController', () => {
  let controller: ClassesController;
  let service: ClassesService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassesController],
      providers: [
        { provide: ClassesService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<ClassesController>(ClassesController);
    service = module.get<ClassesService>(ClassesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a class', async () => {
      const dto: CreateClassDto = { name: 'Class 1A', academicYear: 'yearId' };
      const result = { _id: '1', ...dto };
      mockService.create.mockResolvedValue(result);
      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of classes', async () => {
      const result = [{ name: 'Class 1A' }];
      mockService.findAll.mockResolvedValue(result);
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single class', async () => {
      const result = { name: 'Class 1A' };
      mockService.findOne.mockResolvedValue(result);
      expect(await controller.findOne('1')).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a class', async () => {
      const dto: UpdateClassDto = { name: 'Updated' };
      const result = { name: 'Updated' };
      mockService.update.mockResolvedValue(result);
      expect(await controller.update('1', dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should remove a class', async () => {
      const result = { deleted: true };
      mockService.remove.mockResolvedValue(result);
      expect(await controller.remove('1')).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
