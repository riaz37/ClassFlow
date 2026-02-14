import { Test, TestingModule } from '@nestjs/testing';
import { AcademicYearsController } from './academic-years.controller';
import { AcademicYearsService } from './academic-years.service';
import { CreateAcademicYearDto, UpdateAcademicYearDto } from './dto/academic-year.dto';

describe('AcademicYearsController', () => {
  let controller: AcademicYearsController;
  let service: AcademicYearsService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicYearsController],
      providers: [
        { provide: AcademicYearsService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<AcademicYearsController>(AcademicYearsController);
    service = module.get<AcademicYearsService>(AcademicYearsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an academic year', async () => {
      const dto: CreateAcademicYearDto = { name: '2023-2024', fromYear: '2023', toYear: '2024', isCurrent: true };
      const result = { _id: '1', ...dto };
      mockService.create.mockResolvedValue(result);
      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of academic years', async () => {
      const result = [{ name: '2023-2024' }];
      mockService.findAll.mockResolvedValue(result);
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single academic year', async () => {
      const result = { name: '2023-2024' };
      mockService.findOne.mockResolvedValue(result);
      expect(await controller.findOne('1')).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update an academic year', async () => {
      const dto: UpdateAcademicYearDto = { name: 'Updated' };
      const result = { name: 'Updated' };
      mockService.update.mockResolvedValue(result);
      expect(await controller.update('1', dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should remove an academic year', async () => {
      const result = { deleted: true };
      mockService.remove.mockResolvedValue(result);
      expect(await controller.remove('1')).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
