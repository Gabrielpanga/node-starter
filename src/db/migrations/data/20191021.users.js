"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("@models/user.model");
const defaultUser = 'Codelitt';
exports.default = {
    up: async function () {
        await user_model_1.User.create({
            name: defaultUser
        });
    },
    down: async function () {
        const user = await user_model_1.User.findOne({
            where: { name: defaultUser }
        });
        await user_model_1.User.deleteOne(user.id);
    }
};
//# sourceMappingURL=20191021.users.js.map