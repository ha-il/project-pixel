import express from "express";
import { createAccount } from "../controllers/userController.js";

const apiRouter = express.Router();

apiRouter.post("/users/signup", createAccount);

export default apiRouter;
