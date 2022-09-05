import * as React from "react";
import Styles from "@components/pages/box/Interface.module.scss";
import balanceToString from "@utils/balanceToString";
import cn from "classnames";
import useSelector from "@hooks/useSelector";

export interface IProps {
  className: any;
  startGameHandler: any;
  price: number;
}

export const Interface: React.FC<IProps> = function (props) {
  const { className, startGameHandler, price } = props;
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return null;
  }

  const insufficientMoney = user.balance < price * 100;

  return (
    <div
      className={cn(
        "d-flex align-items-center justify-content-center flex-column",
        className
      )}
    >
      <img
        src="/images/pages/roulette/arrow.png"
        alt=""
        width={90}
        className={cn("mb-3", "user-drag-none", "user-select-none")}
      />

      <span className={Styles.price}>{balanceToString(price * 100)}</span>

      <span
        className={cn(Styles.buttonWrapper, {
          [Styles.buttonWrapper_disabled]: insufficientMoney,
        })}
      >
        <button
          className={cn(Styles.button)}
          onClick={startGameHandler}
          disabled={insufficientMoney}
        >
          играть
        </button>
      </span>

      <span
        className={cn(
          Styles.price,
          Styles.balance,
          { [Styles.balance_insufficientMoney]: insufficientMoney },
          "mt-1",
          "d-flex"
        )}
      >
        <span className={cn("me-1", Styles.balanceCaption)}>баланс:</span>
        <span className={cn(Styles.balanceNumber)}>
          {balanceToString(user.balance)}
        </span>
      </span>
    </div>
  );
};

export default Interface;
