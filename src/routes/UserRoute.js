import { Router } from 'express';

import * as UserController from '../controllers/UserController';

const router = new Router();

// POST : Create User
router.post('/users', UserController.create);

export default router;
