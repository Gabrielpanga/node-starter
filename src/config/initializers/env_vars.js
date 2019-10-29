"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
function loadEnvVars() {
    dotenv.config({ path: '.env' });
}
exports.loadEnvVars = loadEnvVars;
//# sourceMappingURL=env_vars.js.map