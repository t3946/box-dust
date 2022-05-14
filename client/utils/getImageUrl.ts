export function getImageUrl(path: string) {
  path = path.replaceAll("\\", "/");

  if (path === "box-default") {
    return "http://box-dust/images/box-default.png";
  }

  return "http://box-dust/storage/" + path;
}

export default getImageUrl;
