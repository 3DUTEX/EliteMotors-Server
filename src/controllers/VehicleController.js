/* eslint-disable camelcase */
import Vehicle from '../models/Vehicle';
import User from '../models/User';
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
    return errorCatch(res, e);
  }
};

export const index = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      attributes: ['id', 'name', 'brand', 'model', 'price', 'qtd_stock'],
      order: [['id', 'DESC']], // Ordem de adição
      include: {
        model: User,
        as: 'createdBy',
        attributes: ['id', 'name', 'email'],
      },
    });

    return res.status(200).json(vehicles);
  } catch (e) {
    return errorCatch(res, e);
  }
};
