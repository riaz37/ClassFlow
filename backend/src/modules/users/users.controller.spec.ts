import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should create a new user', async () => {
      const dto: CreateUserDto = { name: 'Test', email: 'test@example.com', password: 'pass', role: 'student' };
      const result = { _id: '1', ...dto };
      mockUsersService.create.mockResolvedValue(result);

      expect(await controller.register(dto)).toEqual(result);
      expect(usersService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{ name: 'Test' }];
      mockUsersService.findAll.mockResolvedValue(result);

      expect(await controller.findAll({})).toEqual(result);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('getProfile', () => {
    it('should return the user profile', async () => {
      const req = { user: { userId: '1' } };
      const result = { _id: '1', name: 'Test' };
      mockUsersService.findOne.mockResolvedValue(result);

      expect(await controller.getProfile(req)).toEqual(result);
      expect(usersService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const dto: UpdateUserDto = { name: 'Updated' };
      const result = { _id: '1', name: 'Updated' };
      mockUsersService.update.mockResolvedValue(result);

      expect(await controller.update('1', dto)).toEqual(result);
      expect(usersService.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = { deleted: true };
      mockUsersService.remove.mockResolvedValue(result);

      expect(await controller.remove('1')).toEqual(result);
      expect(usersService.remove).toHaveBeenCalledWith('1');
    });
  });
});
