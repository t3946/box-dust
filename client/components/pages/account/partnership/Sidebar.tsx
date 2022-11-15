import * as React from "react";
import Sidebar from "@components/pages/account/sidebar/Sidebar";
import useSelector from "@hooks/useSelector";

export interface IProps {
  referer: string;
}

export const SidebarAccount: React.FC<IProps> = function (props) {
  const { referer } = props;
  const user = useSelector((state) => state.user.user);
  const items: any = [
    {
      type: "buttonBack",
      referer,
    },
  ];

  if (user.partnership_id) {
    items.push(
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
      }
    );
  } else {
    items.push({
      label: "Партнёрство",
      route: "/account/partnership",
      className: "mb-3",
    });
  }

  items.push({
    type: "buttonLogout",
  });

  return <Sidebar items={items} />;
};

export default SidebarAccount;
