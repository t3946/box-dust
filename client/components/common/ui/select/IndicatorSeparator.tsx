import React from "react";
import cn from "classnames";
import { components } from "react-select";

const IndicatorSeparator: React.FC = (props: any) => {
  return (
    <components.IndicatorSeparator
      {...props}
      className={cn(props.selectProps.classes?.indicatorSeparator)}
    />
  );
};

export default IndicatorSeparator;
