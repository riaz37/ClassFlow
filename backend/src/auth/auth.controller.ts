import { Controller, Post, UseGuards, Request, Body, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../modules/users/dto/user.dto';
import type { Response } from 'express';

@Controller('users') // Keep route compatible with Express backend
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            // mimic Express behavior of 401
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        const { access_token, user: userData } = await this.authService.login(user);

        // Set Cookie
        res.cookie('jwt', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        return userData;
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
        });
        return { message: 'Logged out successfully' };
    }
}
