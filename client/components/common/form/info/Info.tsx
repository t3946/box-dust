import * as React from "react";
import Styles from "@components/common/form/info/Info.module.scss";
import cn from "classnames";
import { PropsWithChildren } from "react";

export interface IProps extends PropsWithChildren<any> {
  className?: any;
}

export const Info: React.FC<IProps> = function (props) {
  const { className } = props;

  return <div className={cn(Styles.info, className)}>{props.children}</div>;
};

export default Info;
