"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const _config_1 = require("@config");
const server_1 = require("./server");
function start() {
    console.log(`Starting server in mode: ${process.env.NODE_ENV || 'development'}`);
    _config_1.applyConfig();
    const app = server_1.getApp();
    const { SERVER_PORT } = process.env;
    const PORT = SERVER_PORT || 9090;
    app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`);
    });
}
exports.start = start;
//# sourceMappingURL=index.js.map