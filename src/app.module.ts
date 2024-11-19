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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'media_chat_app',
      entities: [Video, Message, User],
      autoLoadEntities: true,
      synchronize: true, // Only developer mode
      logging: true,
    }),
    VideoHistoryModule,
    VideoModule,
    ChatModule,
    UserModule,
    CategoryModule,
    CommentModule,
    ShortFormModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
