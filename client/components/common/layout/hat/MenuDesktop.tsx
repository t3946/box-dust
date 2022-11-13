import * as React from "react";
import Style from "@components/common/layout/hat/MenuDesktop.module.scss";
import cn from "classnames";

export const MenuDesktop: React.FC = function () {
  const menu = [
    {
      link: "#main",
      label: "Главная",
    },
    {
      link: "#boxes",
      label: "Коробки",
    },
    {
      link: "#delivery",
      label: "Доставка",
    },
    {
      link: "#reviews",
      label: "Отзывы",
    },
    {
      link: "#contacts",
      label: "Контакты",
    },
  ];

  const items = [];

  for (const i in menu) {
    const menuItem = menu[i];

    items.push(
      <li className={Style.navItem} key={`menu-item-${i}`}>
        <a
          href={menuItem.link}
          className={cn(Style.navLink, "link-unstyled", {
            [Style.navLink_theme_active]: i === "0",
          })}
        >
          {menuItem.label}
        </a>
      </li>
    );
  }

  return (
    <ul className={cn("list-unstyled", "m-0 d-none", "d-xl-grid", Style.menu)}>
      {items}
    </ul>
  );
};

export default MenuDesktop;
