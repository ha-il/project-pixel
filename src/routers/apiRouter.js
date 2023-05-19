import express from "express";
import { createAccount, login, logout } from "../controllers/userController.js";
import { getMusicInfoFromYoutube } from "../controllers/youtubeApiController.js";
import { registerMusic } from "../controllers/musicController.js";

const apiRouter = express.Router();

apiRouter.post("/users/signup", createAccount);
apiRouter.post("/users/login", login);
apiRouter.post("/users/logout", logout);

apiRouter.get("/youtube/musics/:music_id", getMusicInfoFromYoutube);
apiRouter.post("/musics/music", registerMusic);

export default apiRouter;
