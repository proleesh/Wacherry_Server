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
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: 465, // SSL 포트 사용
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: `"Wacherry with SDEK Team <No Reply-${process.env.EMAIL_FROM}>" <${process.env.EMAIL_FROM}>`,
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
