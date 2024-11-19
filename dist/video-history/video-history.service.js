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
exports.VideoHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const video_play_history_entity_1 = require("./entities/video-play-history.entity");
let VideoHistoryService = class VideoHistoryService {
    constructor(historyRepository) {
        this.historyRepository = historyRepository;
    }
    async create(userId, videoId) {
        const history = this.historyRepository.create({
            user: { id: userId },
            video: { id: videoId },
        });
        return this.historyRepository.save(history);
    }
    async findByUser(userId) {
        return this.historyRepository.find({
            where: { user: { id: userId } },
            relations: ['video'],
            order: { watched_at: 'DESC' }
        });
    }
};
exports.VideoHistoryService = VideoHistoryService;
exports.VideoHistoryService = VideoHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(video_play_history_entity_1.VideoPlayHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VideoHistoryService);
//# sourceMappingURL=video-history.service.js.map