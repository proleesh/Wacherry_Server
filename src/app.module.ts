import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoModule } from './video/video.module';
import { ChatModule } from './chat/chat.module';
import { Video } from './video/entities/video.entity';
import { Message } from './chat/entities/message.entity';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { VideoHistoryModule } from './video-history/video-history.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { ShortFormModule } from './shortform/shortform.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailModule } from './mail/mail.module';

// setHeaders 옵션을 분리하여 타입 에러 우회
const hlsStaticOptions = {
  rootPath: join(__dirname, '..', 'hls'),
  serveRoot: '/hls',
  setHeaders: (res: any, filePath: string) => {
    if (filePath.endsWith('.m3u8')) {
      res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    } else if (filePath.endsWith('.ts')) {
      res.setHeader('Content-Type', 'video/MP2T');
    }
  },
};
@Module({
  imports: [
    ServeStaticModule.forRoot(hlsStaticOptions as any),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend', 'dist'),
      exclude: ['/api*', '/hls*'], // /hls 경로 충돌 방지
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'wacherry_user',
      password: 'Wacherry@123',
      database: 'media_chat_app',
      entities: [Video, Message, User],
      autoLoadEntities: true,
      synchronize: true, // Only developer mode
      logging: false,
    }),
    VideoHistoryModule,
    VideoModule,
    ChatModule,
    UserModule,
    CategoryModule,
    CommentModule,
    ShortFormModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
