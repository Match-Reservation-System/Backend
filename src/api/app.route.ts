import { Router } from 'express';
import loginRouter from './routes/login.route';
import signupRouter from './routes/signup.route';
import ticketsRouter from './routes/tickets.route';

const router = Router();

router.use('/login', loginRouter);
router.use('/signup', signupRouter);

router.use('/tickets', ticketsRouter)

export default router;