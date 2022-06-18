import * as React from "react";
import IconMinus from "@components/common/icons/minus/Minus";
import IconPlus from "@components/common/icons/plus/Plus";
import Style from "@components/common/form/Counter.module.scss";
import cn from "classnames";
import Input from "@components/common/form/Input";

export interface IProps {
  value: number;
  className?: any;
  handleChange: any;
  name: string;
  setValues?: any;
  min: number;
  max: number;
  disabled: boolean;
}

export const Counter: React.FC<IProps> = function (props) {
  const {
    name,
    value,
    className,
    handleChange,
    setValues,
    min,
    max,
    disabled,
  } = props;

  function validate(value: any) {
    value = parseInt(value);

    //if newValue is NaN for example
    if (!value) {
      value = 0;
    }

    if (value > max) {
      value = max;
    }

    if (value < min) {
      value = min;
    }

    return value;
  }

  function inc() {
    setValues({ [name]: validate(value + 1) });
  }

  function dec() {
    setValues({ [name]: validate(value - 1) });
  }

  return (
    <div className={cn(Style.counter, "d-inline-block", className)}>
      <div className={"d-flex"}>
        <div
          className={cn(Style.button, Style.button_dec, {
            [Style.button_disabled]: value === min,
          })}
          onClick={dec}
        >
          <IconMinus className={Style.icon} />
        </div>

        <Input
          name={name}
          type="number"
          className={Style.input}
          value={value}
          handleChange={(e: any) => {
            e.target.value = validate(e.target.value);
            handleChange(e);
          }}
          disabled={disabled}
        />

        <div
          className={cn(Style.button, Style.button_inc, {
            [Style.button_disabled]: value === max,
          })}
          onClick={inc}
        >
          <IconPlus className={Style.icon} />
        </div>
      </div>
    </div>
  );
};

export default Counter;
