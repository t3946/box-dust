import * as React from "react";
import cn from "classnames";

export interface IProps {
  className?: any;
}

export const Cross: React.FC<IProps> = function (props) {
  const { className } = props;

  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        d="M20 20L4 4.00003M20 4L4.00002 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Cross;
