import * as React from "react";
import useSelector from "@hooks/useSelector";
import StyleMenu from "@components/common/layout/hat/mobile/Menu.module.scss";
import Link from "next/link";
import cn from "classnames";
import ChevronDown from "@components/common/icons/chevron-down/ChevronDown";
import Style from "@components/common/layout/hat/mobile/MenuAccount.module.scss";

export interface IProps {
  onClick?: any;
  show: boolean;
}

export const Menu: React.FC<IProps> = function (props) {
  const { onClick, show } = props;
  const accountMenu = useSelector((state) => state.menu.account);
  const accountMenuItemsTemplates = [];

  for (let i = 0; i < accountMenu.length; i++) {
    const item = accountMenu[i];

    accountMenuItemsTemplates.push(
      <Link href={item.route} key={`item-${i}`}>
        <a
          className={cn(
            StyleMenu.item,
            StyleMenu.item_micro,
            { [StyleMenu.item_first]: i === 0 },
            "d-block"
          )}
          onClick={onClick}
        >
          <ChevronDown className={cn(StyleMenu.icon, "me-2")} />
          {item.label}
        </a>
      </Link>
    );
  }

  return (
    <div
      className={cn(Style.menu, [
        show ? Style.menu_visible : Style.menu_hidden,
      ])}
    >
      {accountMenuItemsTemplates}
    </div>
  );
};

export default Menu;
