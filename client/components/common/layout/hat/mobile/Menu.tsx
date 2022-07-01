import * as React from "react";
import useSelector from "@hooks/useSelector";
import Style from "@components/common/layout/hat/mobile/Menu.module.scss";
import Link from "next/link";
import cn from "classnames";
import ChevronDown from "@components/common/icons/chevron-down/ChevronDown";

export interface IProps {
  onClick?: any;
}

export const Menu: React.FC<IProps> = function (props) {
  const { onClick } = props;
  const navigationMenu = useSelector((state) => state.menu.navigation);
  const navigationMenuItemsTemplates = [];

  for (let i = 0; i < navigationMenu.length; i++) {
    const item = navigationMenu[i];

    navigationMenuItemsTemplates.push(
      <Link href={item.route} key={`item-${i}`}>
        <a
          className={cn(Style.item, { [Style.item_first]: i === 0 }, "d-block")}
          onClick={onClick}
        >
          <ChevronDown className={cn(Style.icon, "me-2")} />
          {item.label}
        </a>
      </Link>
    );
  }

  return <div>{navigationMenuItemsTemplates}</div>;
};

export default Menu;
