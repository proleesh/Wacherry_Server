import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { Request } from 'express';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
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
}
