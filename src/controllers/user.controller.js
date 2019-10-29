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
const user_model_1 = require("@models/user.model");
const typescript_rest_1 = require("typescript-rest");
const typescript_rest_swagger_1 = require("typescript-rest-swagger");
const exampleUser = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Joe'
};
let UsersController = class UsersController {
    /**
     * Recovers all active users
     */
    async list() {
        return await user_model_1.User.findAll();
    }
    /**
     * Recovers the user resource by its id
     * @param id user primary identifier
     */
    async show(id) {
        const user = await user_model_1.User.findByPk(id);
        if (user) {
            return user;
        }
        throw new typescript_rest_1.Errors.NotFoundError('User not found');
    }
    /**
     * Creates a user
     */
    async create(user) {
        return await user_model_1.User.create(user);
    }
    async update(user) {
        await user_model_1.User.updateOne(user);
    }
    async delete(id) {
        await user_model_1.User.deleteOne(id);
    }
};
__decorate([
    typescript_rest_1.GET,
    typescript_rest_swagger_1.Response(200, 'Retrieve a list of users.'),
    typescript_rest_swagger_1.Example([exampleUser]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "list", null);
__decorate([
    typescript_rest_1.Path('/:id'),
    typescript_rest_1.GET,
    typescript_rest_swagger_1.Response(200, 'Retrieve a user.'),
    typescript_rest_swagger_1.Response(404, 'User not found'),
    typescript_rest_swagger_1.Example(exampleUser),
    __param(0, typescript_rest_1.PathParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "show", null);
__decorate([
    typescript_rest_1.POST,
    typescript_rest_swagger_1.Response(201, 'Created user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    typescript_rest_1.PUT,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    typescript_rest_1.Path('/:id'),
    typescript_rest_1.DELETE,
    __param(0, typescript_rest_1.PathParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
UsersController = __decorate([
    typescript_rest_1.Path('/v1/users'),
    typescript_rest_swagger_1.Produces('application/json')
], UsersController);
exports.default = UsersController;
//# sourceMappingURL=user.controller.js.map