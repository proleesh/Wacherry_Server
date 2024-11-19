import { Server } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway {
    private readonly chatService;
    server: Server;
    constructor(chatService: ChatService);
    handleMessage(data: {
        sender: string;
        message: string;
    }): Promise<void>;
}
