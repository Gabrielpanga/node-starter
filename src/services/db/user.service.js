"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("@models/user.model");
class UsersService {
    static async findAll() {
        return user_model_1.User.findAll({});
    }
    static async findOne(id) {
        return user_model_1.User.findByPk(id);
    }
    static async create(user) {
        return user_model_1.User.create(user);
    }
    static async update(id, user) {
        const updateOpts = {
            where: { id },
            limit: 1
        };
        return user_model_1.User.update(user, updateOpts);
    }
    static async delete(id) {
        const deleteOpts = {
            where: { id },
            limit: 1
        };
        return user_model_1.User.destroy(deleteOpts);
    }
}
exports.default = UsersService;
//# sourceMappingURL=user.service.js.map