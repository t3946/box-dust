import * as React from "react";
import Style from "@components/pages/account/Sidebar.module.scss";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@redux/reducer/User";
import Badge, { ETheme } from "@components/common/badge/Badge";
import useSelector from "@hooks/useSelector";
import { setState } from "@redux/reducer/Stock";

export const Sidebar: React.FC = function () {
  const router = useRouter();
  const { stock } = useSelector((state) => state.stock);
  const items = [
    {
      label: "Профиль",
      route: "/account/profile",
    },
    {
      label: "Склад",
      route: "/account/stock",
      badge: stock.reduce((accumulator, cur) => accumulator + cur.total, 0),
    },
    {
      label: "Баланс",
      route: "/account/payment",
    },
    {
      label: "Партнёрство",
      route: "/account/partnership",
      badge: "!",
      badgeTheme: ETheme.RED,
      className: ["mt-3"],
    },
  ];
  const itemTemplates = [];
  const dispatch = useDispatch();

  for (let i = 0; i < items.length; i++) {
    const { label, route, badge, badgeTheme, className } = items[i];

    itemTemplates.push(
      <li className={cn(Style.sidebar_item)} key={`sidebar-item-${i}`}>
        <Link href={route}>
          <a
            className={cn(
              Style.item,
              {
                [Style.item__active]: router.route === route,
              },
              "position-relative",
              "d-flex",
              "justify-content-between",
              "link-unstyled",
              className
            )}
          >
            <span className={cn("d-flex", "align-items-center")}>
              <span>{label}</span>
            </span>
            {!!badge && <Badge theme={badgeTheme}>{badge}</Badge>}
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
    dispatch(setState({ stock: [] }));
    Cookie.remove("auth");
  }

  return <ul className={cn("list-unstyled", "m-0")}>{itemTemplates}</ul>;
};

export default Sidebar;
