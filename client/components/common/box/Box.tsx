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
        <div className={cn(Styles.imageWrapper, "user-select-none", "user-drag-none")}>
          <img
            className={cn(Styles.image)}
            src={getImageUrl("box-default")}
            alt="box"
            width={200}
            height={200}
          />
        </div>

        <div className={cn(Styles.header, "mt-10")}>{box.name}</div>

        <div className={cn([Styles.boxCardPrice, ""])}>
          {!!box.old_price && (
            <span className={cn([Styles.oldPrice, "me-1"])}>
              {box.old_price / 100}
            </span>
          )}
          <span className={Styles.price}>{box.price / 100}</span>
        </div>
      </div>

      <div className={Styles.footer}>
        <Link href={`/box/${box.box_id}/open`}>
          <a>
            <button className={Styles.button}>открыть</button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Box;
