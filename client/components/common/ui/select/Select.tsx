import React from "react";
import cn from "classnames";
import ReactSelect, { components } from "react-select";

import Input from "@components/common/ui/select/Input";
import Control from "@components/common/ui/select/Control";
import Option from "@components/common/ui/select/Option";
import Menu from "@components/common/ui/select/Menu";
import MenuList from "@components/common/ui/select/MenuList";
import IndicatorsContainer from "@components/common/ui/select/IndicatorsContainer";
import DropdownIndicator from "@components/common/ui/select/DropdownIndicator";
import IndicatorSeparator from "@components/common/ui/select/IndicatorSeparator";

import Styles from "@components/common/ui/select/Select.module.scss";

interface IProps {
  options: any;
  disabled?: boolean;
  name: string;
  value: { value: any; label: string };
  clearable?: boolean;
  isValid?: boolean;
  isInvalid?: boolean;
  defaultIsOpen?: boolean;
  isSearchable?: boolean;
  onChange?: (value: any) => void;
  placeholder?: React.ReactNode | string;
  instanceId?: string;
  classes?: {
    select?: any;
    control?: any;
    menu?: any;
    list?: any;
    indicator?: any;
    indicatorsContainer?: any;
    indicatorSeparator?: any;
    option?: any;
    valueContainer?: any;
  };
}

const Select = function (props: IProps) {
  const {
    classes,
    options,
    placeholder = "",
    disabled,
    value,
    onChange,
    name,
    isValid,
    isInvalid,
    clearable = true,
    defaultIsOpen = false,
    isSearchable = true,
    instanceId,
  } = props;
  return (
    <ReactSelect
      className={cn(Styles.select, classes?.select)}
      defaultMenuIsOpen={defaultIsOpen}
      isClearable={clearable}
      onChange={(newValue) => {
        value !== newValue &&
          onChange &&
          onChange({ target: { name, value: newValue } });
      }}
      value={value}
      name={name}
      options={options}
      classes={classes}
      isSearchable={isSearchable}
      isValid={isValid}
      isInvalid={isInvalid}
      isDisabled={disabled}
      placeholder={placeholder}
      instanceId={instanceId}
      components={{
        Option,
        Menu,
        MenuList,
        Control,
        Input,
        IndicatorsContainer,
        DropdownIndicator,
        IndicatorSeparator,
        ValueContainer: Component(
          components.ValueContainer,
          classes?.valueContainer
        ),
      }}
    />
  );
};

const Component = (RSComponent: any, className?: any) => {
  return (props: any) => {
    return <RSComponent {...props} className={cn(className)} />;
  };
};

export default Select;
