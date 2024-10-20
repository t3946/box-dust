import * as React from "react";
import Styles from "@components/pages/main/history-line/Item.module.scss";
import IconArrowRight from "@components/common/icons/pages/arrow-right/ArrowRight";
import cn from "classnames";
import getImageUrl from "@utils/getImageUrl";
import Link from "next/link";

interface IProps {
  item: any;
}

export const Item: React.FC<IProps> = function (props) {
  const { item } = props;

  return (
    <>
      <Link href={`/box/${item.box.box_id}/open`}>
        <span className={"link-unstyled"}>
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
                  alt={item.box.name}
                  title={item.box.name}
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
                  // src={getImageUrl(item.item.image.name)}
                  alt={item.item.name}
                  title={item.item.name}
                />
              </div>
            </div>

            <div className={Styles.winner}>{item.user.name}</div>
          </div>
        </span>
      </Link>
    </>
  );
};

export default Item;
