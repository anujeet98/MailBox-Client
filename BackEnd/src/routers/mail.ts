import express from 'express';
import { auth } from '../middleware/authMiddleware';
import { send, inbox, updateReadStatus } from '../controllers/mail';

const router: express.Router = express.Router();

// router.get('/', authController.auth);
router.post('/send', auth, send);
router.get('/inbox', auth, inbox);
router.patch('/inbox/:id', auth, updateReadStatus);


export default router;
