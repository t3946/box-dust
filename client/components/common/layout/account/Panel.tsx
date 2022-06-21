import * as React from "react";
import Style from "@components/common/layout/account/Panel.module.scss";
import { PropsWithChildren } from "react";

export const Panel: React.FC<PropsWithChildren<any>> = function (props) {
  return <div className={Style.panel}>{props.children}</div>;
};

export default Panel;
