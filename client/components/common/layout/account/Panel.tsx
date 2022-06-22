import * as React from "react";
import Style from "@components/common/layout/account/Panel.module.scss";
import { PropsWithChildren } from "react";
import cn from "classnames";

export interface IProps {
  className?: any;
}

export const Panel: React.FC<PropsWithChildren<IProps>> = function (props) {
  const { className } = props;

  return <div className={cn(Style.panel, className)}>{props.children}</div>;
};

export default Panel;
