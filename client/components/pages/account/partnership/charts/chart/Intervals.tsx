import * as React from "react";
import cn from "classnames";
import Style from "./Intervals.module.scss";

export interface IInterval {
  title: string;
  size: number;
}

export interface IProps {
  onChangeInterval: (interval: IInterval) => void;
  activeInterval: IInterval;
  intervals: IInterval[];
  className: any;
}

export const Intervals: React.FC<IProps> = function (props) {
  const { activeInterval, intervals, onChangeInterval, className } = props;
  const intervalItems = [];

  for (const interval of intervals) {
    const { title, size } = interval;

    intervalItems.push(
      <span
        className={cn(Style.intervals__item, Style.pill, Style.interface__pill, {
          [Style.pill_active]: activeInterval.size === interval.size,
        })}
        onClick={() => onChangeInterval(interval)}
        key={`interval-${size}`}
      >
        {title}
      </span>
    );
  }

  return <div className={cn(className)}>{intervalItems}</div>;
};

export default Intervals;
