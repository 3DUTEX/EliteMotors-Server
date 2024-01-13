import { it, expect } from '@jest/globals';
import request from 'supertest';

import app from '../server';

const tokenAdmin = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImVtYWlsIjoiYWRtaW5AZW1haWwuY28iLCJpYXQiOjE3MDQ4Mjg4ODcsImV4cCI6MTcwNTQzMzY4N30.7PpoBpqppyDG96oPfxma3BbLJpXTf-A7cfVd_F0qn5I';
const vehicleID = 4;

let id;

it('should create a reservation', async () => {
  const reservation = {
    vehicleID,
    visitDate: '2024/12/01',
  };
  const res = await request(app).post('/reservations').send(reservation).set('authorization', tokenAdmin);

  id = res.body.id;
  expect(res.statusCode).toEqual(201);
  expect(res.body).toHaveProperty('id');
});

it('should show one reservation of user logged', async () => {
  const res = await request(app).get(`/reservations/${id}`).set('authorization', tokenAdmin);

  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('id');
});

it('should show all reservations of user logged', async () => {
  const res = await request(app).get('/reservations').set('authorization', tokenAdmin);

  expect(res.statusCode).toEqual(200);
  expect(Array.isArray(res.body)).toEqual(true);
});

it('should update one reservation', async () => {
  const update = { visitDate: '2024/04/21' };
  const res = await request(app).put(`/reservations/${id}`).send(update).set('authorization', tokenAdmin);

  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('id');
});

it('should delete one reservation', async () => {
  const res = await request(app).delete(`/reservations/${id}`).set('authorization', tokenAdmin);

  expect(res.statusCode).toBe(204);
  expect(res.body).toEqual({});
});
