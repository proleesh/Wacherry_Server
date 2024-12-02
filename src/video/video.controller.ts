import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Param,
  Delete,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { Video } from './entities/video.entity';
import { CategoryService } from 'src/category/category.service';
import { Request } from 'express';

@Controller('videos')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  create(videoData: Partial<Video>) {
    return this.videoService.create(videoData);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads/videos',
        filename: (req, file, callback) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
      limits: {
        fileSize: 500 * 1024 * 1024,
      },
    }),
  )
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title: string; description: string; categoryId: number },
  ) {
    if (!file) {
      throw new HttpException('비디오 업로드 없음', HttpStatus.BAD_REQUEST);
    }
    const category = await this.categoryService.findOne(body.categoryId);
    if (!category) {
      throw new NotFoundException('해당 카테고리 못 찾음!');
    }

    const videoData = {
      title: body.title,
      description: body.description,
      url: `uploads/videos/${file.filename}`,
      category: category,
    };
    return await this.videoService.create(videoData);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.videoService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.videoService.findOne(+id, req);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }

  @Post(':id/react')
  async reactToVideo(
    @Param('id') videoId: number,
    @Body('userId') userId: number,
    @Body('reaction') reaction: 'like' | 'dislike',
  ) {
    return await this.videoService.reactToVideo(videoId, userId, reaction);
  }

  @Delete(':id/reaction')
  async removeReaction(
    @Param('id') videoId: number,
    @Body('userId') userId: number,
  ) {
    return await this.videoService.removeReaction(videoId, userId);
  }

  @Get(':id/reactions')
  async getVideoReactions(@Param('id') videoId: number) {
    return await this.videoService.getVideoReactions(videoId);
  }
}
