import Reservation from '../models/Reservation';
import Vehicle from '../models/Vehicle';
import { error400, errorCatch } from './errors/error400';

function createError(type, message) {
  return {
    error: {
      type,
      message,
    },
  };
}

async function findReservation(req) {
  const reservation = await Reservation.findByPk(req.params.id);
  if (!reservation) return createError('bad request', 'reservation is not finded');
  if (reservation.userID !== req.userId) {
    return createError('Unauthorized', 'this reservation does not belong to the logged in user');
  }
  return reservation;
}

export const create = async (req, res) => {
  try {
    const reservationData = {
      userID: req.userId,
      vehicleID: req.body.vehicleID,
      visitDate: req.body.visitDate || '',
      createdBy: new Date(),
    };

    const reservation = await Reservation.create(reservationData);

    return res.status(201).json(reservation);
  } catch (e) {
    console.log(e);
    return errorCatch(res, e);
  }
};

export const show = async (req, res) => {
  const reservation = await findReservation(req);
  if (reservation.error) {
    const { type, message } = reservation.error;
    if (type === 'Unauthorized') return res.status(401).json(reservation);
    return error400(res, type, message);
  }

  return res.status(200).json(reservation);
};

export const index = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { userID: req.userId },
      include: [
        {
          model: Vehicle,
          as: 'Vehicle',
          attributes: ['name', 'brand', 'model', 'price'],
        },
      ],
    });

    if (!reservations) {
      return error400(res, 'bad request', 'none reservation finded');
    }
    return res.status(200).json(reservations);
  } catch (e) {
    return errorCatch(res, e);
  }
};

export const update = async (req, res) => {
  try {
    const reservation = await findReservation(req);
    if (reservation.error) {
      const { type, message } = reservation.error;
      if (type === 'Unauthorized') return res.status(401).json(reservation);
      return error400(res, type, message);
    }

    const reservationUpdated = await reservation.update(req.body);

    return res.status(200).json(reservationUpdated);
  } catch (e) {
    return errorCatch(res, e);
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const reservation = await findReservation(req);
    if (reservation.error) {
      const { type, message } = reservation.error;
      if (type === 'Unauthorized') return res.status(401).json(reservation);
      return error400(res, type, message);
    }

    await reservation.destroy();

    return res.status(204).json();
  } catch (e) {
    return errorCatch(res, e);
  }
};
