export function extractYouTubeVideoId(url) {
  const isYoutubeURL = validateYouTubeURL(url);

  if (!isYoutubeURL) return false;

  const startIndex = url.indexOf("v=") + 2;

  const endIndex = url.indexOf("&", startIndex);
  const videoId =
    endIndex === -1 ? url.slice(startIndex) : url.slice(startIndex, endIndex);

  return videoId;
}

function validateYouTubeURL(url) {
  const youtubeURLPattern = /www\.youtube\.com\/watch\?v=/;
  return youtubeURLPattern.test(url);
}
