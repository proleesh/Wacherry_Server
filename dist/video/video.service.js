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
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const video_entity_1 = require("./entities/video.entity");
let VideoService = class VideoService {
    constructor(videoRepository) {
        this.videoRepository = videoRepository;
    }
    async create(videoData) {
        const newVideo = this.videoRepository.create(videoData);
        return this.videoRepository.save(newVideo);
    }
    async findAll(req) {
        const videos = await this.videoRepository.find({
            relations: ['category'],
            order: { createAt: 'desc' },
        });
        return videos.map((video) => ({
            ...video,
            url: video.url,
        }));
    }
    async findOne(id, req) {
        const video = await this.videoRepository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!video) {
            throw new common_1.NotFoundException(`ID: ${id} 비디오 없음`);
        }
        const baseUrl = `${req.protocol}://${req.headers.host}`;
        return {
            ...video,
            url: `${baseUrl}/${video.url}`,
        };
    }
    remove(id) {
        return this.videoRepository.delete(id);
    }
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(video_entity_1.Video)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VideoService);
//# sourceMappingURL=video.service.js.map