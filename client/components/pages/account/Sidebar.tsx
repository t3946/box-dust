import * as React from "react";
import Style from "@components/pages/account/Sidebar.module.scss";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@redux/reducer/User";

export const Sidebar: React.FC = function () {
  const router = useRouter();
  const items = [
    {
      label: "Профиль",
      route: "/account/profile",
    },
    {
      label: "Склад",
      route: "/account/stock",
    },
    {
      label: "Пополнить счёт",
      route: "/account/payment",
    },
  ];
  const itemTemplates = [];
  const dispatch = useDispatch();

  for (let i = 0; i < items.length; i++) {
    const { label, route } = items[i];

    itemTemplates.push(
      <li className={Style.sidebar_item} key={`sidebar-item-${i}`}>
        <Link href={route}>
          <a
            className={cn(Style.item, {
              [Style.item__active]: router.route === route,
            })}
          >
            {label}
          </a>
        </Link>
      </li>
    );
  }

  itemTemplates.push(
    <li
      onClick={logout}
      className={cn(Style.sidebar_item, "mt-3")}
      key={`sidebar-item-${items.length}`}
    >
      <span className={cn(Style.item, Style.item__logout)}>Выход</span>
    </li>
  );

  function logout() {
    dispatch(setUser({ user: null }));
    Cookie.remove("auth");
  }

  return <ul className={cn("list-unstyled", "m-0")}>{itemTemplates}</ul>;
};

export default Sidebar;
