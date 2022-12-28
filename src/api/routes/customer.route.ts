import { Router } from "express";
import { getUserTickets, deleteTicket, getMatchTickets, reserveTicket } from "../controllers/customer.controller";



const customerRouter = Router();

customerRouter.get('/user/:user_id', getUserTickets);
customerRouter.delete('/:ticket_id', deleteTicket);
customerRouter.get('/match/:match_id', getMatchTickets);
customerRouter.post('/reserve', reserveTicket);

export default customerRouter;