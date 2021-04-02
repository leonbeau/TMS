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
exports.Student = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let Student = class Student {
};
__decorate([
    swagger_1.ApiProperty({ description: '用户id', example: '123' }),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Student.prototype, "userId", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '用户名', example: 'zhangsan' }),
    class_validator_1.IsNotEmpty({ message: '请填写用户名' }),
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Student.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '姓名', example: '张三' }),
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Student.prototype, "realname", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '密码', example: 'ceshi123mima' }),
    typeorm_1.Column('varchar'),
    class_validator_1.IsNotEmpty({ message: '请填写密码' }),
    __metadata("design:type", String)
], Student.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '编号', example: '234567' }),
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Student.prototype, "stuNum", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '身份', example: 'stu' }),
    typeorm_1.Column('varchar'),
    class_validator_1.IsNotEmpty({ message: '请填写身份' }),
    __metadata("design:type", String)
], Student.prototype, "identity", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '邮箱', example: '123@qq.com' }),
    class_validator_1.IsNotEmpty({ message: '请填写邮箱' }),
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
Student = __decorate([
    typeorm_1.Entity()
], Student);
exports.Student = Student;
//# sourceMappingURL=student.entity.js.map