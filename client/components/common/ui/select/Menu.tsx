import React from "react";
import cn from "classnames";
import { components } from "react-select";

import Styles from "@components/common/ui/select/Menu.module.scss";

const Menu = function (props: any) {
  const RSMenu = components.Menu;

  return (
    <RSMenu
      {...props}
      className={cn(Styles.menu, props.selectProps.classes?.menu)}
    />
  );
};

export default Menu;
