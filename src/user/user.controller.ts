import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
  ConflictException,
  Patch,
  UseInterceptors,
  Param,
  UploadedFile,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body()
    body: {
      username: string;
      password: string;
      nickname: string;
      isAdmin?: boolean;
    },
  ) {
    try {
      return await this.userService.register(
        body.username,
        body.password,
        body.nickname,
        body.isAdmin || false,
      );
    } catch (error) {
      // 만약에 계정 이름이 아이디랑 같을 때 예외처리
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Post('login')
  async login(@Body() body: { userIdentifier: string; password: string }) {
    const user = await this.userService.validateUser(
      body.userIdentifier,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException('아이디또는 패스워드 오류');
    }
    return this.userService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  async upload(@Request() req) {
    console.log(req.user);
    return 'upload successful';
  }

  @Patch(':id/banner')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads/banners',
        filename: (req, file, callback) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  @Patch(':id/banner')
  async uploadBanner(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const bannerUrl = `/uploads/banners/${file.filename}`;
    await this.userService.updateBannerUrl(id, bannerUrl);
    return { bannerUrl };
  }

  @Get(':id')
  async getUser(@Param('id') id: number){
    return await this.userService.findUserById(id);
  }

  
}
