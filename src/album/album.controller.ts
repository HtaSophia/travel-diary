import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { Album } from './album.schema';
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';

@UseGuards(JwtAuthGuard)
@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) { }

    @Post()
    public async create(@Body() body: AlbumDto): Promise<Album> {
        return this.albumService.create(body);
    }

    @Get(':id')
    public async getById(@Param('id') id: string): Promise<Album> {
        return this.albumService.findOneById(id);
    }

    @Get('user/:id')
    public async getAll(@Param('id') id: string): Promise<Album[]> {
        return this.albumService.findAllByUser(id);
    }

    @Put(':id')
    public async update(@Param('id') id: string, @Body() body: AlbumDto): Promise<Album> {
        return this.albumService.update(id, body);
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<Album> {
        return this.albumService.delete(id);
    }
}
