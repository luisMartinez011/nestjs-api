import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getProfile(@Req() req: Request) {
        return req.user as User;
    }

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Req() req: Request) {
        return this.authService.login(req.user as User);
    }
}
