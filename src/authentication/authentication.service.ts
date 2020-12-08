import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Account } from './types/account';
import { JwtToken } from './types/jwt-token';

@Injectable()
export class AuthenticationService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    public async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);

        let account: Account;

        console.log(user)
        console.log(pass)
        if (user && user.password === pass) {
            account = { id: user.id, email, name: user.name };
        }

        return account;
    }

    public login(user: Account): JwtToken {
        return { access_token: this.jwtService.sign(user) };
    }
}
