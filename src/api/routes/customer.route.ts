import { Router } from "express";
import { getUserTickets, deleteTicket, getMatchTickets, reserveTicket } from "../controllers/customer.controller";

//TODO: add authentication and authorization middlewares

const customerRouter = Router();

customerRouter.get('/fan/:user_id', getUserTickets);
customerRouter.delete('/fan/:ticket_id', deleteTicket);
customerRouter.get('/match/:match_id', getMatchTickets); //this is unauthorized
customerRouter.post('/fan/reserve', reserveTicket);

export default customerRouter;