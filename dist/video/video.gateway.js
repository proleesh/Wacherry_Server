"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let VideoGateway = class VideoGateway {
    afterInit(server) {
        console.log('Gateway Initialized');
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    handleJoinVideoRoom(data, client) {
        const room = `video_${data.videoId}`;
        client.join(room);
        this.server
            .to(room)
            .emit('message', { message: `User joined room ${room}` });
    }
};
exports.VideoGateway = VideoGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], VideoGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinVideoRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], VideoGateway.prototype, "handleJoinVideoRoom", null);
exports.VideoGateway = VideoGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ['https://wacherry.com', 'https://www.wacherry.com'],
            methods: ['GET', 'POST'],
            credentials: true,
        },
    })
], VideoGateway);
//# sourceMappingURL=video.gateway.js.map