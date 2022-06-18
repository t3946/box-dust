import * as React from "react";
import cn from "classnames";
import Style from "@components/common/form/Input.module.scss";
import { HTMLInputTypeAttribute } from "react";

export interface IProps {
  value: number | string;
  className?: any;
  type?: HTMLInputTypeAttribute;
  name?: string;
  id?: string;
  placeholder?: string;
  handleChange: any;
  disabled: boolean;
}

export const Input: React.FC<IProps> = function (props) {
  const {
    value,
    className,
    placeholder,
    type = "text",
    name,
    id,
    handleChange,
    disabled,
  } = props;

  return (
    <input
      id={id}
      name={name}
      type={type}
      className={cn(className, Style.input)}
      value={value}
      placeholder={placeholder}
      min={0}
      max={999}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default Input;
