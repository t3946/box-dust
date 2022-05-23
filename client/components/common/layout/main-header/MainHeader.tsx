import * as React from "react";
import cn from "classnames";
import Styles from "@components/common/layout/main-header/MainHeader.module.scss";

export const MainHeader: React.FC<any> = function (props) {
  return (
    <h1 className={cn("text-center", Styles.header)}>{props?.children}</h1>
  );
};

export default MainHeader;
