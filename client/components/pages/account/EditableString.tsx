import * as React from "react";
import Style from "@components/pages/account/EditableString.module.scss";
import Edit from "@components/common/icons/edit/Edit";
import { PropsWithChildren } from "react";
import cn from "classnames";

export interface IProps extends PropsWithChildren<any> {
  className: any;
  string?: string;
}

export const EditableString: React.FC<IProps> = function (props) {
  const { string, children, className } = props;

  return (
    <div className={cn(Style.editableString, className)}>
      {children}
      <Edit className={cn(Style.editIcon, Style.editableString_icon)} />
    </div>
  );
};

export default EditableString;
