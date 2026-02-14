import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from '../modules/users/dto/user.dto';
import { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
  };

  const mockResponse = {
    cookie: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return user data and set cookie on successful login', async () => {
      const loginDto: LoginDto = { email: 'test@example.com', password: 'password' };
      const user = { _id: '1', email: 'test@example.com', role: 'student' };
      const result = { access_token: 'token', user };

      mockAuthService.validateUser.mockResolvedValue(user);
      mockAuthService.login.mockResolvedValue(result);

      const response = await controller.login(loginDto, mockResponse);

      expect(authService.validateUser).toHaveBeenCalledWith(loginDto.email, loginDto.password);
      expect(authService.login).toHaveBeenCalledWith(user);
      expect(mockResponse.cookie).toHaveBeenCalled();
      expect(response).toEqual(user);
    });

    it('should return 401 on invalid credentials', async () => {
      const loginDto: LoginDto = { email: 'wrong@example.com', password: 'wrong' };
      mockAuthService.validateUser.mockResolvedValue(null);

      await controller.login(loginDto, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });
  });

  describe('logout', () => {
    it('should clear the jwt cookie', async () => {
      const res = await controller.logout(mockResponse);
      expect(mockResponse.cookie).toHaveBeenCalledWith('jwt', '', expect.any(Object));
      expect(res).toEqual({ message: 'Logged out successfully' });
    });
  });
});
