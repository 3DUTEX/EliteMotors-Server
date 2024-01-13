import { it, expect } from '@jest/globals';
import request from 'supertest';

import app from '../server';

let token;

const user = { name: 'testJest', email: 'testjest@email.co', password: '123' };

// POST : Create user
it('should create a user', async () => {
  const res = await request(app).post('/users').send(user);
  expect(res.statusCode).toEqual(201);
  expect(res.body).toHaveProperty('id');
});

// POST : Create token
it('should get a token for user', async () => {
  const res = await request(app).post('/auth').send({ email: user.email, password: user.password });
  token = res.body.token;
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('token');
});

// GET : Show user
it('should return a user', async () => {
  const res = await request(app).get('/users').set('authorization', `Bearer ${token}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('id');
});

// PUT : Update user
it('should update a user', async () => {
  const email = 'testjestupdate@email.co';
  const res = await request(app).put('/users').send(email).set('authorization', `Bearer ${token}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('id');
});

// DELETE : Delete user
it('should delete a user', async () => {
  const res = await request(app).delete('/users').set('authorization', `Bearer ${token}`);
  expect(res.statusCode).toEqual(204);
});
