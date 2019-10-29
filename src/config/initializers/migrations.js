"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const Umzug = require("umzug");
const _db_1 = require("@db");
const sequelize_1 = require("sequelize");
const envVars_1 = require("./envVars");
const migrationsPath = path.join(__dirname, '../../db/migrations');
function default_1() {
    envVars_1.loadEnvVars();
    return new Umzug({
        migrations: {
            path: migrationsPath,
            params: [_db_1.database.getQueryInterface(), sequelize_1.Sequelize],
            pattern: /\.up.sql$/,
            customResolver: path => {
                const downPath = path.replace('up', 'down');
                return {
                    up: () => _db_1.database.query(fs.readFileSync(path, 'utf-8')),
                    down: () => _db_1.database.query(fs.readFileSync(downPath, 'utf-8'))
                };
            }
        },
        storage: 'sequelize',
        storageOptions: {
            database: _db_1.database,
            sequelize: _db_1.database
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=migrations.js.map