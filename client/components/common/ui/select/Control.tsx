import React from "react";
import cn from "classnames";
import { components } from "react-select";

import Styles from "@components/common/ui/select/Control.module.scss";

const Control = function (props: any) {
  const RSControl = components.Control;

  return (
    <RSControl
      {...props}
      className={cn(
        "flex-nowrap",
        Styles.control,
        props.selectProps.classes?.control,
        {
          [Styles.control_valid]: props.selectProps.isValid,
          [Styles.control_invalid]: props.selectProps.isInvalid,
        }
      )}
    />
  );
};

export default Control;
