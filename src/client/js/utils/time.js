export function convertTimeToMilliseconds(time) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const match = time.match(regex);

  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const seconds = match[3] ? parseInt(match[3], 10) : 0;

  const milliseconds = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;

  return milliseconds;
}

export function convertMillisecondsToTime(milliseconds) {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  if (formattedHours === "00") {
    const timeString = `${formattedMinutes}:${formattedSeconds}`;
    return timeString;
  }

  const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return timeString;
}

export function getCurrentDate() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const days = ["일", "월", "화", "수", "목", "금", "토", "일"];
  const today = date.getDate();

  return `${month}월 ${today}일 ${days[day]}요일`;
}

export function getCurrentTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}
