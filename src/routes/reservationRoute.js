import { Router } from 'express';

import isAdmin from '../middlewares/isAdmin';
import authMiddleware from '../middlewares/authMiddleware';
import * as ReservationController from '../controllers/ReservationController';

const router = new Router();

// POST
router.post('/reservations', authMiddleware, ReservationController.create);

// GET
router.get('/reservations', authMiddleware, ReservationController.index);

// GET
router.get('/reservations/:id', authMiddleware, ReservationController.show);

// PUT
router.put('/reservations/:id', authMiddleware, ReservationController.update);

// DELETE
router.delete('/reservations/:id', authMiddleware, ReservationController.deleteReservation);

export default router;
