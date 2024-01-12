import { it, expect } from '@jest/globals';
import request from 'supertest';

import app from '../../server';

const tokenAdmin = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImVtYWlsIjoiYWRtaW5AZW1haWwuY28iLCJpYXQiOjE3MDQ4Mjg4ODcsImV4cCI6MTcwNTQzMzY4N30.7PpoBpqppyDG96oPfxma3BbLJpXTf-A7cfVd_F0qn5I';

let id;

it('should create a vehicle', async () => {
  const vehicle = {
    name: 'carTest',
    brand: 'brandTest',
    model: 'modelTest',
    price: 1200,
    qtd_stock: 10,
  };
  const res = await request(app).post('/vehicles').send(vehicle).set('authorization', tokenAdmin);

  id = res.body.id;
  expect(res.statusCode).toEqual(201);
  expect(res.body).toHaveProperty('id');
});

it('should index all vehicles', async () => {
  const res = await request(app).get('/vehicles');

  expect(res.statusCode).toEqual(200);
  expect(Array.isArray(res.body)).toEqual(true);
});

it('should show a vehicle', async () => {
  const res = await request(app).get(`/vehicles/${id}`);

  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('id');
});

it('should update a vehicle', async () => {
  const vehicleUpdate = { name: 'testUpdate' };
  const res = await request(app).put(`/vehicles/${id}`).send(vehicleUpdate).set('authorization', tokenAdmin);

  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('id');
});

it('should delete a vehicle', async () => {
  const res = await request(app).delete(`/vehicles/${id}`).set('authorization', tokenAdmin);

  expect(res.statusCode).toBe(204);
  expect(res.body).toEqual({});
});
