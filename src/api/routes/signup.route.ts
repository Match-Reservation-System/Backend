import { Router } from "express";
import signup from "../controllers/signup.controller";

const signupRouter = Router();

signupRouter.post("/", signup);

export default signupRouter;