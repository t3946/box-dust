import * as React from "react";
import cn from "classnames";
import Styles from "@components/pages/main/Tiles.module.scss";
import { setSelected } from "@redux/actions/Categories";
import { useDispatch } from "react-redux";
import useSelector from "@hooks/useSelector";

interface IProps {
  catalog: Record<any, any>[];
}

export const Tiles: React.FC<IProps> = function (props) {
  const { catalog } = props;
  const items = [];
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );
  const dispatch = useDispatch();

  function selectCategory(category: Record<any, any>) {
    dispatch(setSelected(category));
  }

  for (let i = 0; i < catalog.length; i++) {
    const category = catalog[i];

    items.push(
      <label
        className={cn([
          Styles.categoryTile,
          Styles[`categoryTile${i + 1}`],
          {
            [Styles.categoryTile_select]:
              category.category_id === selectedCategory.category_id,
          },
        ])}
        key={`categoryTile${i + 1}`}
      >
        <input
          type="radio"
          name={"select-category"}
          onChange={() => selectCategory(category)}
          className={"d-none"}
        />

        <div key={`category-tile-${i}`}>{category.name}</div>
      </label>
    );
  }

  return <div className={Styles.categoryTiles}>{items}</div>;
};

export default Tiles;
