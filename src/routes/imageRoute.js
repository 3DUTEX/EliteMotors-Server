import { Router } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = new Router();

// GET : Teste
router.get('/', upload.single('image'),);

export default router;
