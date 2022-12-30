import { Router } from "express";
import { getMatches, getMatch } from "../controllers/guest.controller";

const guestRouter = Router();

guestRouter.get("/matches", getMatches);
guestRouter.get("/matches/:id", getMatch);

export default guestRouter;