import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { VideoReaction } from './entities/video-reaction.entity';
import * as fs from 'fs';
import * as ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';
import * as ffprobe from 'ffprobe';
import * as ffprobeStatic from 'ffprobe-static';

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
    return {
      ...video,
      url: video.url,
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

  async incrementViewCount(videoId: number): Promise<number> {
    const video = await this.videoRepository.findOne({
      where: { id: videoId },
    });
    if (!video) throw new NotFoundException('Video not found');
    video.views += 1;
    await this.videoRepository.save(video);

    return video.views;
  }

  // Getting video codec
  private async getVideoCodec(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      ffprobe(filePath, { path: ffprobeStatic.path }, (err, info) => {
        if (err) return reject(err);
        const stream = info.streams.find((s) => s.codec_type === 'video');
        if (!stream || !stream.codec_name) return reject(new Error('No video stream found'));
        resolve(stream.codec_name); // e.g., "h264", "hevc"
      });
    });
  }

  // HLS Convert logic
  async convertToHLS(inputPath: string): Promise<string> {
    if (
      !inputPath ||
      typeof inputPath !== 'string' ||
      inputPath.trim() === ''
    ) {
      throw new Error('‼️Invalid inputPath: 해당 경로는 비어있으면 안됩니다.');
    }

    const baseName = path.basename(inputPath, path.extname(inputPath));
    const outputDir = path.join(__dirname, '..', '..', 'hls', baseName);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const ext = path.extname(inputPath).toLowerCase();

    // 비디오 코덱 동적 확인
    const codec = await this.getVideoCodec(inputPath);

    return new Promise((resolve, reject) => {
      const command = ffmpeg(inputPath);
      const outputPath = path.join(outputDir, 'playlist.m3u8');
      let options: string[] = [];

      // H.264/HEVC 등 복사 및 bsf 적용, 그 외 재인코딩
      if (codec === 'h264') {
        options = [
          '-c:v copy',
          '-c:a aac',
          '-bsf:v h264_mp4toannexb',
          '-hls_time 4',
          '-hls_list_size 0',
          '-start_number 0',
          '-hls_segment_filename',
          path.join(outputDir, 'segment_%03d.ts'),
          '-f hls',
        ];
        console.log(`[FFMPEG] h264 코덱: copy & bsf 적용`);
      } else if (codec === 'hevc' || codec === 'h265') {
        options = [
          '-c:v copy',
          '-c:a aac',
          '-bsf:v hevc_mp4toannexb',
          '-hls_time 4',
          '-hls_list_size 0',
          '-start_number 0',
          '-hls_segment_filename',
          path.join(outputDir, 'segment_%03d.ts'),
          '-f hls',
        ];
        console.log(`[FFMPEG] hevc/h265 코덱: copy & bsf 적용`);
      } else {
        // 기타 코덱은 재인코딩 필요
        options = [
          '-c:v libx264',
          '-c:a aac',
          '-preset veryfast',
          '-g 25',
          '-keyint_min 25',
          '-sc_threshold 0',
          '-hls_time 4',
          '-hls_list_size 0',
          '-start_number 0',
          '-force_key_frames',
          'expr:gte(t,n_forced*4)',
          '-hls_segment_filename',
          path.join(outputDir, 'segment_%03d.ts'),
          '-f hls',
        ];
        console.log(`[FFMPEG] ${codec} 코덱: libx264 재인코딩`);
      }

      command.outputOptions([...options]);

      command
        .on('start', (cmd) => {
          console.log('[FFMPEG] 명령어]', cmd);
        })
        .on('end', () => {
          console.log('[FFMPEG 완료]');
          resolve(`hls/${baseName}/playlist.m3u8`);
        })
        .on('error', (err, stdout, stderr) => {
          console.error('[FFMPEG 에러]', err.message);
          console.error('[STDERR]', stderr);
          reject(new Error('HLS 변환 실패: ' + err.message));
        })
        .output(outputPath)
        .run();
      // 변환 결과는 end 이벤트에서 확인
    });
  }

  // 사용자가 좋아요한 동영상 기록하는 서비스 로직
  async getLikedVideosByUser(userId: number) {
    const reactions = await this.reactionRepository.find({
      where: { user: { id: userId }, reaction: 'like' },
      relations: ['video'],
    });

    return reactions.map((r) => r.video);
  }
}
