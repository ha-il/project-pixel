import Music from "../models/Music.js";

export const registerMusic = async (req, res) => {
  const { youtubeId, title, artist, imageUrl, duration } = req.body;
  const isMusicExists = await Music.exists({ youtubeId });
  if (isMusicExists) {
    return res.status(400).send({
      errorMessage: `해당 영상(${youtubeId})으로 등록된 음악이 이미 존재합니다.`,
    });
  }
  try {
    await Music.create({
      youtubeId,
      title,
      artist,
      imageUrl,
      duration,
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      errorMessage:
        "곡 등록 과정에서 오류가 발생했습니다. 관리자에게 문의해주십시오.",
    });
  }
};
