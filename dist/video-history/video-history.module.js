"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const video_history_controller_1 = require("./video-history.controller");
const video_history_service_1 = require("./video-history.service");
const video_play_history_entity_1 = require("./entities/video-play-history.entity");
let VideoHistoryModule = class VideoHistoryModule {
};
exports.VideoHistoryModule = VideoHistoryModule;
exports.VideoHistoryModule = VideoHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([video_play_history_entity_1.VideoPlayHistory])],
        controllers: [video_history_controller_1.VideoHistoryController],
        providers: [video_history_service_1.VideoHistoryService],
    })
], VideoHistoryModule);
//# sourceMappingURL=video-history.module.js.map