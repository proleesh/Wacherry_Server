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
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { Video } from './entities/video.entity';
import { CategoryService } from 'src/category/category.service';
import { Request } from 'express';
import * as fs from 'fs';

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

  logger = new Logger('VideoController');

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads/videos',
        filename: (req, file, callback) => {
          const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
      limits: {
        fileSize: 100000 * 1024 * 1024, // 100000MB
      },
    }),
  )
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title: string; description: string; categoryId: number },
  ) {
    // if (!file?.path) {
    //   throw new InternalServerErrorException('파일 경로를 찾을 수 없습니다.');
    // }
    if (!file) {
      throw new HttpException('비디오 업로드 없음', HttpStatus.BAD_REQUEST);
    }
    if (!file || !file.path) {
      this.logger.error('파일이 정의되지 않음 또는 path 없음');
      throw new InternalServerErrorException('파일 경로가 존재하지 않습니다.');
    }
    try {
      const category = await this.categoryService.findOne(body.categoryId);
      if (!category) {
        throw new NotFoundException('해당 카테고리 못 찾음!');
      }

      // console.log(`‼️[파일 정보]: ${file}`);

      // const inputPath = path.join(file.destination, file.filename);

      const filePath = path.join('./public/uploads/videos', file.filename);
      console.log('>>> 변환에 전달된 filePath:', filePath);
      if (!fs.existsSync(filePath)) {
        this.logger.error(`파일 경로 존재하지 않음: ${filePath}`);
        throw new InternalServerErrorException('파일 경로 오류');
      }
      // const filePath = file.path;

      const hlsPath = await this.videoService.convertToHLS(filePath);

      // console.log(`[파일 목적지]: ${file?.destination}`);
      // console.log(`[파일 이름]: ${file?.filename}`);

      console.log('⚠️ file:', file);
      console.log('📎 file.filename:', file?.filename);
      console.log('📎 file.destination:', file?.destination);
      console.log('📎 생성된 filePath:', filePath);

      const videoData = {
        title: body.title,
        description: body.description,
        // m3u8
        url: hlsPath,
        originalUrl: `uploads/videos/${file.filename}`,
        category: category,
      };
      return await this.videoService.create(videoData);
    } catch (err) {
      this.logger.error(
        `업로드 중 오류 발생: ${err.message}`,
        err.stack,
        'uploadVideo',
      );
      console.error(err);
      throw new InternalServerErrorException('비디오 업로드 실패');
    }
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

  @Post(':id/view')
  async incrementViewCount(
    @Param('id') videoId: number,
  ): Promise<{ views: number }> {
    const views = await this.videoService.incrementViewCount(videoId);
    return { views };
  }
}
