"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _models_1 = require("@models");
const BaseFactory_1 = require("./BaseFactory");
class UserFactory extends BaseFactory_1.BaseFactory {
    constructor() {
        super(_models_1.User);
    }
    build(props = {}) {
        const defaults = {
            name: this.getFaker().name.findName()
        };
        return Object.assign(Object.assign({}, defaults), props);
    }
}
exports.UserFactory = UserFactory;
//# sourceMappingURL=UserFactory.js.map