import * as React from "react";
import Sidebar from "@components/pages/account/sidebar/Sidebar";
import useSelector from "@hooks/useSelector";
import IconGauge from "@components/common/icons/gauge/Solid";
import IconChartLine from "@components/common/icons/chart-line/Solid";
import IconUsers from "@components/common/icons/users/Solid";
import IconDice from "@components/common/icons/dice/Solid";
import IconArrowUpRightDots from "@components/common/icons/arrow-up-right-dots/Solid";
import IconCoins from "@components/common/icons/coins/Solid";
import IconCommentQuestion from "@components/common/icons/comment-question/Solid";
import IconEarn from "@components/common/icons/sack-dollar/Solid";

export interface IProps {
  referer?: string;
}

export const SidebarAccount: React.FC<IProps> = function (props) {
  const { referer } = props;
  const user = useSelector((state) => state.user.user);
  const items: any = [
    {
      type: "buttonBack",
      referer,
      className: "mb-3",
    },
  ];

  if (user.partnership_id) {
    items.push(
      {
        label: "Статистика",
        route: "/account/partnership",
        icon: <IconGauge />,
      },
      {
        label: "Чарты",
        route: "/account/partnership/charts",
        icon: <IconChartLine />,
      },
      {
        label: "Лиды",
        route: "/account/partnership/lids",
        icon: <IconUsers />,
      },
      {
        label: "Спины",
        route: "/account/partnership/spins",
        icon: <IconDice />,
      },
      {
        label: "Статус",
        route: "/account/profile",
        className: "mt-3",
        icon: <IconArrowUpRightDots />,
      },
      {
        label: "Баланс",
        route: "/account/profile",
        icon: <IconCoins />,
      },
      {
        label: "FAQ",
        route: "/account/profile",
        icon: <IconCommentQuestion />,
      }
    );
  } else {
    items.push({
      label: "Партнёрство",
      route: "/account/partnership",
      icon: <IconEarn />,
    });
  }

  items.push({
    type: "buttonLogout",
    className: "mt-3",
  });

  return <Sidebar items={items} />;
};

export default SidebarAccount;
