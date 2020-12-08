import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthenticationService } from './authentication.service';
import { UserInfo } from './decorators/user.decorator';
import { Account } from './types/account';
import { JwtToken } from './types/jwt-token';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthenticationService, private userService: UserService ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    public async login(@UserInfo() user: Account): Promise<JwtToken> {
        return this.authService.login(user);
    }

    @Post('register')
    public async register(@Body() createUser: UserDto): Promise<JwtToken> {
        const user = await this.userService.create(createUser);

        return this.authService.login({ id: user.id, email: user.email, name: user.name });
    };
}
