import { Router } from "express";
import { getUserTickets, deleteTicket } from "../controllers/tickets.controller";
import verifyAuthToken from "../services/verifyAuth";


const ticketsRouter = Router();

ticketsRouter.get("/user/:user_id", getUserTickets);
ticketsRouter.delete("/:ticket_id", deleteTicket)

export default ticketsRouter;