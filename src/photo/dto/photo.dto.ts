import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class PhotoDto {
    @IsArray()
    @IsNotEmpty()
    public images: Buffer[];

    @IsString()
    public subtitle: string;

    @IsString()
    public location: string;
}
