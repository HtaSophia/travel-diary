import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ImageFile } from './dto/file.dto';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { PhotoDto } from './dto/photo.dto';
import { Photo } from './photo.schema';
import { PhotoService } from './photo.service';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) { }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    public uploadFile(@UploadedFiles() files: ImageFile[], @Param('id') id: string, @Body() body: PhotoDto): Promise<Photo> {
        return this.photoService.create(id, body, files);
    }

    @Get()
    public async getAll(): Promise<Photo[]> {
        return this.photoService.findAll();
    }

    @Get(':id')
    public async getById(@Param('id') id: string): Promise<Photo> {
        return this.photoService.findOneById(id);
    }

    @Put(':id')
    public async update(@Param('id') id: string, @Body() body: PhotoDto): Promise<Photo> {
        return this.photoService.update(id, body);
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<Photo> {
        return this.photoService.delete(id);
    }
}
