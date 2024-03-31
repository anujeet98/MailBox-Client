import express from 'express';
import { auth } from '../middleware/authMiddleware';
import { send, inbox } from '../controllers/mail';

const router: express.Router = express.Router();

// router.get('/', authController.auth);
router.post('/send', auth, send);
router.get('/inbox', auth, inbox);
// router.post('/signin', authController.signin);


export default router;
