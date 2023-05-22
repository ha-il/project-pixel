import Music from "../models/Music.js";
import Playlist from "../models/Playlist.js";

export const createPlaylist = async (req, res) => {
  const { _id } = req.session.loggedInUser;
  const { name, description } = req.body;
  try {
    const playlist = await Playlist.create({
      name,
      owner: _id,
      description,
    });
    return res.status(200).send({ playlistId: playlist._id });
  } catch (error) {
    return res.status(400).send({
      errorMessage: `플레이리스트를 생성하는 과정에서 오류가 발생했습니다.`,
    });
  }
};

export const getPlaylist = async (req, res) => {
  const { playlistId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId)
      .populate("owner")
      .populate("musics");

    if (!playlist) {
      return res
        .status(404)
        .send({ errorMessage: "플레이리스트를 찾을 수 없었습니다." });
    }

    return res.status(200).send(playlist);
  } catch (error) {
    return res.status(400).send({
      errorMessage: "플레이리스트를 조회하는 과정에서 에러가 발생했습니다.",
    });
  }
};

export const addMusicToPlaylist = async (req, res) => {
  const {
    params: { playlistId },
    body: { musicId },
  } = req;
  try {
    const music = await Music.findById(musicId);
    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      {
        $push: { musics: music },
      },
      { new: true }
    )
      .populate("owner")
      .populate("musics");

    return res.status(200).send(playlist);
  } catch (error) {
    return res
      .status(400)
      .send({ errorMessage: "곡을 추가하는 과정에서 에러가 발생했습니다." });
  }
};
