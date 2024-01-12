import { Router } from 'express';
import multer from 'multer';

import * as imageController from '../controllers/imageController';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = new Router();

// POST : Create image/URL
router.post('/vehicles/images', upload.single('image'), imageController.create);

export default router;
