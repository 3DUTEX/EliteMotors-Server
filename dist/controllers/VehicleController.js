"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable camelcase */
var _Vehicle = require('../models/Vehicle'); var _Vehicle2 = _interopRequireDefault(_Vehicle);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Image = require('../models/Image'); var _Image2 = _interopRequireDefault(_Image);
var _error400 = require('./errors/error400');

const queryConfig = {
  attributes: ['id', 'name', 'brand', 'model', 'price', 'qtd_stock'],
  order: [['id', 'DESC']], // Ordem de adição
  include: [
    {
      model: _Image2.default,
      as: 'images',
      attributes: ['id', 'storageID', 'url'],
    },
    {
      model: _User2.default,
      as: 'createdBy',
      attributes: ['id', 'name', 'email'],
    },
  ],
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

  const vehicle = await _Vehicle2.default.findByPk(idVehicle, queryConfig);

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

 const create = async (req, res) => {
  try {
    const vehicle = await _Vehicle2.default.create({
      idUser: req.userId,
      ...req.body,
    });

    return res.status(201).json(vehicle);
  } catch (e) {
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.create = create;

 const index = async (req, res) => {
  try {
    const vehicles = await _Vehicle2.default.findAll(queryConfig);

    return res.status(200).json(vehicles);
  } catch (e) {
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.index = index;

 const show = async (req, res) => {
  try {
    const vehicle = await findVehicle(req);

    if (vehicle.error) {
      const { type, message } = vehicle.error;
      return _error400.error400.call(void 0, res, type, message);
    }

    return res.status(200).json(vehicle);
  } catch (e) {
    console.log(e);
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.show = show;

 const update = async (req, res) => {
  try {
    const vehicle = await findVehicle(req);

    if (vehicle.error) {
      const { type, message } = vehicle.error;
      return _error400.error400.call(void 0, res, type, message);
    }

    const vehicleUpdated = await vehicle.update(req.body);

    return res.status(200).json(vehicleUpdated);
  } catch (e) {
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.update = update;

 const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await findVehicle(req);

    if (vehicle.error) {
      const { type, message } = vehicle.error;
      return _error400.error400.call(void 0, res, type, message);
    }

    await vehicle.destroy();

    return res.status(204).json();
  } catch (e) {
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.deleteVehicle = deleteVehicle;
