import * as React from "react";
import Tiles from "@components/pages/main/Tiles";
import Select from "@components/common/ui/select/Select";
import useSelector from "@hooks/useSelector";
import { setSelected } from "@redux/actions/Categories";
import { useDispatch } from "react-redux";

interface IProps {
  catalog: Record<any, any>[];
}

export const SelectCategory: React.FC<IProps> = function (props) {
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );
  const { catalog } = props;
  const selectOptions = catalog.map((category) => {
    return {
      label: category.name,
      value: category,
    };
  });
  const selectedOption = {
    label: selectedCategory.name,
    value: selectedCategory,
  };
  const dispatch = useDispatch();

  function selectCategory(category: Record<any, any>) {
    dispatch(setSelected(category));
  }

  return (
    <div>
      <div className="col">
        <Select
          options={selectOptions}
          name={"foo"}
          value={selectedOption}
          onChange={(e) => {
            selectCategory(e.target.value.value);
          }}
          instanceId={"select-category"}
          classes={{
            select: "d-sm-none",
          }}
        />
      </div>

      <div className="col-12 pl-0 pr-0 d-none d-sm-block">
        <Tiles catalog={catalog} />
      </div>
    </div>
  );
};

export default SelectCategory;
