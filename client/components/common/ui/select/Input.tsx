import React from "react";
import { components } from "react-select";

const Input = function (props: any) {
  const RSInput = components.Input;

  return <RSInput {...props} name={props.selectProps.name} isHidden={false} />;
};

export default Input;
