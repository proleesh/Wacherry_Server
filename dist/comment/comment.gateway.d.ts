import { Server, Socket } from 'socket.io';
import { CommentService } from './comment.service';
export declare class CommentGateway {
    private readonly commentService;
    server: Server;
    constructor(commentService: CommentService);
    handleSendComment(data: {
        videoId: number;
        username: string;
        content: string;
    }, client: Socket): Promise<void>;
}
