import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    public async create(@Body() body: UserDto): Promise<User> {
        return this.userService.create(body);
    }

    @Get()
    public async getAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    public async getById(@Param('id') id: string): Promise<User> {
        return this.userService.findOneById(id);
    }

    @Put(':id')
    public async update(@Param('id') id: string, @Body() body: UserDto): Promise<User> {
        return this.userService.update(id, body);
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<User> {
        return this.userService.delete(id);
    }
}
