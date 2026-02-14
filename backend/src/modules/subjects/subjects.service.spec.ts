import { Test, TestingModule } from '@nestjs/testing';
import { SubjectsService } from './subjects.service';
import { getModelToken } from '@nestjs/mongoose';
import { Subject } from './schemas/subject.schema';

describe('SubjectsService', () => {
  let service: SubjectsService;

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
        SubjectsService,
        { provide: getModelToken(Subject.name), useValue: mockModel },
      ],
    }).compile();

    service = module.get<SubjectsService>(SubjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
