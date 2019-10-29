"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const development_1 = require("./development");
const production_1 = require("./production");
const test_1 = require("./test");
function applyEnvironmentConfig() {
    const { NODE_ENV } = process.env;
    base_1.applyBaseConfig();
    if (NODE_ENV === 'production') {
        production_1.applyProductionConfig();
    }
    else if (NODE_ENV === 'test') {
        test_1.applyTestConfig();
    }
    else {
        development_1.applyDevelopmentConfig();
    }
}
exports.applyEnvironmentConfig = applyEnvironmentConfig;
//# sourceMappingURL=index.js.map