import * as React from "react";
import Style from "@components/pages/account/Sidebar.module.scss";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import Badge from "@components/common/badge/Badge";
import LogoutButton from "@components/pages/account/sidebar/LogoutButton";
import BackButton from "@components/pages/account/sidebar/BackButton";

export interface IProps {
  items: Record<any, any>[];
}

export const Sidebar: React.FC<IProps> = function (props) {
  const { items } = props;
  const router = useRouter();
  const itemTemplates = [];

  for (let i = 0; i < items.length; i++) {
    const { label, route, badge, badgeTheme, className, type } = items[i];
    let content;

    switch (type) {
      case "logout":
        content = <LogoutButton />;
        break;
      case "back":
        content = <BackButton />;
        break;

      default:
        content = (
          <Link href={route}>
            <a
              className={cn(
                Style.item,
                {
                  [Style.item__active]: router.route === route,
                },
                "position-relative",
                "d-flex",
                "justify-content-between",
                "link-unstyled",
                className
              )}
            >
              <span className={cn("d-flex", "align-items-center")}>
                <span>{label}</span>
              </span>
              {!!badge && <Badge theme={badgeTheme}>{badge}</Badge>}
            </a>
          </Link>
        );
    }

    itemTemplates.push(
      <li className={cn(Style.sidebar_item)} key={`sidebar-item-${i}`}>
        {content}
      </li>
    );
  }

  return <ul className={cn("list-unstyled", "m-0")}>{itemTemplates}</ul>;
};

export default Sidebar;
