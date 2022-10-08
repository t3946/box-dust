import * as React from "react";
import useSelector from "@hooks/useSelector";
import Style from "@components/pages/account/partnership/Stats.module.scss";
import SecondaryContainer from "@components/common/layout/account/SecondaryContainer";
import cn from "classnames";

export const Stats: React.FC = function () {
  const user = useSelector((state) => state.user.user);
  const shortStats = [
    {
      name: "статус",
      value: user.partnership.name,
    },
    {
      name: "прибыль по статусу",
      value: user.partnership.revenue_percent + "%",
    },
    {
      name: "клиентов(всего)",
      value: 17,
    },
    {
      name: "клиентов(активных)",
      value: 8,
    },
    {
      name: "спинов",
      value: 228,
    },
  ];
  const items = [];

  for (const i in shortStats) {
    const stat = shortStats[i];

    items.push(
      <div className={cn("d-flex", Style.statRow)} key={`stat-${i}`}>
        <span className={Style.name}>{stat.name}</span>
        <span className={"flex-grow-1"}></span>
        <span className={Style.value}>{stat.value}</span>
      </div>
    );
  }

  return (
    <SecondaryContainer header={"Статистика"} className={cn("px-3", "h-100")}>
      {items}
    </SecondaryContainer>
  );
};

export default Stats;
