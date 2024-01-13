"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Reservation = require('../models/Reservation'); var _Reservation2 = _interopRequireDefault(_Reservation);
var _error400 = require('./errors/error400');

function createError(type, message) {
  return {
    error: {
      type,
      message,
    },
  };
}

async function findReservation(req) {
  const reservation = await _Reservation2.default.findByPk(req.params.id);
  if (!reservation) return createError('bad request', 'reservation is not finded');
  if (reservation.userID !== req.userId) {
    return createError('Unauthorized', 'this reservation does not belong to the logged in user');
  }
  return reservation;
}

 const create = async (req, res) => {
  try {
    const reservationData = {
      userID: req.userId,
      vehicleID: req.body.vehicleID,
      visitDate: req.body.visitDate || '',
      createdBy: new Date(),
    };

    const reservation = await _Reservation2.default.create(reservationData);

    return res.status(201).json(reservation);
  } catch (e) {
    console.log(e);
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.create = create;

 const show = async (req, res) => {
  const reservation = await findReservation(req);
  if (reservation.error) {
    const { type, message } = reservation.error;
    if (type === 'Unauthorized') return res.status(401).json(reservation);
    return _error400.error400.call(void 0, res, type, message);
  }

  return res.status(200).json(reservation);
}; exports.show = show;

 const index = async (req, res) => {
  try {
    const reservations = await _Reservation2.default.findAll({ where: { userID: req.userId } });
    if (!reservations) {
      return _error400.error400.call(void 0, res, 'bad request', 'none reservation finded');
    }
    return res.status(200).json(reservations);
  } catch (e) {
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.index = index;

 const update = async (req, res) => {
  try {
    const reservation = await findReservation(req);
    if (reservation.error) {
      const { type, message } = reservation.error;
      if (type === 'Unauthorized') return res.status(401).json(reservation);
      return _error400.error400.call(void 0, res, type, message);
    }

    const reservationUpdated = await reservation.update(req.body);

    return res.status(200).json(reservationUpdated);
  } catch (e) {
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.update = update;

 const deleteReservation = async (req, res) => {
  try {
    const reservation = await findReservation(req);
    if (reservation.error) {
      const { type, message } = reservation.error;
      if (type === 'Unauthorized') return res.status(401).json(reservation);
      return _error400.error400.call(void 0, res, type, message);
    }

    await reservation.destroy();

    return res.status(204).json();
  } catch (e) {
    return _error400.errorCatch.call(void 0, res, e);
  }
}; exports.deleteReservation = deleteReservation;
