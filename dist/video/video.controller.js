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
exports.VideoController = void 0;
const common_1 = require("@nestjs/common");
const video_service_1 = require("./video.service");
const multer_1 = require("multer");
const path = require("path");
const uuid_1 = require("uuid");
const platform_express_1 = require("@nestjs/platform-express");
const category_service_1 = require("../category/category.service");
const fs = require("fs");
let VideoController = class VideoController {
    constructor(videoService, categoryService) {
        this.videoService = videoService;
        this.categoryService = categoryService;
        this.logger = new common_1.Logger('VideoController');
    }
    create(videoData) {
        return this.videoService.create(videoData);
    }
    async uploadVideo(file, body) {
        if (!file) {
            throw new common_1.HttpException('비디오 업로드 없음', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!file || !file.path) {
            this.logger.error('파일이 정의되지 않음 또는 path 없음');
            throw new common_1.InternalServerErrorException('파일 경로가 존재하지 않습니다.');
        }
        try {
            const category = await this.categoryService.findOne(body.categoryId);
            if (!category) {
                throw new common_1.NotFoundException('해당 카테고리 못 찾음!');
            }
            const filePath = path.join('./public/uploads/videos', file.filename);
            console.log('>>> 변환에 전달된 filePath:', filePath);
            if (!fs.existsSync(filePath)) {
                this.logger.error(`파일 경로 존재하지 않음: ${filePath}`);
                throw new common_1.InternalServerErrorException('파일 경로 오류');
            }
            const hlsPath = await this.videoService.convertToHLS(filePath);
            console.log('⚠️ file:', file);
            console.log('📎 file.filename:', file?.filename);
            console.log('📎 file.destination:', file?.destination);
            console.log('📎 생성된 filePath:', filePath);
            const videoData = {
                title: body.title,
                description: body.description,
                url: hlsPath,
                originalUrl: `uploads/videos/${file.filename}`,
                category: category,
            };
            return await this.videoService.create(videoData);
        }
        catch (err) {
            this.logger.error(`업로드 중 오류 발생: ${err.message}`, err.stack, 'uploadVideo');
            console.error(err);
            throw new common_1.InternalServerErrorException('비디오 업로드 실패');
        }
    }
    findAll(req) {
        return this.videoService.findAll(req);
    }
    findOne(id, req) {
        return this.videoService.findOne(+id, req);
    }
    remove(id) {
        return this.videoService.remove(+id);
    }
    async reactToVideo(videoId, userId, reaction) {
        return await this.videoService.reactToVideo(videoId, userId, reaction);
    }
    async removeReaction(videoId, userId) {
        return await this.videoService.removeReaction(videoId, userId);
    }
    async getVideoReactions(videoId) {
        return await this.videoService.getVideoReactions(videoId);
    }
    async incrementViewCount(videoId) {
        const views = await this.videoService.incrementViewCount(videoId);
        return { views };
    }
};
exports.VideoController = VideoController;
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VideoController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/uploads/videos',
            filename: (req, file, callback) => {
                const uniqueName = `${(0, uuid_1.v4)()}${path.extname(file.originalname)}`;
                callback(null, uniqueName);
            },
        }),
        limits: {
            fileSize: 100000 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "uploadVideo", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VideoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], VideoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VideoController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/react'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Body)('reaction')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "reactToVideo", null);
__decorate([
    (0, common_1.Delete)(':id/reaction'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "removeReaction", null);
__decorate([
    (0, common_1.Get)(':id/reactions'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideoReactions", null);
__decorate([
    (0, common_1.Post)(':id/view'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "incrementViewCount", null);
exports.VideoController = VideoController = __decorate([
    (0, common_1.Controller)('videos'),
    __metadata("design:paramtypes", [video_service_1.VideoService,
        category_service_1.CategoryService])
], VideoController);
//# sourceMappingURL=video.controller.js.map