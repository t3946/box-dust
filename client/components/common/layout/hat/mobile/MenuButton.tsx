import * as React from "react";
import IconBars from "@components/common/icons/bars/Bars";
import Style from "@components/common/layout/hat/mobile/MenuButton.module.scss";
import CrossLarge from "@components/common/icons/cross-large/CrossLarge";
import cn from "classnames";

export const MenuButton: React.FC = function (props) {
  const { show } = props;

  return (
    <span className={cn(Style.button, "cursor-pointer")}>
      {show ? (
        <CrossLarge className={Style.icon} />
      ) : (
        <IconBars className={Style.icon} />
      )}
    </span>
  );
};

export default MenuButton;
