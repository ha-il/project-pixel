import express from "express";
import {
  createAccount,
  getUserPlaylists,
  login,
  logout,
} from "../controllers/userController.js";
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
apiRouter.get("/users/playlists/:userId", getUserPlaylists);

apiRouter.get("/youtube/musics/:musicId", getMusicInfoFromYoutube);

apiRouter.post("/musics", registerMusic);
apiRouter.get("/musics/chart", getChartMusics);

apiRouter.post("/playlists", createPlaylist);
apiRouter.get("/playlists/:playlistId", getPlaylist);
apiRouter.post("/playlists/:playlistId", addMusicToPlaylist);

export default apiRouter;
