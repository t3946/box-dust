import React from "react";
import cn from "classnames";
import { components } from "react-select";

const IndicatorsContainer: React.FC = (props: any) => {
  return (
    <components.IndicatorsContainer
      {...props}
      className={cn(props.selectProps.classes?.indicatorsContainer)}
    />
  );
};

export default IndicatorsContainer;
