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
exports.ShortFormService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const shortform_entity_1 = require("./entities/shortform.entity");
let ShortFormService = class ShortFormService {
    constructor(shortFormRepository) {
        this.shortFormRepository = shortFormRepository;
    }
    async createShortForm(user, content, mediaUrl) {
        const shortForm = this.shortFormRepository.create({
            content,
            mediaUrl,
            user,
        });
        return this.shortFormRepository.save(shortForm);
    }
    async getAllShortForms() {
        return this.shortFormRepository.find({
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }
    async getShortFormById(id) {
        const shortForm = await this.shortFormRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!shortForm) {
            throw new common_1.NotFoundException('쇼폼 콘텐츠를 찾을 수 없습니다.');
        }
        return shortForm;
    }
    async deleteShortForm(id, user) {
        const shortForm = await this.getShortFormById(id);
        if (shortForm.user.id !== user.id) {
            throw new common_1.NotFoundException('삭제할 권한이 없습니다.');
        }
        await this.shortFormRepository.delete(id);
    }
};
exports.ShortFormService = ShortFormService;
exports.ShortFormService = ShortFormService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shortform_entity_1.ShortForm)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ShortFormService);
//# sourceMappingURL=shortform.service.js.map