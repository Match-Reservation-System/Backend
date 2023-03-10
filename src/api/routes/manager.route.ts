import { Router } from 'express';
import {
  createMatch,
  updateMatch,
  createStadium,
  getStadiums,
} from '../controllers/manager.controller';
import { getReservedSeats } from '../controllers/customer.controller';
import verifyAuthToken from '../services/verifyAuth';
import verifyRole from '../services/verifyRole';
import { manager } from '../../roles/roles';

const managerRouter = Router();

managerRouter.post('/match', verifyAuthToken, verifyRole(manager), createMatch);
managerRouter.put('/match', verifyAuthToken, verifyRole(manager), updateMatch);
managerRouter.post(
  '/stadium',
  verifyAuthToken,
  verifyRole(manager),
  createStadium
);
managerRouter.get(
  '/stadiums',
  verifyAuthToken,
  verifyRole(manager),
  getStadiums
);
managerRouter.get(
  '/match/:match_id',
  verifyAuthToken,
  verifyRole(manager),
  getReservedSeats
);

export default managerRouter;
