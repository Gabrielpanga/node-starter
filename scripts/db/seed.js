"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const index_1 = require("@db/seeds/index");
const envVars_1 = require("@config/initializers/envVars");
async function seed() {
    envVars_1.loadEnvVars();
    console.log('Running seeds');
    try {
        let i = 0;
        for (; i < index_1.default.length; i++) {
            await index_1.default[i]();
        }
        console.log(`Run ${i} seed(s) successfully!`);
    }
    catch (err) {
        console.error(err);
    }
    process.exit();
}
seed();
//# sourceMappingURL=seed.js.map