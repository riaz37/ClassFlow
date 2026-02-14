import { Test, TestingModule } from '@nestjs/testing';
import { AcademicYearsService } from './academic-years.service';
import { getModelToken } from '@nestjs/mongoose';
import { AcademicYear } from './schemas/academic-year.schema';

describe('AcademicYearsService', () => {
  let service: AcademicYearsService;

  const mockModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOneAndDelete: jest.fn(),
    findOneAndUpdate: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AcademicYearsService,
        { provide: getModelToken(AcademicYear.name), useValue: mockModel },
      ],
    }).compile();

    service = module.get<AcademicYearsService>(AcademicYearsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
