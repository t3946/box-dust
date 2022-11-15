import * as React from "react";
import cn from "classnames";
import Style from "@components/pages/account/Sidebar.module.scss";
import { setUser } from "@redux/reducer/User";
import { setState } from "@redux/reducer/Stock";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";

export const LogoutButton: React.FC = function () {
  const dispatch = useDispatch();
  function logout() {
    dispatch(setUser({ user: null }));
    dispatch(setState({ stock: [] }));
    Cookie.remove("auth");
  }

  return (
    <div onClick={logout} className={cn(Style.sidebar_item, "mt-3")}>
      <span className={cn(Style.item, Style.item__logout)}>Выход</span>
    </div>
  );
};

export default LogoutButton;
