import express from "express";
import { createAccount, login, logout } from "../controllers/userController.js";
import { getMusicInfoFromYoutube } from "../controllers/youtubeApiController.js";
import {
  getChartMusics,
  registerMusic,
} from "../controllers/musicController.js";
import {
  addMusicToPlaylist,
  createPlaylist,
  getPlaylist,
} from "../controllers/playlistController.js";

const apiRouter = express.Router();

apiRouter.post("/users/signup", createAccount);
apiRouter.post("/users/login", login);
apiRouter.post("/users/logout", logout);

apiRouter.get("/youtube/musics/:music_id", getMusicInfoFromYoutube);

apiRouter.post("/musics", registerMusic);
apiRouter.get("/musics/chart", getChartMusics);

apiRouter.post("/playlists", createPlaylist);
apiRouter.get("/playlists/:playlistId", getPlaylist);
apiRouter.post("/playlists/:playlistId", addMusicToPlaylist);

export default apiRouter;
