import { Router } from "express";
import { createMatch, updateMatch } from "../controllers/manager.controller";
import verifyAuthToken from "../services/verifyAuth";
import verifyRole from "../services/verifyRole";
import { manager } from "../../roles/roles";

const managerRouter = Router();

managerRouter.post('/match', verifyAuthToken, verifyRole(manager), createMatch);
managerRouter.put('/match', verifyAuthToken, verifyRole(manager), updateMatch);

export default managerRouter;