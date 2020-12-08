import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PhotoDto } from './dto/photo.dto';
import { Photo, PhotoDocument } from './photo.schema';
import { ImageFile } from './dto/file.dto';
// import { AlbumService } from 'src/album/album.service';

@Injectable()
export class PhotoService {
    constructor(
        @InjectModel(Photo.name)
        private photoModel: Model<PhotoDocument>,
        // private albumService: AlbumService,
    ) { }

    async create(albumId: string, photo: PhotoDto, files: ImageFile[]): Promise<Photo> {
        const newPhoto = await this.photoModel.create(photo);
        // const album = await this.albumService.findOneById(albumId);
        // album.photos.push(newPhoto._id);

        // await this.albumService.update(albumId, album);

        const images = files.map(file => file.buffer);

        newPhoto.set('images', images);

        return newPhoto.save();
    }

    async findOneById(id: string): Promise<Photo> {
        return this.photoModel.findOne({ _id: Types.ObjectId(id) }).exec();
    }

    async findAll(): Promise<Photo[]> {
        return this.photoModel.find().exec();
    }

    async update(id: string, photo: Partial<PhotoDto>): Promise<Photo> {
        return this.photoModel.findOneAndUpdate({ _id: Types.ObjectId(id) }, { $set: photo }, { new: true }).exec();
    }

    async delete(id: string): Promise<Photo> {
        return this.photoModel.findOneAndDelete({ _id: Types.ObjectId(id) }).exec();
    }
}
