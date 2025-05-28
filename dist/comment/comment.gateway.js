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
exports.CommentGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const comment_service_1 = require("./comment.service");
let CommentGateway = class CommentGateway {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async handleSendComment(data, client) {
        const { videoId, username, content } = data;
        const newComment = await this.commentService.create(videoId, username, content);
        this.server.to(videoId.toString()).emit('receiveComment', newComment);
    }
};
exports.CommentGateway = CommentGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CommentGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendComment'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CommentGateway.prototype, "handleSendComment", null);
exports.CommentGateway = CommentGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ['https://wacherry.com', 'https://www.wacherry.com'],
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentGateway);
//# sourceMappingURL=comment.gateway.js.map