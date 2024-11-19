import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortForm } from './entities/shortform.entity';
import { ShortFormService } from './shortform.service';
import { ShortFormController } from './shortform.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShortForm]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  providers: [ShortFormService],
  controllers: [ShortFormController],
})
export class ShortFormModule {}
