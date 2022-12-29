import { Router } from 'express';
import { getAllUsers } from '../controllers/admin.controller';
import { getUnverifiedMangers } from '../controllers/admin.controller';
import { verifyManager } from '../controllers/admin.controller';
import { deleteUser } from '../controllers/admin.controller';
import verifyAuthToken from '../services/verifyAuth';
import verifyRole from '../services/verifyRole';
import { admin } from '../../roles/roles';

const adminRouter = Router();

adminRouter.get(
  '/unverified',
  verifyAuthToken,
  verifyRole(admin),
  getUnverifiedMangers
);
adminRouter.get('/all', verifyAuthToken, verifyRole(admin), getAllUsers);
adminRouter.put(
  '/verify/:manager_id',
  verifyAuthToken,
  verifyRole(admin),
  verifyManager
);
adminRouter.delete(
  '/delete/:user_id',
  verifyAuthToken,
  verifyRole(admin),
  deleteUser
);

export default adminRouter;
