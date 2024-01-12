import { Router } from 'express';
import multer from 'multer';

import * as imageController from '../controllers/imageController';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = new Router();

// POST : Create image/URL
router.post('/vehicles/images/:vehicleID', upload.single('image'), imageController.create);

// PUT : Update image/URL
router.put('/vehicles/images/:storageID', upload.single('image'), imageController.update);

// DELETE : Delete image/URL
router.delete('/vehicles/images/:storageID', imageController.deleteImage);

export default router;
