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
  const accountMenu = useSelector((state) => state.menu.account);
  const accountMenuItemsTemplates = [];
  const { onClick } = props;

  for (let i = 0; i < accountMenu.length; i++) {
    const item = accountMenu[i];

    accountMenuItemsTemplates.push(
      <Link href={item.route} key={`item-${i}`}>
        <a
          className={cn(
            Style.item,
            Style.item_micro,
            { [Style.item_first]: i === 0 },
            "d-block"
          )}
          onClick={onClick}
        >
          <ChevronDown className={cn(Style.icon, "me-2")} />
          {item.label}
        </a>
      </Link>
    );
  }

  return <div>{accountMenuItemsTemplates}</div>;
};

export default Menu;
