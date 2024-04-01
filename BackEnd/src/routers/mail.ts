import express from 'express';
import { auth } from '../middleware/authMiddleware';
import { send, inbox, updateReadStatus, deleteInboxMail, sentbox, deleteSentboxMail } from '../controllers/mail';

const router: express.Router = express.Router();

// router.get('/', authController.auth);
router.post('/send', auth, send);
router.get('/inbox', auth, inbox);
router.patch('/inbox/:id', auth, updateReadStatus);
router.delete('/inbox/:id', auth, deleteInboxMail);
router.get('/sent', auth, sentbox);
router.delete('/sent/:id', auth, deleteSentboxMail);


export default router;
