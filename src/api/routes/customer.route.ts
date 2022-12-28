import { Router } from "express";
import { getUserTickets, deleteTicket, getReservedSeats, reserveTicket } from "../controllers/customer.controller";
import verifyAuthToken from "../services/verifyAuth";
import verifyRole from "../services/verifyRole";
import { fan } from "../../roles/roles";

const customerRouter = Router();

customerRouter.get('/fan/:user_id', verifyAuthToken, verifyRole(fan), getUserTickets);
customerRouter.delete('/fan/:ticket_id', verifyAuthToken, verifyRole(fan), deleteTicket);
customerRouter.get('/match/:match_id', getReservedSeats);
customerRouter.post('/fan/reserve', verifyAuthToken, verifyRole(fan), reserveTicket);

export default customerRouter;