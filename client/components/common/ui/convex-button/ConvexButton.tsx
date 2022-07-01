import * as React from "react";
import cn from "classnames";
import Styles from "@components/common/ui/convex-button/ConvexButton.module.scss";
import { PropsWithChildren } from "react";
import { ButtonType } from "@restart/ui/Button";

interface IProps {
  onClick?: any;
  type?: ButtonType;
  className?: any;
}

export const ConvexButton: React.FC<PropsWithChildren<IProps>> = function (
  props
) {
  const { onClick, type = "button", children, className } = props;

  return (
    <button
      className={cn([Styles.convexButton, className])}
      type={type}
      onClick={onClick}
    >
      <span className={Styles.convexButtonContent}>{children}</span>
    </button>
  );
};

export default ConvexButton;
