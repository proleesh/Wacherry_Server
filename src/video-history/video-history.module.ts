import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoHistoryController } from './video-history.controller';
import { VideoHistoryService } from './video-history.service';
import { VideoPlayHistory } from './entities/video-play-history.entity';
import { Video } from 'src/video/entities/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoPlayHistory, Video])],
  controllers: [VideoHistoryController],
  providers: [VideoHistoryService],
})
export class VideoHistoryModule {}
