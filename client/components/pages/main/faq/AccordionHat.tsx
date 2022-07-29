import * as React from "react";
import Style from "@components/pages/main/faq/AccordionHat.module.scss";
import cn from "classnames";

export interface IProps {
  Icon: any;
  title: string;
  classes?: {
    icon?: any;
  };
}

export const AccordionHat: React.FC<IProps> = function (props) {
  const { Icon, title, classes } = props;

  return (
    <div className={cn("d-flex", "align-items-center", Style.container)}>
      <span className={cn(Style.iconContainer)}>
        <Icon className={cn(Style.icon, classes?.icon)} />
      </span>
      <span className={cn(Style.title, "ms-3")}>{title}</span>
    </div>
  );
};

export default AccordionHat;
