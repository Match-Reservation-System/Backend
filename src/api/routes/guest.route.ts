import { Router } from "express";
import { getMatches } from "../controllers/guest.controller";

const guestRouter = Router();

guestRouter.get("/matches", getMatches);

export default guestRouter;