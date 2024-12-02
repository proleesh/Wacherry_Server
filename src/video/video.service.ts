import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { VideoReaction } from './entities/video-reaction.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(VideoReaction)
    private readonly reactionRepository: Repository<VideoReaction>,
  ) {}

  async create(videoData: Partial<Video>) {
    const newVideo = this.videoRepository.create(videoData);
    return this.videoRepository.save(newVideo);
  }

  async findAll(req: Request) {
    const videos = await this.videoRepository.find({
      relations: ['category'],
      order: { createAt: 'desc' },
    });

    return videos.map((video) => ({
      ...video,
      url: video.url,
    }));
  }

  async findOne(id: number, req: Request) {
    const video = await this.videoRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!video) {
      throw new NotFoundException(`ID: ${id} 비디오 없음`);
    }
    const baseUrl = `${req.protocol}://${req.headers.host}`;
    return {
      ...video,
      url: `${baseUrl}/${video.url}`,
    };
  }

  remove(id: number) {
    return this.videoRepository.delete(id);
  }

  async reactToVideo(
    videoId: number,
    userId: number,
    reactionType: 'like' | 'dislike',
  ) {
    const video = await this.videoRepository.findOne({
      where: { id: videoId },
    });
    if (!video) throw new NotFoundException('Video not found');

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const existingReaction = await this.reactionRepository.findOne({
      where: { video, user },
    });

    if (existingReaction) {
      if (existingReaction.reaction === reactionType) {
        // 동일한 반응 취소
        await this.reactionRepository.remove(existingReaction);
        reactionType === 'like' ? video.likes-- : video.dislikes--;
      } else {
        // 반응 변경
        reactionType === 'like'
          ? (video.likes++, video.dislikes--)
          : (video.likes--, video.dislikes++);
        existingReaction.reaction = reactionType;
        await this.reactionRepository.save(existingReaction);
      }
    } else {
      // 새로운 반응 추가
      const newReaction = this.reactionRepository.create({
        video,
        user,
        reaction: reactionType,
      });
      reactionType === 'like' ? video.likes++ : video.dislikes++;
      await this.reactionRepository.save(newReaction);
    }

    await this.videoRepository.save(video);

    return {
      likes: video.likes,
      dislikes: video.dislikes,
    };
  }

  async removeReaction(videoId: number, userId: number): Promise<string> {
    const video = await this.videoRepository.findOne({
      where: { id: videoId },
    });
    if (!video) throw new NotFoundException('Video not found');
    const reaction = await this.reactionRepository.findOne({
      where: { video, user: { id: userId } },
    });
    if (!reaction) {
      throw new NotFoundException('No reaction to remove');
    }
    await this.reactionRepository.remove(reaction);

    return 'Reaction removed successfully';
  }
  async getVideoReactions(
    videoId: number,
  ): Promise<{ likes: number; dislikes: number }> {
    const likes = await this.reactionRepository.count({
      where: { video: { id: videoId }, reaction: 'like' },
    });
    const dislikes = await this.reactionRepository.count({
      where: { video: { id: videoId }, reaction: 'dislike' },
    });

    return { likes, dislikes };
  }
}
