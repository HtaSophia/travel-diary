import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PhotoService } from 'src/photo/photo.service';
import { Album, AlbumDocument } from './album.schema';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
    constructor(
        @InjectModel(Album.name)
        private albumModel: Model<AlbumDocument>,
        private photoService: PhotoService,
    ) { }

    async create(album: AlbumDto): Promise<Album> {
        return this.albumModel.create(album);
    }

    async findOneById(id: string): Promise<Album> {
        return this.albumModel.findOne({ _id: Types.ObjectId(id) }).exec();
    }

    async findAllByUser(id: string): Promise<Album[]> {
        return this.albumModel.find({ owner: Types.ObjectId(id) }).populate('photos').exec();
    }

    async update(id: string, album: Partial<AlbumDto>): Promise<Album> {
        return this.albumModel.findOneAndUpdate({ _id: Types.ObjectId(id) }, { $set: album }, { new: true }).exec();
    }

    async delete(id: string): Promise<Album> {
        const album = await this.albumModel.findOne({ _id: Types.ObjectId(id) }).exec();

        const photos = album.get('photos');

        const promises = [];

        photos.forEach(photoId => {
           promises.push(this.photoService.delete(photoId));
        });

        await Promise.all(promises);

        return album.deleteOne();
    }
}
