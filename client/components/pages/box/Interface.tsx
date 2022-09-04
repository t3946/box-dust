import * as React from "react";
import Styles from "@components/pages/box/Interface.module.scss";
import balanceToString from "@utils/balanceToString";
import cn from "classnames";

export interface IProps {
  className: any;
  startGameHandler: any;
  price: number;
}

export const Interface: React.FC<IProps> = function (props) {
  const { className, startGameHandler, price } = props;

  return (
    <div
      className={cn(
        "d-flex align-items-center justify-content-center flex-column",
        className
      )}
    >
      <span className={Styles.price}>{balanceToString(price * 100)}</span>
      <span className={Styles.buttonWrapper}>
        <button className={Styles.button} onClick={startGameHandler}>
          играть
        </button>
      </span>
    </div>
  );
};

export default Interface;
