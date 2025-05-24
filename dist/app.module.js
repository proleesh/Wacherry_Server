"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const video_module_1 = require("./video/video.module");
const chat_module_1 = require("./chat/chat.module");
const video_entity_1 = require("./video/entities/video.entity");
const message_entity_1 = require("./chat/entities/message.entity");
const user_entity_1 = require("./user/entities/user.entity");
const user_module_1 = require("./user/user.module");
const video_history_module_1 = require("./video-history/video-history.module");
const category_module_1 = require("./category/category.module");
const comment_module_1 = require("./comment/comment.module");
const shortform_module_1 = require("./shortform/shortform.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const hlsStaticOptions = {
    rootPath: (0, path_1.join)(__dirname, '..', 'hls'),
    serveRoot: '/hls',
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.m3u8')) {
            res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        }
        else if (filePath.endsWith('.ts')) {
            res.setHeader('Content-Type', 'video/MP2T');
        }
    },
};
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot(hlsStaticOptions),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'frontend', 'dist'),
                exclude: ['/api*', '/hls*'],
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'wacherry_user',
                password: 'Wacherry@123',
                database: 'media_chat_app',
                entities: [video_entity_1.Video, message_entity_1.Message, user_entity_1.User],
                autoLoadEntities: true,
                synchronize: true,
                logging: false,
            }),
            video_history_module_1.VideoHistoryModule,
            video_module_1.VideoModule,
            chat_module_1.ChatModule,
            user_module_1.UserModule,
            category_module_1.CategoryModule,
            comment_module_1.CommentModule,
            shortform_module_1.ShortFormModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map