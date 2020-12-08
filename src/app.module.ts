import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { PhotoModule } from './photo/photo.module';
import { DiaryModule } from './diary/diary.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/travel-diary'), AuthenticationModule, UserModule, AlbumModule, PhotoModule, DiaryModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
