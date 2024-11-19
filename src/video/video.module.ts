import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { CategoryModule } from 'src/category/category.module';
import { VideoGateway } from './video.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Video]), CategoryModule],
  providers: [VideoService, VideoGateway],
  controllers: [VideoController],
})
export class VideoModule {}
