import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { PasswordResetService } from 'src/resetaccount/passwordreset.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetController } from 'src/resetaccount/passwordreset.controller';
import * as cors from 'cors';
@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mail.yahoo.com',
        port: 465, // SSL 포트 사용
        secure: true,
        auth: {
          user: 'merci726@yahoo.com',
          pass: 'splddfbcbuveubma',
        },
      },
      defaults: {
        from: '"No Reply" <merci726@yahoo.com>',
      },
    }),
  ],
  providers: [JwtAuthGuard, PasswordResetService, UserService],
  controllers: [PasswordResetController],
  exports: [JwtModule, JwtAuthGuard, PasswordResetService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
