import { Router } from 'express';

import authMiddleware from '../middlewares/authMiddleware';
import isAdmin from '../middlewares/isAdmin';

import * as UserController from '../controllers/UserController';

const router = new Router();

router.get('/users/all', authMiddleware, isAdmin, UserController.index);

// POST : Create user
router.post('/users', UserController.create);

// GET : Get one user
router.get('/users', authMiddleware, UserController.show);

// PUT : Update one user
router.put('/users', authMiddleware, UserController.update);

// DELETE : Delete one user
router.delete('/users', authMiddleware, UserController.deleteUser);

export default router;
