import * as React from "react";
import Style from "@components/pages/account/partnership/stats/CountersList.module.scss";
import cn from "classnames";

export interface IProps {
  icon: any;
  header: string;
  counters: Record<any, any>[];
}

export const CountersList: React.FC<IProps> = function (props) {
  const { header, icon, counters } = props;
  const listItems = [];

  for (let i = 0; i < counters.length; i++) {
    const { title, value, valueThemeSuccess } = counters[i];

    listItems.push(
      <div
        className={cn("d-flex", "justify-content-between", Style.counterItem)}
        key={`item-${i}`}
      >
        <span>{title}</span>
        <span
          className={cn(Style.value, {
            [Style.value_theme_success]: valueThemeSuccess,
          })}
        >
          {value}
        </span>
      </div>
    );
  }

  return (
    <>
      <h5>{header}</h5>

      <div className={Style.tileGrid}>
        <span className={Style.icon}>{icon}</span>

        <div className={Style.listItems}>{listItems}</div>
      </div>
    </>
  );
};

export default CountersList;
