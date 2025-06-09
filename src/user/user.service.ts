import {
  ConflictException,
  Injectable,
    NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findAllUsers() {
    return await this.userRepository.find();
  }

  // 랜덤으로 시스템에서 주는 아이디 생성 로직
  // 관리자 아이디 생성 로직 10000 ~ 10009는 관리자용 아이디
  private async generateAdminCustomId(): Promise<number> {
    for (let customId = 10000; customId <= 10009; ++customId) {
      const existingUser = await this.userRepository.findOne({
        where: { customId },
      });
      if (!existingUser) return customId; // 사용중인 아이디는 제외
      throw new ConflictException('관리자 아이디 분포 끝');
    }
  }

  // 일반 회원에게 생성하는 아이디 로직
  private async generateUniqueCustomId(): Promise<number> {
    let customId: number;
    let isUnique = false;
    const min5 = 10010;
    const max5 = 99999;

    // 만약에 5자리 다 찼으면 6자리로 분배
    const min6 = 100000;
    const max6 = 999999;

    while (!isUnique && customId <= max5) {
      customId = Math.floor(Math.random() * (max5 - min5 + 1)) + min5;
      const existingUser = await this.userRepository.findOne({
        where: { customId },
      });
      if (!existingUser) {
        isUnique = true;
        return customId;
      }
    }

    // 만약에 5자리 다 찼을때 6자리로 분배하는 로직
    while (!isUnique) {
      customId = Math.floor(Math.random() * (max6 - min6 + 1)) + min6;
      const existingUser = await this.userRepository.findOne({
        where: { customId },
      });
      if (!existingUser) {
        isUnique = true;
      }
    }

    return customId;
  }

  async register(
    username: string,
    password: string,
    nickname: string,
    email: string,
    isAdmin: boolean = false,
    avatar: string,
  ) {
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException('아이디 존재함.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      nickname,
      email,
      isAdmin,
      avatar,
    });

    if (isAdmin) {
      // 관리자용 일반 사용자용 아이디 판단
      user.customId = await this.generateAdminCustomId();
    } else {
      user.customId = await this.generateUniqueCustomId();
    }

    return this.userRepository.save(user);
  }

  async validateUser(username: string, password: string): Promise<any> {
    let user: User | undefined;
    if (!isNaN(Number(username))) {
      user = await this.userRepository.findOne({
        where: { customId: Number(username) },
      });
    } else {
      user = await this.userRepository.findOne({
        where: { username: username },
      });
    }
    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException('아이디또는 패스워드 오류');
    }
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      nickname: user.nickname,
      avatar: user.avatar,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        customId: user.customId,
        bannerUrl: user.bannerUrl,
        avatar: user.avatar,
      },
    };
  }

  async updateBannerUrl(id: number, bannerUrl: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    user.bannerUrl = bannerUrl;
    return this.userRepository.save(user);
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateAvatar(id: number, avatarUrl: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    user.avatar = avatarUrl;
    await this.userRepository.save(user);
  }

  async save(user: User): Promise<void> {
    await this.userRepository.save(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }
  async findByResetToken(token: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { resetToken: token },
    });
  }
}
