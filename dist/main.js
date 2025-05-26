"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.enableCors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                'https://wacherry.com',
                'https://www.wacherry.com',
            ];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, origin);
            }
            else {
                callback(new Error('CORS에 의해 허용되지 않음'));
            }
        },
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.setGlobalPrefix('api');
    await app.listen(3000, '0.0.0.0');
    console.log('✅ 서버 실행 중: https://wacherry.com');
}
bootstrap();
//# sourceMappingURL=main.js.map