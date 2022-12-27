import { Router } from 'express';
import loginRouter from './routes/login.route';
import signupRouter from './routes/signup.route';

const router = Router();

router.use('/login', loginRouter);
router.use('/signup', signupRouter);


export default router;