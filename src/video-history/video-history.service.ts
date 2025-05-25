import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoPlayHistory } from './entities/video-play-history.entity';
import { Video } from 'src/video/entities/video.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class VideoHistoryService {
  constructor(
    @InjectRepository(VideoPlayHistory)
    private historyRepository: Repository<VideoPlayHistory>,
  ) {}
  async create(userId: number, videoId: number) {
    console.log('Received userId: ', userId, 'videoId: ', videoId);
    const userExists = await this.historyRepository.manager.findOne(User, {
      where: { id: userId },
    });
    const videoExists = await this.historyRepository.manager.findOne(Video, {
      where: { id: videoId },
    });

    if (!userExists || !videoExists) {
      console.error('User or Video not found:', { userId, videoId });
      throw new Error('User or Video not found');
    }
    try {
      const history = new VideoPlayHistory();
      history.user = userExists;
      history.video = videoExists;
      console.log('Before save: ', history);
      await this.historyRepository.save(history);
      console.log('After save: ', history);
      return history;
    } catch (error) {
      console.error('Error saving video play history: ', error);
      throw error;
    }
  }
  async findByUser(userId: number) {
    return this.historyRepository.find({
      where: { user: { id: userId } },
      relations: ['video'],
      order: { watched_at: 'DESC' },
    });
  }
}
