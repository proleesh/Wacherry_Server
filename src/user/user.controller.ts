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
import * as fs from 'fs';
import * as path from 'path';
import {
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.findAllUsers();
  }
  @Post('register')
  async register(
    @Body()
    body: {
      username: string;
      password: string;
      nickname: string;
      email: string;
      isAdmin?: boolean;
    },
  ) {
    try {
      const defaultAvatar = '/uploads/avatars/default-avt.png';
      return await this.userService.register(
        body.username,
        body.password,
        body.nickname,
        body.email,
        body.isAdmin || false,
        defaultAvatar,
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
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.userService.validateUser(
      body.username,
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

  @Patch(':id/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: path.join(process.cwd(), 'public', 'uploads', 'avatars'),
        filename: (req, file, cb) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/avif'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return cb(new Error('Invalid file type'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadAvatar(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('파일이 업로드되지 않았습니다.');
    }
    const filePath = path.join(file.destination, file.filename);
    if (!fs.existsSync(filePath)) {
      throw new InternalServerErrorException('파일 저장에 실패했습니다.');
    }
    const avatarUrl = `/uploads/avatars/${file.filename}`;
    await this.userService.updateAvatar(id, avatarUrl);
    return { avatar: avatarUrl };
  }

  @Patch(':id/banner')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: path.join(process.cwd(), 'public', 'uploads', 'banners'),
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
  async getUser(@Param('id') id: number) {
    return await this.userService.findUserById(id);
  }

  @Get(':id/avatar')
  async getAvatar(@Param('id') id: number) {
    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    const defaultAvatar = '/uploads/avatars/default-avt.png';
    return { avatarUrl: user.avatar || defaultAvatar };
  }
}
