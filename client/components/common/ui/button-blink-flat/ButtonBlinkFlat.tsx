import * as React from "react";
import cn from "classnames";
import Style from "@components/common/ui/button-blink-flat/ButtonBlinkFlat.module.scss";

export enum ETheme {
  primary = "primary",
  success = "success",
  danger = "danger",
}

export interface IProps {
  type?: "button" | "submit";
  theme?: ETheme;
  className?: any;
  onClick: any;
}

export const ButtonBlinkFlat: React.FC<React.PropsWithChildren<IProps>> =
  function (props) {
    const {
      type = "button",
      theme = ETheme.primary,
      className,
      onClick,
    } = props;

    return (
      <button
        type={type}
        className={cn([
          Style.button,
          Style[`button_theme_${theme}`],
          className,
        ])}
        onClick={onClick}
      >
        {props.children}
      </button>
    );
  };

export default ButtonBlinkFlat;
