/* eslint-disable camelcase */
import Vehicle from '../models/Vehicle';
import { error400, errorCatch } from './errors/error400';

export const create = async (req, res) => {
  try {
    const {
      id, name, brand, model, price, qtd_Stock,
    } = await Vehicle.create({
      idUser: req.userId,
      ...req.body,
    });

    return res.status(201).json({
      id, name, brand, model, price, qtd_Stock,
    });
  } catch (e) {
    console.log(e);
    return errorCatch(res, e);
  }
};

export const index = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();

    return res.status(200).json(vehicles);
  } catch (e) {
    console.log(e);
    return errorCatch(res, e);
  }
};
