import Playlist from "../models/Playlist.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const createAccount = async (req, res) => {
  const { username, profileName, password, passwordConfirm } = req.body;
  const isUsernameExists = await User.exists({ username });
  if (isUsernameExists) {
    return res.status(400).send({
      errorMessage: "이미 사용중인 사용자 이름입니다.",
    });
  }
  if (password !== passwordConfirm) {
    return res.status(400).send({
      errorMessage: "비밀번호가 일치하지 않습니다. 다시 시도해주세요.",
    });
  }
  try {
    await User.create({
      username,
      profileName,
      password,
    });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).send({
      errorMessage: `${username}로 가입한 유저가 존재하지 않습니다.`,
    });
  }
  const hashedPassword = user.password;
  const isValidPassword = await bcrypt.compare(password, hashedPassword);
  if (!isValidPassword) {
    return res.status(400).send({
      errorMessage: `비밀번호가 일치하지 않습니다.`,
    });
  }

  const loggedInUser = {
    _id: user._id,
    username: user.username,
    profileName: user.profileName,
  };

  req.session.isLoggedIn = true;
  req.session.loggedInUser = loggedInUser;

  res.cookie("isLoggedIn", true);
  res.cookie("loggedInUser", loggedInUser);

  return res.sendStatus(200);
};

export const logout = (req, res) => {
  req.session.destroy();
  res.clearCookie("isLoggedIn");
  res.clearCookie("loggedInUser");

  return res.sendStatus(200);
};
export const getUserPlaylists = async (req, res) => {
  const { userId } = req.params;

  try {
    const playlists = await Playlist.find({ owner: userId });

    if (!playlists) {
      return res.sendStatus(404);
    }
    const playlistIdList = playlists.map((playlist) => playlist._id);
    return res.status(200).send(playlistIdList);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
