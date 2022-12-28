import { Router } from "express";
import getUserTickets from "../controllers/tickets.controller";
import verifyAuthToken from "../services/verifyAuth";


const ticketsRouter = Router();

ticketsRouter.get("/", getUserTickets);

export default ticketsRouter;