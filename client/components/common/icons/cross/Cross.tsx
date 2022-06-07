import * as React from "react";
import cn from "classnames";

export interface IProps {
  className?: any;
}

export const Cross: React.FC<IProps> = function (props) {
  const { className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      className={cn(className)}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 10.75L3.25 2 2 3.25 10.75 12 2 20.75 3.25 22 12 13.25 20.75 22 22 20.75 13.25 12 22 3.25 20.75 2z"
      />
    </svg>
  );
};

export default Cross;
