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
  describe('update users controller', () => {
    it('should return a 404 when an invalid user ID is provided', async () => {
      return request(app)
        .patch(`${baseUrl}/0192837465`)
        .send({ ...user, username: 'User Updated' })
        .expect(404);
    });
    it('should return update a user', async () => {
      const { body: postBody } = await request(app)
        .post(baseUrl)
        .send(user)
        .expect(201);
      expect(postBody.user.username).toEqual(user.username);
      const { body: patchBody } = await request(app)
        .patch(`${baseUrl}/${postBody.user.id}`)
        .send({ ...user, username: 'User Updated' })
        .expect(200);
      expect(patchBody.user.username).toEqual('User Updated');
    });
  });
  describe('delete users controller', () => {
    it('should return a 404 when an invalid user ID is provided', async () => {
      return request(app).delete(`${baseUrl}/0192837465`).send({}).expect(404);
    });
    it('should successfully delete a user', async () => {
      const initialCount = await UserRepo.count();
      expect(initialCount).toEqual(0);
      const { body } = await request(app).post(baseUrl).send(user).expect(201);
      const dbUsers = await UserRepo.count();
      expect(dbUsers).toEqual(1);
      await request(app).delete(`${baseUrl}/${body.user.id}`).expect(200);
      const allUsers = await UserRepo.count();
      expect(allUsers).toEqual(0);
    });
  });
});
