import { Router } from 'express';

import * as AuthController from '../controllers/AuthController';

const router = new Router();

router.post('/auth', AuthController.create);

export default router;
