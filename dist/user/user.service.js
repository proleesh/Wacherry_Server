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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async findAllUsers() {
        return await this.userRepository.find();
    }
    async generateAdminCustomId() {
        for (let customId = 10000; customId <= 10009; ++customId) {
            const existingUser = await this.userRepository.findOne({
                where: { customId },
            });
            if (!existingUser)
                return customId;
            throw new common_1.ConflictException('관리자 아이디 분포 끝');
        }
    }
    async generateUniqueCustomId() {
        let customId;
        let isUnique = false;
        const min5 = 10010;
        const max5 = 99999;
        const min6 = 100000;
        const max6 = 999999;
        while (!isUnique && customId <= max5) {
            customId = Math.floor(Math.random() * (max5 - min5 + 1)) + min5;
            const existingUser = await this.userRepository.findOne({
                where: { customId },
            });
            if (!existingUser) {
                isUnique = true;
                return customId;
            }
        }
        while (!isUnique) {
            customId = Math.floor(Math.random() * (max6 - min6 + 1)) + min6;
            const existingUser = await this.userRepository.findOne({
                where: { customId },
            });
            if (!existingUser) {
                isUnique = true;
            }
        }
        return customId;
    }
    async register(username, password, nickname, email, isAdmin = false, avatar) {
        const existingUser = await this.userRepository.findOne({
            where: { username },
        });
        if (existingUser) {
            throw new common_1.ConflictException('아이디 존재함.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            username,
            password: hashedPassword,
            nickname,
            email,
            isAdmin,
            avatar,
        });
        if (isAdmin) {
            user.customId = await this.generateAdminCustomId();
        }
        else {
            user.customId = await this.generateUniqueCustomId();
        }
        return this.userRepository.save(user);
    }
    async validateUser(userIdentifier, password) {
        let user;
        if (!isNaN(Number(userIdentifier))) {
            user = await this.userRepository.findOne({
                where: { customId: Number(userIdentifier) },
            });
        }
        else {
            user = await this.userRepository.findOne({
                where: { username: userIdentifier },
            });
        }
        if (!user || !(await user.validatePassword(password))) {
            throw new common_1.UnauthorizedException('아이디또는 패스워드 오류');
        }
        const { password: _, ...result } = user;
        return result;
    }
    async login(user) {
        const payload = {
            username: user.username,
            sub: user.id,
            nickname: user.nickname,
            avatar: user.avatar,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                username: user.username,
                nickname: user.nickname,
                customId: user.customId,
                bannerUrl: user.bannerUrl,
                avatar: user.avatar,
            },
        };
    }
    async updateBannerUrl(id, bannerUrl) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.bannerUrl = bannerUrl;
        return this.userRepository.save(user);
    }
    async findUserById(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateAvatar(id, avatarUrl) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new Error('User not found');
        }
        user.avatar = avatarUrl;
        await this.userRepository.save(user);
    }
    async save(user) {
        await this.userRepository.save(user);
    }
    async findByEmail(email) {
        return this.userRepository.findOne({
            where: { email: email },
        });
    }
    async findByResetToken(token) {
        return await this.userRepository.findOne({
            where: { resetToken: token },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map