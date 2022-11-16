import * as React from "react";
import cn from "classnames";
import Style from "@components/pages/account/Sidebar.module.scss";
import { setUser } from "@redux/reducer/User";
import { setState } from "@redux/reducer/Stock";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import IconLogout from "@components/common/icons/right-from-bracket/Solid";
import StyleSidebar from "@components/pages/account/Sidebar.module.scss";

export const LogoutButton: React.FC<any> = function (props) {
  const { className } = props;
  const dispatch = useDispatch();
  function logout() {
    dispatch(setUser({ user: null }));
    dispatch(setState({ stock: [] }));
    Cookie.remove("auth");
  }

  return (
    <div onClick={logout} className={cn(Style.sidebar_item, className)}>
      <span className={cn(Style.item, Style.item__logout)}>
        <span className={StyleSidebar.icon}>
          <IconLogout />
        </span>

        <span>Выход</span>
      </span>
    </div>
  );
};

export default LogoutButton;
