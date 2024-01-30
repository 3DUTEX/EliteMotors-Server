import { Router } from 'express';

import * as AuthController from '../controllers/AuthController';

const router = new Router();

router.post('/auth', AuthController.create);

router.post('/auth/google', AuthController.createGoogle);

export default router;
