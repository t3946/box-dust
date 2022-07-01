import * as React from "react";
import Select from "@components/common/ui/select/Select";
import useSelector from "@hooks/useSelector";
import Styles from "@components/pages/main/SelectCategory.module.scss";
import { useRouter } from "next/router";

interface IProps {
  className?: any;
}

export const SelectCategory: React.FC<IProps> = function (props) {
  const { className } = props;
  const route = useRouter();
  const accountMenu = useSelector((state) => state.menu.account);
  const selectOptions = accountMenu.map((link) => {
    return {
      label: link.label,
      value: link.route,
    };
  });
  const elem = accountMenu.find((elem) => elem.route === route.pathname);
  const selectedOption = elem
    ? {
        label: elem.label,
        value: elem.route,
      }
    : undefined;

  return (
    <Select
      options={selectOptions}
      name={"select-account-page"}
      value={selectedOption}
      onChange={(e) => {
        route.push(e.target.value.value);
      }}
      instanceId={"select-category"}
      classes={{
        select: ["d-sm-none", Styles.select, className],
      }}
      clearable={false}
    />
  );
};

export default SelectCategory;
