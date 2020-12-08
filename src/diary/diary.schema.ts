import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Diary {
    public id?: string;

    @Prop({ required: true })
    public title: string;

    @Prop({ required: true })
    public text: string;

    @Prop({ type: Types.ObjectId, required: true })
    public owner: Types.ObjectId;
}

export type DiaryDocument = Diary & Document;

export const DiarySchema = SchemaFactory.createForClass(Diary);
