export const matchRoute = (thisRouter, path) => {
  const matchingRoute = Object.keys(thisRouter).find((route) => {
    const regex = new RegExp(`^${route.replace(/:\w+/g, "\\w+")}$`);
    return regex.test(path);
  });
  return matchingRoute;
};
