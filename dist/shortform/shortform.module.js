"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortFormModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shortform_entity_1 = require("./entities/shortform.entity");
const shortform_service_1 = require("./shortform.service");
const shortform_controller_1 = require("./shortform.controller");
const user_module_1 = require("../user/user.module");
const auth_module_1 = require("../auth/auth.module");
let ShortFormModule = class ShortFormModule {
};
exports.ShortFormModule = ShortFormModule;
exports.ShortFormModule = ShortFormModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([shortform_entity_1.ShortForm]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        providers: [shortform_service_1.ShortFormService],
        controllers: [shortform_controller_1.ShortFormController],
    })
], ShortFormModule);
//# sourceMappingURL=shortform.module.js.map