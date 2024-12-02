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
const user_entity_1 = require("../user/entities/user.entity");
const video_reaction_entity_1 = require("./entities/video-reaction.entity");
let VideoService = class VideoService {
    constructor(videoRepository, userRepository, reactionRepository) {
        this.videoRepository = videoRepository;
        this.userRepository = userRepository;
        this.reactionRepository = reactionRepository;
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
    async reactToVideo(videoId, userId, reactionType) {
        const video = await this.videoRepository.findOne({
            where: { id: videoId },
        });
        if (!video)
            throw new common_1.NotFoundException('Video not found');
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const existingReaction = await this.reactionRepository.findOne({
            where: { video, user },
        });
        if (existingReaction) {
            if (existingReaction.reaction === reactionType) {
                await this.reactionRepository.remove(existingReaction);
                reactionType === 'like' ? video.likes-- : video.dislikes--;
            }
            else {
                reactionType === 'like'
                    ? (video.likes++, video.dislikes--)
                    : (video.likes--, video.dislikes++);
                existingReaction.reaction = reactionType;
                await this.reactionRepository.save(existingReaction);
            }
        }
        else {
            const newReaction = this.reactionRepository.create({
                video,
                user,
                reaction: reactionType,
            });
            reactionType === 'like' ? video.likes++ : video.dislikes++;
            await this.reactionRepository.save(newReaction);
        }
        await this.videoRepository.save(video);
        return {
            likes: video.likes,
            dislikes: video.dislikes,
        };
    }
    async removeReaction(videoId, userId) {
        const video = await this.videoRepository.findOne({
            where: { id: videoId },
        });
        if (!video)
            throw new common_1.NotFoundException('Video not found');
        const reaction = await this.reactionRepository.findOne({
            where: { video, user: { id: userId } },
        });
        if (!reaction) {
            throw new common_1.NotFoundException('No reaction to remove');
        }
        await this.reactionRepository.remove(reaction);
        return 'Reaction removed successfully';
    }
    async getVideoReactions(videoId) {
        const likes = await this.reactionRepository.count({
            where: { video: { id: videoId }, reaction: 'like' },
        });
        const dislikes = await this.reactionRepository.count({
            where: { video: { id: videoId }, reaction: 'dislike' },
        });
        return { likes, dislikes };
    }
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(video_entity_1.Video)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(video_reaction_entity_1.VideoReaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], VideoService);
//# sourceMappingURL=video.service.js.map