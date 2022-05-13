import React from "react";
import { components } from "react-select";

const Separator = (props: any) => {
  return (
    <components.IndicatorSeparator {...props} className={"d-none"}>
      {props.children}
    </components.IndicatorSeparator>
  );
};

export default Separator;
