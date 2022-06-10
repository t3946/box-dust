import * as React from "react";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import Style from "@components/common/form/button/Button.module.scss";
import { Button as RBButton } from "react-bootstrap";

export interface IProps extends PropsWithChildren<any> {
  type?: ButtonHTMLAttributes<any>["type"];
}

export const Button: React.FC<IProps> = function (props) {
  const { children, type = "button" } = props;

  return (
    <RBButton type={type} className={Style.button}>
      {children}
    </RBButton>
  );
};

export default Button;
