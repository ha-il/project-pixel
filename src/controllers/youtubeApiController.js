export const getMusicInfoFromYoutube = async (req, res) => {
  const { music_id } = req.params;

  const BASE_URL = "https://www.googleapis.com/youtube/v3/videos";
  const part = `part=${["id", "snippet", "contentDetails"].join()}&`;
  const query = {
    id: music_id,
    key: process.env.YOUTUBE_DATA_API_KEY,
  };
  const params = new URLSearchParams(query).toString();

  const url = `${BASE_URL}?${part}${params}`;

  const response = await fetch(url);

  if (response.status === 404) {
    return res.status(404).send({
      errorMessage: `입력해주신 URL로 동영상을 찾을 수 없었습니다.`,
    });
  }

  const data = await response.json();
  const {
    id,
    snippet: {
      title,
      thumbnails: { default: image },
      channelTitle,
    },
    contentDetails: { duration },
  } = data.items[0];

  const musicData = {
    id,
    title,
    image,
    channelTitle,
    duration,
  };

  return res.status(200).send({ musicData });
};
