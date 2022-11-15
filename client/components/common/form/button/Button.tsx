import * as React from "react";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import Style from "@components/common/form/button/Button.module.scss";
import cn from "classnames";

export interface IProps extends PropsWithChildren<any> {
  type?: ButtonHTMLAttributes<any>["type"];
  className?: any;
  disabled?: boolean;
  onClick?: any;
}

export const Button: React.FC<IProps> = function (props) {
  const { children, onClick, type = "button", className, disabled } = props;

  return (
    <button
      type={type}
      className={cn(Style.button, className, {
        [Style.button_disabled]: disabled,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
