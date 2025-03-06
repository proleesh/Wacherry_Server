import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PasswordResetService {
  constructor(
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
  ) {}
  async requestPasswordReset(email: string): Promise<void> {
    console.log(email);
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('해당 사용자를 찾을 수 없습니다.');
    }

    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpiration = new Date();
    resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1);

    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await this.userService.save(user);

    const resetUrl = `http://localhost:3000/auth/reset-password?token=${resetToken}`;
    await this.mailerService.sendMail({
      to: email,
      subject: '패스워드 다시 설정 요청',
      text: `당신의 패스워드를 다시 설정할려면 해당 링크: ${resetUrl} 를 클릭하십시오.`,
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.userService.findByResetToken(token);
    if (!user || user.resetTokenExpiration < new Date()) {
      throw new Error('Invalid or expired token');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await this.userService.save(user);
  }

  async validateResetToken(token: string): Promise<User | null> {
    const user = await this.userService.findByResetToken(token);
    if (!user || user.resetTokenExpiration < new Date()) {
      throw new Error('유효하지 않거나 만료된 토큰입니다.');
    }
    return user;
  }
}
