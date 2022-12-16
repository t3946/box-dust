import * as React from "react";
import Panel from "@components/common/layout/account/Panel";
import Style from "./Charts.module.scss";
import ChartGroup from "@components/pages/account/partnership/charts/chart/ChartGroup";

export default function Charts() {
  return (
    <div className={Style.container}>
      <Panel className={[Style.areaHeader, "py-2", Style.containerHeader]}>
        <h1 className={"m-0"}>
          <span>Чарты</span>
        </h1>
      </Panel>

      <Panel className={Style.areaChart1}>
        <ChartGroup title={"Доход"} classes={{ chart: Style.chart }} />
      </Panel>

      <Panel className={Style.areaChart2}>
        <ChartGroup title={"Прибыль"} classes={{ chart: Style.chart }} />
      </Panel>

      <Panel className={Style.areaChart3}>
        <ChartGroup title={"Лиды"} classes={{ chart: Style.chart }} />
      </Panel>

      <Panel className={Style.areaChart4}>
        <ChartGroup title={"Спины"} classes={{ chart: Style.chart }} />
      </Panel>
    </div>
  );
}
