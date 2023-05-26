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

export const getChartMusics = async (req, res) => {
  try {
    const chartMusics = await Music.find({}).sort({ playcount: -1 }).limit(10);
    if (!chartMusics) {
      return res.status(404).send({
        errorMessage:
          "등록된 트랙을 조회할 수 없어서 차트를 표시할 수 없습니다.",
      });
    }
    return res.status(200).send(chartMusics);
  } catch (error) {
    return res.status(400).send("chart.pug", {
      errorMessage: `차트를 불러오는 과정에서 오류가 발생했습니다.`,
    });
  }
};

export const updatePlaycount = async (req, res) => {
  const { musicId } = req.params;
  const music = await Music.findById(musicId);
  if (!music) {
    return res.status(404);
  }
  music.playcount = music.playcount + 1;
  await music.save();
  return res.status(200);
};

export const searchMusic = async (req, res) => {
  const { searchWord } = req.params;
  let musics = [];
  if (searchWord) {
    musics = await Music.find({
      title: {
        $regex: new RegExp(`${searchWord}$`, "i"),
      },
    });
  }
  return res.status(200).send(musics);
};
