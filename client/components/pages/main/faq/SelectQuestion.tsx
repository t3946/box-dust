import * as React from "react";
import Select from "@components/common/ui/select/Select";
import { setSelected } from "@redux/actions/Categories";
import { useDispatch } from "react-redux";
import Style from "@components/pages/main/faq/SelectQuestion.module.scss";
import StyleFlatButton from "@components/common/ui/flat-button/FlatButton.module.scss";

interface IProps {
  questions: Record<any, any>[];
  selectedQuestionIndex: number;
}

export const SelectQuestion: React.FC<IProps> = function (props) {
  const { questions, selectedQuestionIndex } = props;
  const selectOptions = questions.map((category, i) => {
    return {
      label: category.title,
      value: i,
    };
  });

  const dispatch = useDispatch();

  function selectCategory(category: Record<any, any>) {
    dispatch(setSelected(category));
  }

  const value = {
    label: questions[selectedQuestionIndex].title,
    value: selectedQuestionIndex,
  };
  console.log({ selectOptions, value });

  return (
    <Select
      options={selectOptions}
      name={"foo"}
      value={value}
      onChange={(e) => {
        selectCategory(e.target.value.value);
      }}
      instanceId={"select-question"}
      clearable={false}
      classes={{
        valueContainer: Style.valueContainer,
        control: [Style.control, StyleFlatButton.flatButton],
        list: Style.list,
      }}
      styles={{
        control: (base, state) => {
          const styles = {
            ...base,
            overflow: "hidden",
            border: "none",
            outline: "none",
            boxShadow: "none",
            borderRadius: 10,
          };

          if (state.menuIsOpen) {
            styles.borderBottomLeftRadius = 0;
            styles.borderBottomRightRadius = 0;
          }

          return styles;
        },

        valueContainer(base) {
          return { ...base, padding: "0 20px" };
        },

        indicatorsContainer(base) {
          console.log("INDICATORCONTAINER", {base});
          return { ...base, color: "#ffffff", height: "75px" };
        },

        indicatorSeparator: (base) => {
          return {
            ...base,
            display: "none",
          };
        },

        singleValue: (base) => ({
          ...base,
          color: "white",
        }),

        menu: (base) => {
          console.log("MENU", { base });
          return {
            ...base,
            backgroundColor: "#30006d",
            border: "none",
            boxShadow: "none",
            margin: "0",
          };
        },

        option: (base, state) => {
          return {
            ...base,
            backgroundColor: state.isSelected ? "#130131" : "#30006d",
            padding: "10px 20px",
            fontSize: "18px",
          };
        },
      }}
    />
  );
};

export default SelectQuestion;
