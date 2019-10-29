"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models = require("@models");
async function clearDB() {
    return await Promise.all(Object.values(models).map(model => {
        return model.destroy({
            where: {},
            truncate: true
        });
    }));
}
exports.clearDB = clearDB;
//# sourceMappingURL=clearDB.js.map