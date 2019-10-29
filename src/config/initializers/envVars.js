"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
function loadEnvVars() {
    if (process.env.NODE_ENV === 'test') {
        dotenv.config({ path: '.env.test' });
    }
    else {
        dotenv.config({ path: '.env' });
    }
}
exports.loadEnvVars = loadEnvVars;
//# sourceMappingURL=envVars.js.map