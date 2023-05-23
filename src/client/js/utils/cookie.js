export const getCookie = (key) => {
  if (document.cookie === "") return null;
  const decodedCookie = decodeURIComponent(document.cookie);

  const splitCookie = decodedCookie.split("; ");

  const foundKey = splitCookie.find((item) => item.includes(key));

  if (!foundKey) {
    return null;
  }

  const gettingValue = foundKey.slice(key.length + 1);

  if (gettingValue === "true" || gettingValue === "false") {
    return Boolean(gettingValue);
  }

  if (gettingValue.includes("j:")) {
    return JSON.parse(gettingValue.slice(2));
  }
};
