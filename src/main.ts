import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 정적 파일 서비스 (예: 업로드된 이미지/비디오 등)
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // CORS 설정
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://wacherry.com',
        'https://www.wacherry.com',
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error('CORS에 의해 허용되지 않음'));
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.setGlobalPrefix('api');

  await app.listen(3000, '0.0.0.0');
  console.log('✅ 서버 실행 중: https://wacherry.com');
}
bootstrap();
