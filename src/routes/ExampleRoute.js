import { Router } from 'express';

const router = new Router();

router.get('/example', (req, res) => res.send('Hello World!'));

export default router;
