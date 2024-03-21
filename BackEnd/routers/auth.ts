import express from 'express';
import authController from '../controllers/auth';

const router: express.Router = express.Router();

router.get('/', authController.auth);
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);


export default router;
