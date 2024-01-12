import { Router } from 'express';

import authMiddleware from '../middlewares/authMiddleware';
import * as ReservationController from '../controllers/ReservationController';

const router = new Router();

// POST
router.post('/reservations/:vehicleID', authMiddleware, ReservationController.create);

export default router;
