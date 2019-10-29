"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("@models/user.model");
exports.default = async () => {
    console.log('Running user seed');
    await user_model_1.User.create({
        name: 'Codelitt'
    });
    console.log('Completed running user seed');
};
//# sourceMappingURL=users.seed.js.map