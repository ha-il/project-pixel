import express from "express";
import { createAccount, login } from "../controllers/userController.js";

const apiRouter = express.Router();

apiRouter.post("/users/signup", createAccount);
apiRouter.post("/users/login", login);

export default apiRouter;
