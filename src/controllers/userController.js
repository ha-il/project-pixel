import User from "../models/User.js";

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
