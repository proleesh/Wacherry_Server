import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { ShortFormService } from './shortform.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('shortforms')
export class ShortFormController {
  constructor(private readonly shortFormService: ShortFormService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('media', {
      storage: diskStorage({
        destination: './public/uploads/shortforms',
        filename: (req, file, callback) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async createShortForm(
    @UploadedFile() file: Express.Multer.File,
    @Body('content') content: string,
    @Request() req,
  ) {
    try {
      console.log('쇼폼 생성 요청 수신');
      console.log('사용자 정보:', req.user);
      console.log('업로드된 파일:', file);
      console.log('내용:', content);

      const user = req.user;
      if (!user || !user.id) {
        throw new Error('유효하지 않은 사용자');
      }
      const mediaUrl = file ? `/uploads/shortforms/${file.filename}` : null;
      return this.shortFormService.createShortForm(user, content, mediaUrl);
    } catch (error) {
      console.error('쇼폼 생성 중 오류:', error);
      throw new BadRequestException('쇼폼 등록에 실패했습니다.');
    }
  }

  @Get()
  async getAllShortForms() {
    return this.shortFormService.getAllShortForms();
  }

  @Get(':id')
  async getShortFormById(@Param('id') id: number) {
    return this.shortFormService.getShortFormById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteShortForm(@Param('id') id: number, @Request() req) {
    const user = req.user;
    await this.shortFormService.deleteShortForm(id, user);
    return { message: '쇼폼 콘텐츠가 삭제되었습니다.' };
  }
}
