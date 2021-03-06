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
exports.User = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let User = class User {
};
__decorate([
    swagger_1.ApiProperty({ description: '用户id', example: '123' }),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '用户名', example: 'zhangsan' }),
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '姓名', example: '张三' }),
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "realname", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '密码', example: 'ceshi123mima' }),
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '编号', example: '234567' }),
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "stuNum", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '身份', example: 'stu' }),
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "identity", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '邮箱', example: '123@qq.com' }),
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=users.entity.js.map