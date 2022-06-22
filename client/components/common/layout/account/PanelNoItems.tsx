import * as React from "react";
import IconEmpty from "@components/common/icons/empty/Empty";
import Panel from "@components/common/layout/account/Panel";
import Style from "@components/common/layout/account/PanelNoItems.module.scss";
import cn from "classnames";
import { PropsWithChildren } from "react";

export interface IProps {
  text: string;
}

export const PanelNoItems: React.FC<PropsWithChildren<IProps>> = function (
  props
) {
  const { text } = props;

  return (
    <Panel className={cn("text-center", Style.content)}>
      <IconEmpty className={Style.icon} />
      <span className={"ms-3"}>{text}</span>
    </Panel>
  );
};

export default PanelNoItems;
