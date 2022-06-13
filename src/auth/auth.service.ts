import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { User } from 'src/users/entities/user.entity';
import { PayloadToken } from './models/token.model';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        const comparePasswords = await bcrypt.compare(password, user.password);
        if (user && comparePasswords) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException();
    }

    async login(user: User) {

        const payload: PayloadToken = { email: user.email, };
        return {
            access_token: this.jwtService.sign(payload),
            user
        };
    }
}
