import * as React from "react";
import Sidebar from "@components/pages/account/sidebar/Sidebar";

export const SidebarAccount: React.FC = function () {
  const items = [
    {
      type: "back",
    },
    {
      label: "Статистика",
      route: "/account/profile",
    },
    {
      label: "Чарты",
      route: "/account/profile",
    },
    {
      label: "Лиды",
      route: "/account/profile",
    },
    {
      label: "Спины",
      route: "/account/profile",
    },
    {
      label: "Статус",
      route: "/account/profile",
      className: "mt-3",
    },
    {
      label: "Баланс",
      route: "/account/profile",
    },
    {
      label: "FAQ",
      route: "/account/profile",
    },
    {
      type: "logout",
    },
  ];

  return <Sidebar items={items} />;
};

export default SidebarAccount;
