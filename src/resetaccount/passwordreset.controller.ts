import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { PasswordResetService } from './passwordreset.service';

@Controller('auth')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}
  @Post('request-reset')
  async requestPasswordReset(@Body('email') email: string) {
    await this.passwordResetService.requestPasswordReset(email);
    return { message: '패스워드 다시 설정 링크를 당신의 이메일에 전송 성공!!' };
  }

  @Get('reset-password')
  async renderResetForm(@Query('token') token: string, @Res() res) {
    try {
      const user = await this.passwordResetService.validateResetToken(token);
      if (user) {
        return res.send(`
                <html>
                    <body>
                    <form method='POST' action='/auth/reset-password'>
                        <input type="hidden" name="token" value="${token}" />
                        <input type="password" name="newPassword" placeholder="새 패스워드" required />
                        <button type="submit">패스워드 변경</button>
                    </form>
                    </body>
                </html>
                `);
      }
    } catch (error) {
      return res.status(400).send('유효하지 않거나 만료된 토큰입니다.');
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    await this.passwordResetService.resetPassword(token, newPassword);
    return { message: '당신의 패스워드가 성공적으로 변경되었습니다.' };
  }
}
