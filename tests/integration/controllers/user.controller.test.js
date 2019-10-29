"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _server_1 = require("@server");
const _models_1 = require("@models");
const request = require("supertest");
describe('UsersController', () => {
    describe('GET /users', () => {
        it('returns list of users', async () => {
            const userData = {
                name: 'user test'
            };
            await _models_1.User.create(userData);
            const { body } = await request(_server_1.getApp())
                .get(`/users`)
                .send();
            return expect(body[0].name).toBe(userData.name);
        });
    });
    describe('GET /users/:id', () => {
        it('returns the user', async () => {
            const userData = {
                name: 'user test'
            };
            const user = await _models_1.User.create(userData);
            const { body } = await request(_server_1.getApp())
                .get(`/users/${user.id}`)
                .send();
            return expect(body.name).toBe(userData.name);
        });
    });
});
//# sourceMappingURL=user.controller.test.js.map