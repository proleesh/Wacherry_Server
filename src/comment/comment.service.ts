import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  create(videoId: number, username: string, content: string) {
    const comment = this.commentRepository.create({
      videoId,
      username,
      content,
    });
    return this.commentRepository.save(comment);
  }

  findByVideoId(videoId: number) {
    return this.commentRepository.find({
      where: { videoId },
      order: { createdAt: 'DESC' },
    });
  }
}
