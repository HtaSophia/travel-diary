import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class DiaryDto {
    @IsString()
    @IsNotEmpty()
    public title: string;

    @IsString()
    @IsNotEmpty()
    public text: string;

    @IsNotEmpty()
    public owner: Types.ObjectId;
}
