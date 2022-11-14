import * as React from "react";
import Style from "@components/pages/main/faq/SelectQuestion.module.scss";
import ReactSelect from "react-select";

interface IProps {
  questions: Record<any, any>[];
  selectedQuestionIndex: number;
  selectHandler: any;
}

export const SelectQuestion: React.FC<IProps> = function (props) {
  const { questions, selectedQuestionIndex, selectHandler } = props;
  const selectOptions = questions.map((category, i) => {
    return {
      label: category.title,
      value: i,
    };
  });

  const value = {
    label: questions[selectedQuestionIndex].title,
    value: selectedQuestionIndex,
  };

  return (
    <ReactSelect
      options={selectOptions}
      name={"foo"}
      value={value}
      onChange={(e) => {
        e && selectHandler(e.value);
      }}
      instanceId={"select-question"}
      classes={{
        valueContainer: Style.valueContainer,
        list: Style.list,
      }}
      classNamePrefix={"flatButtonSelect"}
      styles={{
        control: (base, state) => {
          const styles = {
            ...base,
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
          return {
            ...base,
            border: "none",
            boxShadow: "none",
            margin: "0",
            background: "transparent",
          };
        },

        menuList: (base) => {
          return {
            ...base,
            padding: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          };
        },

        option: (base, state) => {
          return {
            ...base,
            backgroundColor: state.isSelected ? "#22004b" : "#2a015d",
            padding: "10px 20px",
            fontSize: "18px",
          };
        },
      }}
    />
  );
};

export default SelectQuestion;
