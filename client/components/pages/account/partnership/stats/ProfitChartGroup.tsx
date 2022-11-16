import * as React from "react";
import ProfitChart from "@components/pages/account/partnership/stats/ProfitChart";
import Style from "@components/pages/account/partnership/stats/ProfitChartGroup.module.scss";
import cn from "classnames";

export interface IProps {
  onChangeInterval: any;
}

export const ProfitChartGroup: React.FC<IProps> = function (props) {
  const { onChangeInterval } = props;
  const [chartInterval, setChartInterval] = React.useState(0);
  const intervals = [
    {
      title: "7 дней",
    },

    {
      title: "30 дней",
    },

    {
      title: "всё вермя",
    },
  ];

  const intervalsItems = [];

  for (let i = 0; i < intervals.length; i++) {
    intervalsItems.push(
      <span
        className={cn(Style.pill, Style.interface__pill, {
          [Style.pill_active]: i === chartInterval,
        })}
        onClick={() => {
          setChartInterval(i);
          onChangeInterval(intervals[i]);
        }}
      >
        {intervals[i].title}
      </span>
    );
  }

  return (
    <div className={Style.container}>
      <div className={cn(Style.interface, Style.container__interface)}>
        {intervalsItems}
      </div>

      <ProfitChart />
    </div>
  );
};

export default ProfitChartGroup;
