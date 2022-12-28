import { Router } from 'express';
import loginRouter from './routes/login.route';
import signupRouter from './routes/signup.route';
import ticketsRouter from './routes/tickets.route';
import adminRouter from './routes/admin.route';

const router = Router();

router.use('/login', loginRouter);
router.use('/signup', signupRouter);

router.use('/tickets', ticketsRouter)
router.use('/admin', adminRouter);

export default router;