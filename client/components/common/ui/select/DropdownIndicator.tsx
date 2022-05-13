import React from "react";
import { components } from "react-select";
import cn from "classnames";

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator
      {...props}
      className={cn(props.selectProps.classes?.indicator)}
    />
  );
};

export default DropdownIndicator;
