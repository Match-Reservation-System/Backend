import { Router } from "express";
import { createMatch } from "../controllers/manager.controller";
import verifyAuthToken from "../services/verifyAuth";
import verifyRole from "../services/verifyRole";
import { manager } from "../../roles/roles";

const managerRouter = Router();

managerRouter.post('/match', verifyAuthToken, verifyRole(manager), createMatch);

export default managerRouter;