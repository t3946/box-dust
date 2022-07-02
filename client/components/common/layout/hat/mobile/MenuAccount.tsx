import * as React from "react";
import useSelector from "@hooks/useSelector";
import StyleMenu from "@components/common/layout/hat/mobile/Menu.module.scss";
import Link from "next/link";
import cn from "classnames";
import ChevronDown from "@components/common/icons/chevron-down/ChevronDown";
import Style from "@components/common/layout/hat/mobile/MenuAccount.module.scss";
import { setUser } from "@redux/reducer/User";
import { setState } from "@redux/reducer/Stock";
import { useDispatch } from "react-redux";
import Cookie from "js-cookie";

export interface IProps {
  onClick?: any;
  show: boolean;
  setShowMenu: any;
}

export const Menu: React.FC<IProps> = function (props) {
  const { onClick, show, setShowMenu } = props;
  const accountMenu = useSelector((state) => state.menu.account);
  const accountMenuItemsTemplates = [];
  const dispatch = useDispatch();

  function logout() {
    dispatch(setUser({ user: null }));
    dispatch(setState({ stock: [] }));
    Cookie.remove("auth");
  }

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

  accountMenuItemsTemplates.push(
    <div
      key={`item-logout`}
      onClick={() => {
        setShowMenu(false);
        onClick();
        logout();
      }}
    >
      <span className={cn(StyleMenu.item, StyleMenu.item_micro, "d-block")}>
        <ChevronDown className={cn(StyleMenu.icon, "me-2")} />
        Выйти
      </span>
    </div>
  );

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
