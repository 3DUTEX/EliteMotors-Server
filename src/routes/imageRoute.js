import { Router } from 'express';
import multer from 'multer';

import authMiddleware from '../middlewares/authMiddleware';
import isAdmin from '../middlewares/isAdmin';
import * as imageController from '../controllers/imageController';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = new Router();

// POST : Create image/URL
router.post('/vehicles/images/:vehicleID', authMiddleware, isAdmin, upload.single('image'), imageController.create);

// PUT : Update image/URL
router.put('/vehicles/images/:storageID', authMiddleware, isAdmin, upload.single('image'), imageController.update);

// DELETE : Delete image/URL
router.delete('/vehicles/images/:storageID', authMiddleware, isAdmin, imageController.deleteImage);

export default router;
