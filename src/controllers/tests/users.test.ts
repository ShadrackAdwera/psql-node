import request from 'supertest';
import { app } from '../../app';
import { UserRepo } from '../../repo/users';

const baseUrl = '/api/users';
const user = {
  username: 'To be updated',
  bio: 'User created to be updated',
};

describe('user controllers', () => {
  describe('get users controller', () => {
    it('should return all users', async () => {
      const { body } = await request(app).get(baseUrl).send({}).expect(200);
      expect(body.users.length).toEqual(0);
    });
  });
  describe('create users controller', () => {
    it('should return a 422 when a user is created without a username', () => {
      return request(app).post(baseUrl).send({ bio: 'alskdjfhg' }).expect(422);
    });
    it('should create a user', async () => {
      const totalUsers = await UserRepo.count();
      expect(totalUsers).toEqual(0);
      const { body } = await request(app).post(baseUrl).send(user).expect(201);
      expect(body.user.username).toBe(user.username);
      const newTotalUsers = await UserRepo.count();
      expect(newTotalUsers).toEqual(1);
    });
  });
  describe('update users controller', () => {});
  describe('delete users controller', () => {});
});
