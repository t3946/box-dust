import * as React from "react";
import Style from "@components/pages/account/Sidebar.module.scss";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import Badge from "@components/common/badge/Badge";
import ButtonLogout from "@components/pages/account/sidebar/LogoutButton";
import ButtonBack from "@components/pages/account/sidebar/BackButton";

export interface IProps {
  items: Record<any, any>[];
}

export const Sidebar: React.FC<IProps> = function (props) {
  const { items } = props;
  const router = useRouter();
  const itemTemplates = [];

  for (let i = 0; i < items.length; i++) {
    const { label, route, badge, badgeTheme, className, icon } = items[i];
    let content;

    switch (items[i].type) {
      case "buttonLogout":
        content = <ButtonLogout className={className} />;
        break;

      case "buttonBack":
        content = <ButtonBack className={className} referer={items[i].referer} />;
        break;

      default:
        content = (
          <Link
            href={route}
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
            <div className={"d-flex"}>
              {icon ? <span className={Style.icon}>{icon}</span> : null}
              <span className={cn("d-flex", "align-items-center")}>
                <span>{label}</span>
              </span>
            </div>
            {!!badge && <Badge theme={badgeTheme}>{badge}</Badge>}
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
