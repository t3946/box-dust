import * as React from "react";
import Styles from "@components/pages/box/Interface.module.scss";
import balanceToString from "@utils/balanceToString";
import cn from "classnames";
import useSelector from "@hooks/useSelector";
import AnimatedNumber from "animated-number-react";
import { modalOpen } from "@redux/reducer/Popup";
import { useDispatch } from "react-redux";
import { play } from "@redux/actions/User";

export interface IProps {
  className: any;
  startGameHandler: any;
  box: Record<any, any>;
  gameIsActive: boolean;
}

export const Interface: React.FC<IProps> = function (props) {
  const { className, startGameHandler, box, gameIsActive } = props;
  const user = useSelector((state) => state.user.user);
  const insufficientMoney = !user || user.balance < box.price;
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

  function playGameHandler() {
    dispatch(
      play({
        data: { boxId: box.box_id },

        callback(res) {
          startGameHandler(res.data.prize.item_id);
        },
      })
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

    const isDisabled = gameIsActive || insufficientMoney;

    return (
      <span
        className={cn(Styles.buttonWrapper, {
          [Styles.buttonWrapper_disabled]: isDisabled,
        })}
      >
        <button
          className={cn(Styles.button)}
          onClick={playGameHandler}
          disabled={isDisabled}
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
      <div className={cn("mb-3", Styles.arrow)} />

      <span className={Styles.price}>{balanceToString(box.price)}</span>

      {buttonTemplate()}

      {balanceTemplate()}
    </div>
  );
};

export default Interface;
