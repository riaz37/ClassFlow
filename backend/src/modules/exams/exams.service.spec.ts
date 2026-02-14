import { Test, TestingModule } from '@nestjs/testing';
import { ExamsService } from './exams.service';
import { getModelToken } from '@nestjs/mongoose';
import { Exam, Submission } from './schemas/exam.schema';

describe('ExamsService', () => {
  let service: ExamsService;

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
        ExamsService,
        { provide: getModelToken(Exam.name), useValue: mockModel },
        { provide: getModelToken(Submission.name), useValue: mockModel },
      ],
    }).compile();

    service = module.get<ExamsService>(ExamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
