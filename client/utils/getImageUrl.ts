export function getImageUrl(path: string) {
  if (path === "box-default") {
    return "/images/pages/main/box-default.png";
  }

  //todo: мне надо настроить отладку сафари


  
  //todo: need to fix static url
  return "/storage/" + path;
}

export default getImageUrl;
