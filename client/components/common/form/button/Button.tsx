import * as React from "react";
import { PropsWithChildren } from "react";
import Style from "@components/common/form/button/Button.module.scss";
import { Button as RBButton } from "react-bootstrap";

export type IProps = PropsWithChildren<any>;

export const Button: React.FC<IProps> = function (props) {
  const { children } = props;

  return <RBButton className={Style.button}>{children}</RBButton>;
};

export default Button;
