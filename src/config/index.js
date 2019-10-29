"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initializers_1 = require("./initializers");
const environment_1 = require("./environment");
const credentials_1 = require("@db/credentials");
function applyConfig() {
    initializers_1.initialize();
    environment_1.applyEnvironmentConfig();
}
exports.applyConfig = applyConfig;
function getConfig() {
    return {
        database: credentials_1.getDatabaseConfig()
    };
}
exports.getConfig = getConfig;
//# sourceMappingURL=index.js.map