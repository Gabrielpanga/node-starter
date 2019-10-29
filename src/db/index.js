"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const credentials_1 = require("./credentials");
const _config_1 = require("@config");
exports.database = new sequelize_1.Sequelize(credentials_1.getConnURIWithDatabaseName(), {
    dialect: 'postgres',
    logging: _config_1.getConfig().database.sqlLog
});
//# sourceMappingURL=index.js.map