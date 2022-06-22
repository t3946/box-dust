import * as React from "react";
import RBBadge from "react-bootstrap/Badge";
import Style from "@components/common/badge/Badge.module.scss";
import { PropsWithChildren } from "react";

export const Badge: React.FC<PropsWithChildren> = function (props) {
  return (
    <RBBadge className={Style.badge} pill bg={""}>
      {props.children}
    </RBBadge>
  );
};

export default Badge;
