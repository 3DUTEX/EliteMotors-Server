import { Router } from 'express';

import authMiddleware from '../middlewares/authMiddleware';
import * as UserController from '../controllers/UserController';

const router = new Router();

// POST : Create user
router.post('/users', UserController.create);

// GET : Get one user
router.get('/users/myUser', authMiddleware, UserController.show);

// PUT : Update one user
router.put('/users', authMiddleware, UserController.update);

export default router;
