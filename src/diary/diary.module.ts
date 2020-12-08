import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiaryController } from './diary.controller';
import { Diary, DiarySchema } from './diary.schema';
import { DiaryService } from './diary.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Diary.name, schema: DiarySchema }])],
    controllers: [DiaryController],
    providers: [DiaryService],
    exports: [DiaryService],
})
export class DiaryModule { }
