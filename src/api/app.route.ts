import { Router } from 'express';
import loginRouter from './routes/login.route';
import signupRouter from './routes/signup.route';
import customerRouter from './routes/customer.route';
import adminRouter from './routes/admin.route';
import managerRouter from './routes/manager.route';
import guestRouter from './routes/guest.route';

const router = Router();

router.use('/login', loginRouter);
router.use('/signup', signupRouter);

router.use('/customer', customerRouter);
router.use('/admin', adminRouter);

router.use('/manager', managerRouter);
router.use('/guest', guestRouter);

export default router;
