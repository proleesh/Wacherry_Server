import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('videos/:videoId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll(@Param('videoId') videoId: number) {
    return this.commentService.findByVideoId(videoId);
  }
}
