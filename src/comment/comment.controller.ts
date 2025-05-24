import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';

@Controller('videos/:videoId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll(@Param('videoId') videoId: number) {
    return this.commentService.findByVideoId(videoId);
  }

  @Post()
  create(@Param('videoId') videoId: number, @Body() body: Partial<Comment>) {
    const { username, content } = body;
    return this.commentService.create(videoId, username, content);
  }
}
