import * as React from "react";
import Chart from "@components/pages/account/partnership/charts/chart/Chart";
import Intervals from "@components/pages/account/partnership/charts/chart/Intervals";
import Style from "@components/pages/account/partnership/charts/chart/ChartGroup.module.scss";
import cn from "classnames";

export interface IProps {
  title: string;
  classes?: {
    chart?: any;
  };
}

function getData(size: number) {
  const dayTime = 24 * 60 * 60 * 1000;
  const now = new Date().getTime();
  const data = [];

  for (let i = 0; i < size; i++) {
    const date = new Date(now - dayTime * i);

    data.unshift({
      date: date.toLocaleDateString(),
      value: 500 * Math.round(Math.random() * 6),
    });
  }

  return data;
}

export const ProfitChartGroup: React.FC<IProps> = function (props) {
  const { title, classes = {} } = props;
  const intervals = [
    {
      title: "7 дней",
      size: 7,
    },
    {
      title: "30 дней",
      size: 30,
    },
  ];
  const [activeInterval, setActiveInterval] = React.useState(intervals[0]);
  const data = getData(activeInterval.size);

  return (
    <div className={cn(Style.container, "d-flex", "flex-column")}>
      <h4>{title}</h4>

      <Intervals
        className={cn(Style.container__interface, "mb-2")}
        onChangeInterval={(interval) => {
          setActiveInterval(interval);
        }}
        intervals={intervals}
        activeInterval={activeInterval}
      />

      <div className={cn(classes.chart || Style.chartContainer)}>
        <Chart data={data} />
      </div>
    </div>
  );
};

export default ProfitChartGroup;
