"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class BaseModel extends sequelize_1.Model {
    static async updateOne(instance) {
        const updateOpts = {
            where: { id: instance.id },
            limit: 1
        };
        return this.update(instance, updateOpts);
    }
    static async deleteOne(id) {
        const deleteOpts = {
            where: { id },
            limit: 1
        };
        return this.destroy(deleteOpts);
    }
}
exports.default = BaseModel;
//# sourceMappingURL=base.model.js.map