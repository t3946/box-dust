import * as React from "react";
import Style from "@components/common/layout/account/SecondaryContainer.module.scss";
import cn from "classnames";

export interface IProps extends React.PropsWithChildren {
  className?: any;
  header?: string;
}

export const SecondaryContainer: React.FC<IProps> = function (props) {
  const { className, header } = props;

  return (
    <div
      className={cn(Style.container, className, "position-relative", {
        [Style.container_withHeader]: !!header,
      })}
    >
      {!!header && (
        <span className={cn(Style.header, Style.container__header)}>
          {header}
        </span>
      )}
      {props.children}
    </div>
  );
};

export default SecondaryContainer;
