import * as React from "react";
import Styles from "@components/pages/box/Interface.module.scss";
import balanceToString from "@utils/balanceToString";
import cn from "classnames";
import useSelector from "@hooks/useSelector";
import AnimatedNumber from "animated-number-react";
import { modalOpen } from "@redux/reducer/Popup";
import { useDispatch } from "react-redux";

export interface IProps {
  className: any;
  startGameHandler: any;
  price: number;
}

export const Interface: React.FC<IProps> = function (props) {
  const { className, startGameHandler, price } = props;
  const user = useSelector((state) => state.user.user);
  const insufficientMoney = !user || user.balance < price;
  const dispatch = useDispatch();

  function openModalLogin() {
    dispatch(
      modalOpen({
        modal: "login",
      })
    );
  }

  function balanceTemplate() {
    if (!user) {
      return <span>Авторизуйтесь, чтобы начать игру.</span>;
    }

    return (
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
          <AnimatedNumber
            value={user.balance}
            formatValue={balanceToString}
            duration={0}
          />
        </span>
      </span>
    );
  }

  function buttonTemplate() {
    if (!user) {
      return (
        <span className={cn(Styles.buttonWrapper)}>
          <button className={cn(Styles.button)} onClick={openModalLogin}>
            войти
          </button>
        </span>
      );
    }

    return (
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
    );
  }

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

      <span className={Styles.price}>{balanceToString(price)}</span>

      {buttonTemplate()}

      {balanceTemplate()}
    </div>
  );
};

export default Interface;
