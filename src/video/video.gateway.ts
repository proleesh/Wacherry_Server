import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['https://wacherry.com', 'https://www.wacherry.com'],
    methods: ['GET', 'POST'], // 허용할 메서드
    credentials: true,
  },
})
export class VideoGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('Gateway Initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinVideoRoom')
  handleJoinVideoRoom(
    @MessageBody() data: { videoId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `video_${data.videoId}`;
    client.join(room);
    this.server
      .to(room)
      .emit('message', { message: `User joined room ${room}` });
  }
}
