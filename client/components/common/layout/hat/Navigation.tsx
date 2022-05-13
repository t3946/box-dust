import * as React from "react";
import useSelector from "@hooks/useSelector";
import Styles from "@components/common/layout/hat/Navigation.module.scss";
import cn from "classnames";
import { setSelected } from "@redux/actions/Categories";
import { useDispatch } from "react-redux";

export const Navigation: React.FC = function () {
  const catalog = useSelector((state) => state.catalog);
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );
  const items = [];
  const dispatch = useDispatch();

  function selectCategory(category: Record<any, any>) {
    dispatch(setSelected(category));
  }

  for (const i in catalog) {
    const category = catalog[i];

    items.push(
      <li className={Styles.headerMenuItem} key={`nav-item-${i}`}>
        <a
          className={cn([
            Styles.headerMenuItemLink,
            {
              [Styles.headerMenuItemLink_active]:
                selectedCategory.category_id === category.category_id,
            },
          ])}
          onClick={() => selectCategory(category)}
          href="#"
        >
          {category.name}
        </a>
      </li>
    );
  }

  return (
    <nav>
      <ul className={cn([Styles.headerMenu, "list-unstyled", "px-3"])}>
        {items}
      </ul>
    </nav>
  );
};

export default Navigation;
