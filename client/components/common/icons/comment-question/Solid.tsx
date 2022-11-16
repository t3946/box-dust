import * as React from "react";
import cn from "classnames";

export interface IProps {
  className?: any;
}

export const Solid: React.FC<IProps> = function (props) {
  const { className } = props;

  return (
    <svg
      className={cn(className)}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M256 31.1c-141.4 0-255.1 93.13-255.1 208c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.38-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734c1.249 3 4.021 4.766 7.271 4.766c66.25 0 115.1-31.76 140.6-51.39c32.63 12.25 69.02 19.39 107.4 19.39c141.4 0 255.1-93.13 255.1-208S397.4 31.1 256 31.1zM249.1 352C235.4 352 224 340.6 224 326S235.4 300 249.1 300c14.63 0 26 11.38 26 26S264.6 352 249.1 352zM307.7 235.4l-38.33 23.13v1.652c0 10.74-9.168 19.83-20 19.83c-10.83 0-20-9.088-20-19.83V246.1c0-6.609 3.332-13.22 10-17.35l47.5-28.09C292.7 198.2 296 192.4 296 185.8c0-9.914-8.334-18.17-18.33-18.17H234.3c-10 0-18.33 8.26-18.33 18.17c0 10.74-9.166 19.83-20 19.83S176 196.6 176 185.8C176 153.6 201.8 128 234.3 128h43.33C310.2 128 336 153.6 336 185.8C336 205.7 325.2 224.7 307.7 235.4z" />
    </svg>
  );
};

export default Solid;