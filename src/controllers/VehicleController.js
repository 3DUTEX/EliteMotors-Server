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

async function findVehicle(req) {
  const idVehicle = req.params.id || 0;

  if (!idVehicle) {
    return {
      error: {
        type: 'bad request',
        message: 'id vehicle invalid or not receveid',
      },
    };
  }

  const vehicle = await Vehicle.findByPk(idVehicle, queryConfig);

  if (!vehicle) {
    return {
      error: {
        type: 'bad request',
        message: 'vehicle is not found',
      },
    };
  }

  return vehicle;
}

export const create = async (req, res) => {
  try {
    const vehicle = await Vehicle.create({
      idUser: req.userId,
      ...req.body,
    });

    return res.status(201).json(vehicle);
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
    const vehicle = await findVehicle(req);

    if (vehicle.error) {
      const { type, message } = vehicle.error;
      return error400(res, type, message);
    }

    return res.status(200).json(vehicle);
  } catch (e) {
    console.log(e);
    return errorCatch(res, e);
  }
};

export const update = async (req, res) => {
  try {
    const vehicle = await findVehicle(req);

    if (vehicle.error) {
      const { type, message } = vehicle.error;
      return error400(res, type, message);
    }

    const vehicleUpdated = await vehicle.update(req.body);

    return res.status(200).json(vehicleUpdated);
  } catch (e) {
    return errorCatch(res, e);
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await findVehicle(req);

    if (vehicle.error) {
      const { type, message } = vehicle.error;
      return error400(res, type, message);
    }

    await vehicle.destroy();

    return res.status(204).json();
  } catch (e) {
    return errorCatch(res, e);
  }
};
