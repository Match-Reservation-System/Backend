import { Router } from 'express';
import {
  getUserTickets,
  deleteTicket,
  getReservedSeats,
  reserveTicket,
  getCustomerInfo,
  updateCustomerInfo,
} from '../controllers/customer.controller';
import verifyAuthToken from '../services/verifyAuth';
import verifyRole from '../services/verifyRole';
import { fan } from '../../roles/roles';

const customerRouter = Router();

customerRouter.get(
  '/fan/:user_id',
  verifyAuthToken,
  verifyRole(fan),
  getCustomerInfo
);
customerRouter.put(
  '/fan/:user_id',
  verifyAuthToken,
  verifyRole(fan),
  updateCustomerInfo
);
customerRouter.get(
  '/fan/tickets/:user_id',
  verifyAuthToken,
  verifyRole(fan),
  getUserTickets
);
customerRouter.delete(
  '/fan/tickets/:ticket_id',
  verifyAuthToken,
  verifyRole(fan),
  deleteTicket
);
customerRouter.get('/match/:match_id', getReservedSeats);
customerRouter.post(
  '/fan/tickets/reserve',
  verifyAuthToken,
  verifyRole(fan),
  reserveTicket
);

export default customerRouter;
