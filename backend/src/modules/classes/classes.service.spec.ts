import { Test, TestingModule } from '@nestjs/testing';
import { ClassesService } from './classes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Class } from './schemas/class.schema';

describe('ClassesService', () => {
  let service: ClassesService;

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
        ClassesService,
        { provide: getModelToken(Class.name), useValue: mockModel },
      ],
    }).compile();

    service = module.get<ClassesService>(ClassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
