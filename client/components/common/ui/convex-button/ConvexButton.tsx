import * as React from "react";
import cn from "classnames";
import Styles from "@components/common/ui/convex-button/ConvexButton.module.scss";

interface IProps {
  onClick?: any;
  type?: "button" | "submit" | "reset";
  children: any;
  classes?: any;
}

export const ConvexButton: React.FC<IProps> = function (props) {
  const { onClick, type = "button", children, classes } = props;

  return (
    <button
      className={cn([Styles.convexButton, classes])}
      type={type}
      onClick={onClick}
    >
      <span className={Styles.convexButtonContent}>{children}</span>
    </button>
  );
};

export default ConvexButton;
