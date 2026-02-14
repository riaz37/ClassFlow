import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    let data = request?.cookies?.jwt;
                    if (!data) {
                        // Also fallback to Authorization header
                        const authHeader = request?.headers?.authorization;
                        if (authHeader && authHeader.startsWith('Bearer ')) {
                            data = authHeader.substring(7, authHeader.length);
                        }
                    }
                    return data;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'defaultSecret',
        });
    }

    async validate(payload: any) {
        return { userId: payload.id, role: payload.role };
    }
}
