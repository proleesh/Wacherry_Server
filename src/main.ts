import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 정적 파일 서비스 (예: 업로드된 이미지/비디오 등)
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.setGlobalPrefix('api');

  await app.listen(3000, '0.0.0.0');
  console.log('✅ 서버 실행 중: https://wacherry.com');
}
bootstrap();
