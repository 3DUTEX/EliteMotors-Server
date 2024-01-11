/* eslint-disable camelcase */
import Vehicle from '../models/Vehicle';
import User from '../models/User';
import { error400, errorCatch } from './errors/error400';

const queryConfig = {
  attributes: ['id', 'name', 'brand', 'model', 'price', 'qtd_stock'],
  order: [['id', 'DESC']], // Ordem de adição
  include: {
    model: User,
    as: 'createdBy',
    attributes: ['id', 'name', 'email'],
  },
};

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
    const vehicles = await Vehicle.findAll(queryConfig);

    return res.status(200).json(vehicles);
  } catch (e) {
    return errorCatch(res, e);
  }
};

export const show = async (req, res) => {
  try {
    const idVehicle = req.params.id || 0;

    if (!idVehicle) return error400(res, 'bad request', 'id param is required');

    const vehicle = await Vehicle.findByPk(idVehicle, queryConfig);

    if (!vehicle) return error400(res, 'bad request', 'vehicle is not found');

    return res.status(200).json(vehicle);
  } catch (e) {
    return errorCatch(res, e);
  }
};

export const update = async (req, res) => {
  try {
    const idVehicle = req.params.id || 0;

    if (!idVehicle) return error400(res, 'bad request', 'id param is required');

    const vehicle = await Vehicle.findByPk(idVehicle, queryConfig);

    if (!vehicle) return error400(res, 'bad request', 'vehicle is not found');

    const vehicleUpdated = await vehicle.update(req.body);

    return res.status(200).json(vehicleUpdated);
  } catch (e) {
    return errorCatch(res, e);
  }
};
