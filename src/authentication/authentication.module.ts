import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: JwtConstants.secret,
        }),],
    providers: [AuthenticationService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthenticationService],
})
export class AuthenticationModule { }
