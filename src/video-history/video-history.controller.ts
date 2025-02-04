import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { VideoHistoryService } from './video-history.service';

@Controller('video-history')
export class VideoHistoryController {
  constructor(private readonly historyService: VideoHistoryService) {}

  @Post()
  async addHistory(@Body() body: { userId: number; videoId: number }) {
    console.log('Received Request:', body);
    return this.historyService.create(body.userId, body.videoId);
  }
  @Get(':userId')
  async getHistory(@Param('userId') userId: number) {
    return this.historyService.findByUser(userId);
  }
}
