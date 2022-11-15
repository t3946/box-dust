import * as React from "react";
import NextLink from "next/link";
import { PropsWithChildren } from "react";
import Style from "@components/common/link/Link.module.scss";
import cn from "classnames";

export interface IProps extends PropsWithChildren<any> {
  className?: any;
  href: string;
}

export const Link: React.FC<IProps> = function (props) {
  const { href, className } = props;

  return (
    <NextLink href={href}>
      <a className={cn(Style.link, className)}>{props.children}</a>
    </NextLink>
  );
};

export default Link;
