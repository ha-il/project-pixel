import express from "express";
import { createAccount, login, logout } from "../controllers/userController.js";

const apiRouter = express.Router();

apiRouter.post("/users/signup", createAccount);
apiRouter.post("/users/login", login);
apiRouter.post("/users/logout", logout);

export default apiRouter;
