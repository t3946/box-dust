import * as React from "react";
import Styles from "@components/pages/box/catalog/Card.module.scss";
import cn from "classnames";
import balanceToString from "@utils/balanceToString";
import Badge from "react-bootstrap/Badge";

export interface IProps {
  prize: Record<any, any>;
  counter?: number;
  onClick: any;
}

export const Card: React.FC<IProps> = function (props) {
  const { prize, onClick, counter } = props;

  return (
    <div className={Styles.card} onClick={onClick}>
      {counter !== undefined && (
        <Badge
          pill
          bg="light"
          text="dark"
          className={cn(Styles.card__counter, Styles.counter)}
        >
          {counter}
        </Badge>
      )}

      <div className={Styles.plate} />

      <div className={Styles.prizeWrapper}>
        <img
          src={'https://storage.yandexcloud.net/boxdust/' + prize.image}
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
        <span className={cn(Styles.title, "mb-1")} title={prize.short_name}>
          {prize.short_name}
        </span>

        <span className={Styles.price}>
          {balanceToString(prize.price)}
        </span>
      </div>
    </div>
  );
};

export default Card;
