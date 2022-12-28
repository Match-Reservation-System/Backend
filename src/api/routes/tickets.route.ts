import { Router } from "express";
import { getUserTickets, deleteTicket, getMatchTickets } from "../controllers/tickets.controller";
import verifyAuthToken from "../services/verifyAuth";


const ticketsRouter = Router();

ticketsRouter.get("/user/:user_id", getUserTickets);
ticketsRouter.delete("/:ticket_id", deleteTicket);
ticketsRouter.get("/match/:match_id", getMatchTickets);

export default ticketsRouter;