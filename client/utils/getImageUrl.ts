export function getImageUrl(path: string) {
  if (path === "box-default") {
    return "/images/pages/main/box-default.png";
  }

  return "/images/pages/main/boxes/" + path;
}

export default getImageUrl;
