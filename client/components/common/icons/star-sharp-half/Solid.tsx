import * as React from "react";
import cn from "classnames";

export interface IProps {
  className?: any;
}

export const Solid: React.FC<IProps> = function (props) {
  const { className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={cn(className)}
      fill={"currentColor"}
    >
      <path d="M329.6 176H488C498.3 176 507.4 182.5 510.7 192.2C514 201.9 510.8 212.6 502.7 218.9L371.9 320.7L422.9 480.7C426.1 490.7 422.4 501.7 413.7 507.7C405.1 513.7 393.6 513.4 385.3 506.9L256 406.4L126.7 506.9C118.4 513.4 106.9 513.7 98.27 507.7C89.65 501.7 85.94 490.7 89.13 480.7L140.1 320.7L9.267 218.9C1.174 212.6-2.027 201.9 1.3 192.2C4.628 182.5 13.75 176 24 176H182.5L233.1 16.72C236.3 6.764 245.6 0 256 0C266.5 0 275.7 6.764 278.9 16.72L329.6 176z" />
    </svg>
  );
};

export default Solid;
