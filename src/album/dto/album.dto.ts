import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Photo } from '../../photo/photo.schema';

export class AlbumDto {
    @IsString()
    @IsNotEmpty()
    public title: string;

    @IsNotEmpty()
    public owner: Types.ObjectId;

    @IsArray()
    public photos: Photo[];
}
