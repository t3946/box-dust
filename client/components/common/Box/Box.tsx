import * as React from "react";
import Styles from "@components/common/Box/Box.module.scss";
import cn from "classnames";
import getImageUrl from "@utils/getImageUrl";

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
        <div className={Styles.imageWrapper}>
          <img
            className={Styles.image}
            src={getImageUrl("box-default")}
            alt="box"
          />
        </div>
        <div className={Styles.header}>{box.name}</div>
        <div className={Styles.boxCardPrice}>
          {!!box.old_price && (
            <span className={cn([Styles.oldPrice, "me-1"])}>
              {box.old_price}
            </span>
          )}
          <span className={Styles.price}>{box.price}</span>
        </div>
      </div>

      <div className={Styles.footer}>
        <a href="/roulette">
          <button className={Styles.button}>открыть</button>
        </a>
      </div>
    </div>
  );
};

export default Box;
