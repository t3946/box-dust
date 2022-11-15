import * as React from "react";
import { ETheme } from "@components/common/badge/Badge";
import useSelector from "@hooks/useSelector";
import Sidebar from "@components/pages/account/sidebar/Sidebar";

export const SidebarAccount: React.FC = function () {
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
    {
      type: "logout",
    },
  ];

  return <Sidebar items={items} />;
};

export default SidebarAccount;
