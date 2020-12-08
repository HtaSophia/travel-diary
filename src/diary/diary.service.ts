import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Diary, DiaryDocument } from './diary.schema';
import { DiaryDto } from './dto/diary.dto';

@Injectable()
export class DiaryService {
    constructor(
        @InjectModel(Diary.name)
        private diaryModel: Model<DiaryDocument>
    ) { }

    async create(diary: DiaryDto): Promise<Diary> {
        return this.diaryModel.create(diary);
    }

    async findOneById(id: string): Promise<Diary> {
        return this.diaryModel.findOne({ _id: Types.ObjectId(id) }).exec();
    }

    async findAllByUser(id: string): Promise<Diary[]> {
        return this.diaryModel.find({ owner: Types.ObjectId(id) }).exec();
    }

    async update(id: string, diary: Partial<DiaryDto>): Promise<Diary> {
        return this.diaryModel.findOneAndUpdate({ _id: Types.ObjectId(id) }, { $set: diary }, { new: true }).exec();
    }

    async delete(id: string): Promise<Diary> {
        return this.diaryModel.findOneAndDelete({ _id: Types.ObjectId(id) }).exec();
    }
}
