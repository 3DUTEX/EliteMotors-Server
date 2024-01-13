"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable camelcase */
var _Reservation = require('../models/Reservation'); var _Reservation2 = _interopRequireDefault(_Reservation);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _error400 = require('./errors/error400');

const queryConfig = {
  attributes: ['id', 'name', 'email', 'isGoogleAccount', 'level_access'],
  include: {
    model: _Reservation2.default,
  },
};

// Somente admin
 const index = async (req, res) => {
  try {
    const users = await _User2.default.findAll(queryConfig);

    return res.status(200).json(users);
  } catch (e) {
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.index = index;

 const create = async (req, res) => {
  try {
    if (req.body.email && !req.body.password) return _error400.error400.call(void 0, res, 'Bad request', 'Password is required');

    const {
      id, name, email, isGoogleAccount,
    } = await _User2.default.create(req.body);

    const user = {
      id,
      name,
      email,
      isGoogleAccount,
    };

    return res.status(201).json(user);
  } catch (e) {
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.create = create;

 const show = async (req, res) => {
  try {
    if (!req.userId) return _error400.error400.call(void 0, res, 'Invalid ID', 'ID not receveid');

    const user = await _User2.default.findByPk(req.userId, queryConfig);

    return res.status(200).json(user);
  } catch (e) {
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.show = show;

 const update = async (req, res) => {
  try {
    if (!req.userId) return _error400.error400.call(void 0, res, 'Invalid ID', 'ID not receveid');

    const user = await _User2.default.findByPk(req.userId);

    if (user.isGoogleAccount) {
      return res.status(403).json({
        error: {
          type: 'Forbidden',
          message: 'This user is a google account, not possible update data',
        },
      });
    }

    const {
      id, name, email, level_access,
    } = await user.update(req.body);

    return res.status(200).json({
      id, name, email, level_access,
    });
  } catch (e) {
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.update = update;

 const deleteUser = async (req, res) => {
  try {
    if (!req.userId) return _error400.error400.call(void 0, res, 'Invalid ID', 'ID not receveid');

    const user = await _User2.default.findByPk(req.userId);

    await user.destroy();

    return res.status(204).json();
  } catch (e) {
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.deleteUser = deleteUser;
