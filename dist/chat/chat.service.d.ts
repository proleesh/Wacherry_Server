import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
export declare class ChatService {
    private messageRepository;
    constructor(messageRepository: Repository<Message>);
    create(messageData: Partial<Message>): Promise<Message>;
    findAll(): Promise<Message[]>;
}
