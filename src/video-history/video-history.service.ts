import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoPlayHistory } from './entities/video-play-history.entity';

@Injectable()
export class VideoHistoryService {
  constructor(
    @InjectRepository(VideoPlayHistory)
    private historyRepository: Repository<VideoPlayHistory>,
  ) {}
  async create(userId: number, videoId: number) {
    const history = this.historyRepository.create({
      user: { id: userId },
      video: { id: videoId },
    });
    return this.historyRepository.save(history);
  }
  async findByUser(userId: number){
    return this.historyRepository.find({
        where: {user: {id: userId}},
        relations: ['video'],
        order: {watched_at: 'DESC'}
    })
  }
}
