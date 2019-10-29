"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("@models/user.model");
const UserFactory_1 = require("../factories/UserFactory");
const userFactory = new UserFactory_1.UserFactory();
describe('User', () => {
    describe('#create', () => {
        describe('with valid params', () => {
            it('creates a user', async () => {
                const user = await user_model_1.User.create(userFactory.build());
                expect(user.id).toBeTruthy();
            });
        });
        describe('with invalid params', () => {
            it('fails to create a user', async () => {
                const userParams = userFactory.build({
                    name: userFactory.getFaker().random.alphaNumeric(129)
                });
                expect(user_model_1.User.create(userParams)).rejects.toThrowError();
            });
        });
    });
});
//# sourceMappingURL=user.model.test.js.map