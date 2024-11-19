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
exports.ShortFormController = void 0;
const common_1 = require("@nestjs/common");
const shortform_service_1 = require("./shortform.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
let ShortFormController = class ShortFormController {
    constructor(shortFormService) {
        this.shortFormService = shortFormService;
    }
    async createShortForm(file, content, req) {
        try {
            console.log('쇼폼 생성 요청 수신');
            console.log('사용자 정보:', req.user);
            console.log('업로드된 파일:', file);
            console.log('내용:', content);
            const user = req.user;
            if (!user || !user.id) {
                throw new Error('유효하지 않은 사용자');
            }
            const mediaUrl = file ? `/uploads/shortforms/${file.filename}` : null;
            return this.shortFormService.createShortForm(user, content, mediaUrl);
        }
        catch (error) {
            console.error('쇼폼 생성 중 오류:', error);
            throw new common_1.BadRequestException('쇼폼 등록에 실패했습니다.');
        }
    }
    async getAllShortForms() {
        return this.shortFormService.getAllShortForms();
    }
    async getShortFormById(id) {
        return this.shortFormService.getShortFormById(id);
    }
    async deleteShortForm(id, req) {
        const user = req.user;
        await this.shortFormService.deleteShortForm(id, user);
        return { message: '쇼폼 콘텐츠가 삭제되었습니다.' };
    }
};
exports.ShortFormController = ShortFormController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('media', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/uploads/shortforms',
            filename: (req, file, callback) => {
                const uniqueName = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
                callback(null, uniqueName);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('content')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ShortFormController.prototype, "createShortForm", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShortFormController.prototype, "getAllShortForms", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShortFormController.prototype, "getShortFormById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ShortFormController.prototype, "deleteShortForm", null);
exports.ShortFormController = ShortFormController = __decorate([
    (0, common_1.Controller)('shortforms'),
    __metadata("design:paramtypes", [shortform_service_1.ShortFormService])
], ShortFormController);
//# sourceMappingURL=shortform.controller.js.map