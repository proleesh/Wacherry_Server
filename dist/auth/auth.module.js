"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const mailer_1 = require("@nestjs-modules/mailer");
const passwordreset_service_1 = require("../resetaccount/passwordreset.service");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const passwordreset_controller_1 = require("../resetaccount/passwordreset.controller");
const config_1 = require("@nestjs/config");
let AuthModule = class AuthModule {
    configure(consumer) { }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            jwt_1.JwtModule.register({
                secret: 'secretKey',
                signOptions: { expiresIn: '1h' },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.EMAIL_HOST,
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                },
                defaults: {
                    from: `"Wacherry with SDEK Team <No Reply-${process.env.EMAIL_FROM}>" <${process.env.EMAIL_FROM}>`,
                },
            }),
        ],
        providers: [jwt_auth_guard_1.JwtAuthGuard, passwordreset_service_1.PasswordResetService, user_service_1.UserService],
        controllers: [passwordreset_controller_1.PasswordResetController],
        exports: [jwt_1.JwtModule, jwt_auth_guard_1.JwtAuthGuard, passwordreset_service_1.PasswordResetService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map