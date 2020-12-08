import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { Diary } from './diary.schema';
import { DiaryService } from './diary.service';
import { DiaryDto } from './dto/diary.dto';

@UseGuards(JwtAuthGuard)
@Controller('diary')
export class DiaryController {
    constructor(private readonly diaryService: DiaryService) { }

    @Post()
    public async create(@Body() body: DiaryDto): Promise<Diary> {
        return this.diaryService.create(body);
    }

    @Get(':id')
    public async getById(@Param('id') id: string): Promise<Diary> {
        return this.diaryService.findOneById(id);
    }

    @Get('user/:id')
    public async getAll(@Param('id') id: string): Promise<Diary[]> {
        return this.diaryService.findAllByUser(id);
    }

    @Put(':id')
    public async update(@Param('id') id: string, @Body() body: DiaryDto): Promise<Diary> {
        return this.diaryService.update(id, body);
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<Diary> {
        return this.diaryService.delete(id);
    }
}
