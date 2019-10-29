"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envVars_1 = require("@config/initializers/envVars");
describe('#loadEnvVars', () => {
    it('loads the DB_DATABASE variable', () => {
        expect(process.env.DB_DATABASE).toBeFalsy();
        envVars_1.loadEnvVars();
        expect(process.env.DB_DATABASE).toBeTruthy();
    });
});
//# sourceMappingURL=envVars.test.js.map