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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPlayHistory = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const video_entity_1 = require("../../video/entities/video.entity");
let VideoPlayHistory = class VideoPlayHistory {
};
exports.VideoPlayHistory = VideoPlayHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VideoPlayHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], VideoPlayHistory.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => video_entity_1.Video, video => video.playHistory, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'video_id' }),
    __metadata("design:type", video_entity_1.Video)
], VideoPlayHistory.prototype, "video", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], VideoPlayHistory.prototype, "watched_at", void 0);
exports.VideoPlayHistory = VideoPlayHistory = __decorate([
    (0, typeorm_1.Entity)('video_play_history')
], VideoPlayHistory);
//# sourceMappingURL=video-play-history.entity.js.map