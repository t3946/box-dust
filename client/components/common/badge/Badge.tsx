import * as React from "react";
import RBBadge from "react-bootstrap/Badge";
import Style from "@components/common/badge/Badge.module.scss";
import { PropsWithChildren } from "react";
import cn from "classnames";

export enum ETheme {
  RED = "red",
}

export interface IProps extends PropsWithChildren {
  theme?: ETheme;
}

export const Badge: React.FC<IProps> = function (props) {
  const { theme = "" } = props;

  return (
    <RBBadge
      className={cn(Style.badge, Style[`badge_theme_${theme}`])}
      pill
      bg={""}
    >
      {props.children}
    </RBBadge>
  );
};

export default Badge;
