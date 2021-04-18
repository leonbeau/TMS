"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const apply_controller_1 = require("./apply.controller");
const apply_service_1 = require("./apply.service");
const apply_entity_1 = require("./apply.entity");
const course_module_1 = require("../course/course.module");
const users_module_1 = require("../users/users.module");
let ApplyModule = class ApplyModule {
};
ApplyModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([apply_entity_1.Apply]), course_module_1.CourseModule, users_module_1.UsersModule],
        controllers: [apply_controller_1.ApplyController],
        providers: [apply_service_1.ApplyService],
        exports: [apply_service_1.ApplyService],
    })
], ApplyModule);
exports.ApplyModule = ApplyModule;
//# sourceMappingURL=apply.module.js.map