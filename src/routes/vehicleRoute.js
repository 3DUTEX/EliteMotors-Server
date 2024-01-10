import { Router } from 'express';

import authMiddleware from '../middlewares/authMiddleware';
import isAdmin from '../middlewares/isAdmin';
import * as VehicleController from '../controllers/VehicleController';

const router = new Router();

router.get('/vehicles', authMiddleware, isAdmin, VehicleController.index);

router.post('/vehicles', authMiddleware, isAdmin, VehicleController.create);

export default router;
