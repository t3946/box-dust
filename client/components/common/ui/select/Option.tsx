import React from "react";
import cn from "classnames";
import { components } from "react-select";

import Styles from "@components/common/ui/select/Option.module.scss";

const Option = function (props: any) {
  const RSOption = components.Option;
  const { isSelected, isFocused } = props;

  return (
    <RSOption
      {...props}
      className={cn(Styles.option, props.selectProps.classes?.option, {
        [Styles.option_selected]: isSelected,
        [Styles.option_focus]: isFocused,
      })}
    />
  );
};

export default Option;
