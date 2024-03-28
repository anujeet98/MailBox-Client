import express from 'express';
import { auth } from '../middleware/authMiddleware';
import { send } from '../controllers/mail';

const router: express.Router = express.Router();

// router.get('/', authController.auth);
router.post('/send', auth, send);
// router.post('/signin', authController.signin);


export default router;
