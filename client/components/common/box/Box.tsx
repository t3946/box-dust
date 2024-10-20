import * as React from "react";
import Styles from "@components/common/box/Box.module.scss";
import cn from "classnames";
import getImageUrl from "@utils/getImageUrl";
import Link from "next/link";

interface IProps {
  box: Record<any, any>;
  type?: ETheme;
}

export enum ETheme {
  basic = "basic",
  allin = "allin",
  discount = "discount",
  event = "event",
  hot = "hot",
}

export const Box: React.FC<IProps> = function (props) {
  const { box, type = ETheme.basic } = props;
  const cardClass = [Styles.boxCard, Styles[`boxCard__${type}`]];
  const cardPlateClass = [
    Styles.plate,
    Styles.boxCard_plate,
    Styles[`plate__${type}`],
  ];

  return (
    <div className={cn(cardClass)}>
      <div className={cn(Styles.header, Styles.boxCard_header)}>
        <div className={cn(cardPlateClass)} />
      </div>

      <div className={Styles.body}>
        <div
          className={cn(
            Styles.imageWrapper,
            "user-select-none",
            "user-drag-none"
          )}
        >
          <img
            className={cn(Styles.image)}
            src={getImageUrl(box.image)}
            alt="box"
          />
        </div>

        <div className={cn(Styles.boxTitle)}>{box.name}</div>
      </div>

      <div className={cn(Styles.footer, "d-flex", "justify-content-center")}>
        <Link href={`/box/${box.box_id}/open`}>
          <span className={cn(Styles.button, "link-unstyled")}>открыть</span>
        </Link>
      </div>
    </div>
  );
};

export default Box;
