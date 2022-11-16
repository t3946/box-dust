import * as React from "react";
import useSelector from "@hooks/useSelector";
import Style from "@components/pages/account/partnership/stats/Stats.module.scss";
import SecondaryContainer from "@components/common/layout/account/SecondaryContainer";
import cn from "classnames";
import Panel from "@components/common/layout/account/Panel";

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
    <div className={Style.grid}>
      <Panel className={[Style.areaHeader, "py-2"]}>
        <h1 className={"m-0"}>Статистика</h1>
      </Panel>

      <Panel className={Style.areaUsers}>
        <h5>Пользователи</h5>
      </Panel>
      <Panel className={Style.areaGames}>
        <h5>Игры</h5>
      </Panel>
      <Panel className={Style.areaRevenue}>
        <h5>Доход</h5>
      </Panel>
      <Panel className={Style.areaProfit}>
        <h5>Прибыль</h5>
      </Panel>

      <Panel className={Style.areaProfitChart}>
        <h4>Прибыль по дням</h4>
      </Panel>
      <Panel className={Style.areaTransactions}>
        <h4>Транзакции</h4>
      </Panel>
    </div>
  );
};

export default Stats;
