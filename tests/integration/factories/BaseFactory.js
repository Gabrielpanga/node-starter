"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require("faker");
class BaseFactory {
    constructor(model) {
        this.model = model;
    }
    getFaker() {
        return faker;
    }
    create(params = {}) {
        const aModel = this.build(params);
        this.model.save(aModel);
    }
}
exports.BaseFactory = BaseFactory;
//# sourceMappingURL=BaseFactory.js.map