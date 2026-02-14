import { Test, TestingModule } from '@nestjs/testing';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto, UpdateSubjectDto } from './dto/subject.dto';

describe('SubjectsController', () => {
  let controller: SubjectsController;
  let service: SubjectsService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectsController],
      providers: [
        { provide: SubjectsService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<SubjectsController>(SubjectsController);
    service = module.get<SubjectsService>(SubjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a subject', async () => {
      const dto: CreateSubjectDto = { name: 'Math', code: 'MATH101', department: 'Science' };
      const result = { _id: '1', ...dto };
      mockService.create.mockResolvedValue(result);
      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of subjects', async () => {
      const result = [{ name: 'Math' }];
      mockService.findAll.mockResolvedValue(result);
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single subject', async () => {
      const result = { name: 'Math' };
      mockService.findOne.mockResolvedValue(result);
      expect(await controller.findOne('1')).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a subject', async () => {
      const dto: UpdateSubjectDto = { name: 'Updated' };
      const result = { name: 'Updated' };
      mockService.update.mockResolvedValue(result);
      expect(await controller.update('1', dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should remove a subject', async () => {
      const result = { deleted: true };
      mockService.remove.mockResolvedValue(result);
      expect(await controller.remove('1')).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
