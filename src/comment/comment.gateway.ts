import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommentService } from './comment.service';
@WebSocketGateway({
  cors: {
    origin: ['https://wacherry.com', 'https://www.wacherry.com'],
    credentials: true,
  },
})
export class CommentGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly commentService: CommentService) {}

  @SubscribeMessage('sendComment')
  async handleSendComment(
    @MessageBody() data: { videoId: number; username: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { videoId, username, content } = data;
    const newComment = await this.commentService.create(
      videoId,
      username,
      content,
    );

    this.server.to(videoId.toString()).emit('receiveComment', newComment);
  }
}
