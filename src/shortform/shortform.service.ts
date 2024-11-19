import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortForm } from './entities/shortform.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ShortFormService {
  constructor(
    @InjectRepository(ShortForm)
    private shortFormRepository: Repository<ShortForm>,
  ) {}

  async createShortForm(
    user: User,
    content: string,
    mediaUrl?: string,
  ): Promise<ShortForm> {
    const shortForm = this.shortFormRepository.create({
      content,
      mediaUrl,
      user,
    });
    return this.shortFormRepository.save(shortForm);
  }

  async getAllShortForms(): Promise<ShortForm[]> {
    return this.shortFormRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async getShortFormById(id: number): Promise<ShortForm> {
    const shortForm = await this.shortFormRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!shortForm) {
      throw new NotFoundException('쇼폼 콘텐츠를 찾을 수 없습니다.');
    }
    return shortForm;
  }

  async deleteShortForm(id: number, user: User): Promise<void> {
    const shortForm = await this.getShortFormById(id);
    if (shortForm.user.id !== user.id) {
      throw new NotFoundException('삭제할 권한이 없습니다.');
    }
    await this.shortFormRepository.delete(id);
  }
}
