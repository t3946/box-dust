import React from "react";
import cn from "classnames";
import { components } from "react-select";

import Styles from "@components/common/ui/select/MenuList.module.scss";

const MenuList = function (props: any) {
  const RSMenuList = components.MenuList;

  return <RSMenuList {...props} className={cn("p-0", Styles.list)} />;
};

export default MenuList;
