import { Test, TestingModule } from '@nestjs/testing';
import { TimetablesService } from './timetables.service';
import { getModelToken } from '@nestjs/mongoose';
import { Timetable } from './schemas/timetable.schema';

describe('TimetablesService', () => {
  let service: TimetablesService;

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
        TimetablesService,
        { provide: getModelToken(Timetable.name), useValue: mockModel },
      ],
    }).compile();

    service = module.get<TimetablesService>(TimetablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
