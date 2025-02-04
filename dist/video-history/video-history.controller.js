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
exports.VideoHistoryController = void 0;
const common_1 = require("@nestjs/common");
const video_history_service_1 = require("./video-history.service");
let VideoHistoryController = class VideoHistoryController {
    constructor(historyService) {
        this.historyService = historyService;
    }
    async addHistory(body) {
        console.log('Received Request:', body);
        return this.historyService.create(body.userId, body.videoId);
    }
    async getHistory(userId) {
        return this.historyService.findByUser(userId);
    }
};
exports.VideoHistoryController = VideoHistoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoHistoryController.prototype, "addHistory", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VideoHistoryController.prototype, "getHistory", null);
exports.VideoHistoryController = VideoHistoryController = __decorate([
    (0, common_1.Controller)('video-history'),
    __metadata("design:paramtypes", [video_history_service_1.VideoHistoryService])
], VideoHistoryController);
//# sourceMappingURL=video-history.controller.js.map