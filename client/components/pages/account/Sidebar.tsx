import * as React from "react";
import Style from "@components/pages/account/Sidebar.module.scss";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

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

  for (let i = 0; i < items.length; i++) {
    const { label, route } = items[i];

    itemTemplates.push(
      <li className={Style.sidebar_item}>
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
    <li className={cn(Style.sidebar_item, "mt-3")}>
      <span className={cn(Style.item, Style.item__logout)}>Выход</span>
    </li>
  );

  return (
    <div>
      <ul className={cn("list-unstyled", "m-0")}>{itemTemplates}</ul>
    </div>
  );
};

export default Sidebar;
