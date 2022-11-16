import * as React from "react";
import useSelector from "@hooks/useSelector";
import Style from "@components/pages/account/partnership/stats/Stats.module.scss";
import cn from "classnames";
import Panel from "@components/common/layout/account/Panel";
import IconUsers from "@components/common/icons/users/Duotone";
import IconDice from "@components/common/icons/dice/Duotone";
import IconCoins from "@components/common/icons/coins/Duotone";
import CountersList from "@components/pages/account/partnership/stats/CountersList";
import balanceToString from "@utils/balanceToString";
import ProfitChart from "@components/pages/account/partnership/stats/ProfitChart";

export const Stats: React.FC = function () {
  const user = useSelector((state) => state.user.user);
  const revenuePercent = user.partnership.revenue_percent;
  const shortStats = [
    {
      name: "статус",
      value: user.partnership.name,
    },
    {
      name: "прибыль по статусу",
      value: revenuePercent + "%",
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
  const counters = {
    users: [
      {
        title: "За 7 дней",
        value: "+5",
        valueThemeSuccess: true,
      },
      {
        title: "За 30 дней",
        value: "10",
      },
      {
        title: "За всё время",
        value: "100",
      },
    ],

    games: [
      {
        title: "За 7 дней",
        value: "+15",
        valueThemeSuccess: true,
      },
      {
        title: "За 30 дней",
        value: "50",
      },
      {
        title: "За всё время",
        value: "300",
      },
    ],

    revenue: [
      {
        title: "За 7 дней",
        value: <span className={"rouble"}>+{balanceToString(250000)}</span>,
        valueThemeSuccess: true,
      },
      {
        title: "За 30 дней",
        value: <span className={"rouble"}>{balanceToString(700000)}</span>,
      },
      {
        title: "За всё время",
        value: <span className={"rouble"}>{balanceToString(2000000)}</span>,
      },
    ],

    profit: [
      {
        title: "За 7 дней",
        value: (
          <span className={"rouble"}>
            +{balanceToString((250000 * revenuePercent) / 100)}
          </span>
        ),
        valueThemeSuccess: true,
      },
      {
        title: "За 30 дней",
        value: (
          <span className={"rouble"}>
            {balanceToString((700000 * revenuePercent) / 100)}
          </span>
        ),
      },
      {
        title: "За всё время",
        value: (
          <span className={"rouble"}>
            {balanceToString((2000000 * revenuePercent) / 100)}
          </span>
        ),
      },
    ],
  };

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
        <h1 className={"m-0 d-flex justify-content-between align-items-center"}>
          <span>Статистика</span>
          <span className={Style.pill}>{user.partnership.name}</span>
        </h1>
      </Panel>

      <Panel className={Style.areaUsers}>
        <CountersList
          icon={<IconUsers />}
          header={"Пользователи"}
          counters={counters.users}
        />
      </Panel>

      <Panel className={Style.areaGames}>
        <CountersList
          icon={<IconDice />}
          header={"Игры"}
          counters={counters.games}
        />
      </Panel>

      <Panel className={Style.areaRevenue}>
        <CountersList
          icon={<IconCoins />}
          header={"Доход"}
          counters={counters.revenue}
        />
      </Panel>

      <Panel className={Style.areaProfit}>
        <CountersList
          icon={<IconCoins />}
          header={`Прибыль (${revenuePercent}%)`}
          counters={counters.profit}
        />
      </Panel>

      <Panel className={cn(Style.areaProfitChart, "d-flex", "flex-column")}>
        <h4>Прибыль по дням</h4>

        <div className={"flex-grow-1"}>
          <ProfitChart />
        </div>
      </Panel>

      <Panel className={Style.areaTransactions}>
        <h4>Транзакции</h4>
      </Panel>
    </div>
  );
};

export default Stats;