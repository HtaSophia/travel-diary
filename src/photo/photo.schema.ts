import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Photo {
    public id?: string;

    @Prop({ types: [Buffer], required: true })
    public images: Buffer[];

    @Prop()
    public subtitle?: string;

    @Prop()
    public location?: string;
}

export type PhotoDocument = Photo & Document;

export const PhotoSchema = SchemaFactory.createForClass(Photo);
