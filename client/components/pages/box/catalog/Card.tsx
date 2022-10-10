import * as React from "react";
import Styles from "@components/pages/box/catalog/Card.module.scss";
import cn from "classnames";
import balanceToString from "@utils/balanceToString";

export interface IProps {
  prize: Record<any, any>;
  onClick: any;
}

export const Card: React.FC<IProps> = function (props) {
  const { prize, onClick } = props;

  return (
    <div className={Styles.card} onClick={onClick}>
      <div className={Styles.prizeWrapper}>
        <img
          src={"/storage/" + prize.image.name}
          alt={prize.name}
          className={cn(
            Styles.prize,
            "d-non1e",
            "user-drag-none",
            "user-select-none"
          )}
        />
      </div>

      <div className={cn(Styles.cardCaption, "px-3")}>
        <span className={cn(Styles.title, "mb-1")} title={prize.short_name}>{prize.short_name}</span>

        <span className={Styles.price}>
          {balanceToString(prize.list_price)}
        </span>
      </div>
    </div>
  );
};

export default Card;
