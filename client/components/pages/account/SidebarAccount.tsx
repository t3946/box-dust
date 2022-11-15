import * as React from "react";
import useSelector from "@hooks/useSelector";
import Sidebar from "@components/pages/account/sidebar/Sidebar";
import Style from "@components/pages/account/SidebarAccount.module.scss";

export const SidebarAccount: React.FC = function () {
  const { stock } = useSelector((state) => state.stock);
  const user = useSelector((state) => state.user.user);
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
      label: user.partnership ? "Партнёрство" : "Заработать",
      route: "/account/partnership",
      className: ["mt-3 fw-bold", Style.partnership],
    },
    {
      type: "buttonLogout",
    },
  ];

  return <Sidebar items={items} />;
};

export default SidebarAccount;
