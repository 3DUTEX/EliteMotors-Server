import { format } from 'date-fns';
import Reservation from '../models/Reservation';
import { errorCatch } from './errors/error400';

export const create = async (req, res) => {
  try {
    const reservationData = {
      userID: req.userId,
      vehicleID: req.params.vehicleID,
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
