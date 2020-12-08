import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Photo } from '../photo/photo.schema';

@Schema({ timestamps: true })
export class Album {
    public id?: string;

    @Prop({ required: true, unique: true })
    public title: string;

    @Prop({ type: Types.ObjectId, required: true })
    public owner: Types.ObjectId;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Photo.name }] })
    public photos: Photo[];
}

export type AlbumDocument = Album & Document;

export const AlbumSchema = SchemaFactory.createForClass(Album);
