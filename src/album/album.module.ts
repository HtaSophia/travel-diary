import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotoModule } from 'src/photo/photo.module';
import { AlbumController } from './album.controller';
import { Album, AlbumSchema } from './album.schema';
import { AlbumService } from './album.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]), PhotoModule],
    providers: [AlbumService],
    controllers: [AlbumController],
    exports: [AlbumService],
})
export class AlbumModule { }
