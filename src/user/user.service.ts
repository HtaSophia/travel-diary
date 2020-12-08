import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDto } from 'src/user/dto/user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) { }

    async create(user: UserDto): Promise<User> {
        return this.userModel.create(user);
    }

    async findOneById(id: string): Promise<User> {
        return this.userModel.findOne({ _id: Types.ObjectId(id) }).exec();
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email }).select('+password').exec();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async update(id: string, user: Partial<UserDto>): Promise<User> {
        return this.userModel.findOneAndUpdate({ _id: Types.ObjectId(id) }, { $set: user }, { new: true }).exec();
    }

    async delete(id: string): Promise<User> {
        return this.userModel.findOneAndDelete({ _id: Types.ObjectId(id) }).exec();
    }
}
