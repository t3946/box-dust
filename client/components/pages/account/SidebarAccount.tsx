import * as React from "react";
import useSelector from "@hooks/useSelector";
import Sidebar from "@components/pages/account/sidebar/Sidebar";
import Style from "@components/pages/account/SidebarAccount.module.scss";
import IconBox from "@components/common/icons/box/Solid";
import IconCoins from "@components/common/icons/coins/Solid";
import IconUser from "@components/common/icons/user/Solid";
import IconEarn from "@components/common/icons/sack-dollar/Solid";

export const SidebarAccount: React.FC = function () {
  const { stock } = useSelector((state) => state.stock);
  const user = useSelector((state) => state.user.user);
  const items = [
    {
      label: "Профиль",
      route: "/account/profile",
      icon: <IconUser />,
    },
    {
      label: "Склад",
      route: "/account/stock",
      badge: stock.reduce((accumulator, cur) => accumulator + cur.total, 0),
      icon: <IconBox />,
    },
    {
      label: "Баланс",
      route: "/account/payment",
      icon: <IconCoins />,
    },
    {
      label: user.partnership ? "Партнёрство" : "Заработать",
      route: "/account/partnership",
      className: ["mt-3 fw-bold", Style.partnership],
      icon: <IconEarn />,
    },
    {
      type: "buttonLogout",
      className: "mt-3",
    },
  ];

  return <Sidebar items={items} />;
};

export default SidebarAccount;
