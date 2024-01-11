import { Router } from 'express';

import authMiddleware from '../middlewares/authMiddleware';
import isAdmin from '../middlewares/isAdmin';
import * as VehicleController from '../controllers/VehicleController';

const router = new Router();

router.get('/vehicles', VehicleController.index);

router.get('/vehicles/:id', VehicleController.show);

router.post('/vehicles', authMiddleware, isAdmin, VehicleController.create);

router.put('/vehicles/:id', authMiddleware, isAdmin, VehicleController.update);

export default router;
