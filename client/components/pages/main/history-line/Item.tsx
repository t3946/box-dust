import * as React from "react";
import Styles from "@components/pages/main/history-line/Item.module.css";
import IconArrowRight from "@components/common/icons/pages/arrow-right/ArrowRight";
import cn from "classnames";

interface IProps {
  item: any;
}

export const Item: React.FC<IProps> = function (props) {
  const { item } = props;

  function getImageUrl(path: string) {
    path = path.replaceAll("\\", "/");

    if (path === "box-default") {
      return "http://box-dust/images/box-default.png";
    }

    return "http://box-dust/storage/" + path;
  }

  return (
    <>
      <div
        className={cn([
          Styles.container,
          "d-flex",
          "flex-column",
          "flex-shrink-0",
        ])}
      >
        <div className="row flex-grow-1 no-gutters">
          <div className="col-5 d-flex align-items-center justify-content-center p-0">
            <img
              className={Styles.image}
              src={getImageUrl(item.box.small_image.name)}
              alt=""
            />
          </div>

          <div className="col-3 d-flex align-items-center justify-content-center p-0">
            <span className={Styles.arrow}>
              <IconArrowRight />
            </span>
          </div>

          <div className="col-4 d-flex align-items-center justify-content-center p-0">
            <img
              className={Styles.image}
              src={getImageUrl(item.item.image)}
              alt=""
            />
          </div>
        </div>

        <div className={Styles.caption}>
          <span className={Styles.winner}>{item.user.name}</span>
        </div>
      </div>
    </>
  );
};

export default Item;
