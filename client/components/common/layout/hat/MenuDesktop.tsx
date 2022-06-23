import * as React from "react";
import Style from "@components/common/layout/hat/MenuDesktop.module.scss";

export const MenuDesktop: React.FC = function () {
  const menu = [
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
        <a href={menuItem.link} className={Style.navLink}>
          {menuItem.label}
        </a>
      </li>
    );
  }

  return <ul className={"list-unstyled m-0"}>{items}</ul>;
};

export default MenuDesktop;