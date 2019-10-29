import { getApp } from '@server';
import { User } from '@models';
import * as request from 'supertest';

describe('UsersController', () => {
  describe('GET /users', () => {
    it('returns list of users', async () => {
      const userData = {
        name: 'user test'
      };

      await User.create(userData);

      const { body } = await request(getApp())
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
      const user = await User.create(userData);

      const { body } = await request(getApp())
        .get(`/users/${user!.id}`)
        .send();

      return expect(body.name).toBe(userData.name);
    });
  });
});
