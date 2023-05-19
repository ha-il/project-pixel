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
