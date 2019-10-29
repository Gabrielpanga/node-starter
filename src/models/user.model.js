"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _db_1 = require("@db");
const base_model_1 = require("./base.model");
class IUser {
}
exports.IUser = IUser;
class User extends base_model_1.default {
    static async findByName(name) {
        const queryOpts = {
            where: { name }
        };
        return User.findOne(queryOpts);
    }
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    }
}, {
    tableName: 'users',
    sequelize: _db_1.database
});
//# sourceMappingURL=user.model.js.map