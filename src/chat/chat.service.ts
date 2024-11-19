import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  create(messageData: Partial<Message>) {
    const newMessage = this.messageRepository.create(messageData);
    return this.messageRepository.save(newMessage);
  }

  // 역사 메시지 얻기
  findAll() {
    return this.messageRepository.find({
      order: { createdAt: 'ASC' },
    });
  }
}
