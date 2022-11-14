import * as React from "react";
import IconPrev from "@components/common/icons/chevron-left/Solid";
import IconNext from "@components/common/icons/chevron-right/Solid";
import Style from "@components/pages/main/faq/Interface.module.scss";
import StyleFlatButton from "@components/common/ui/flat-button/FlatButton.module.scss";
import cn from "classnames";
import SelectQuestion from "@components/pages/main/faq/SelectQuestion";

export interface IProps {
  nextHandler: any;
  prevHandler: any;
  questions: any;
  selectedQuestionIndex: number;
  selectHandler: any;
}

export const Interface: React.FC<IProps> = function (props) {
  const {
    nextHandler,
    prevHandler,
    questions,
    selectedQuestionIndex,
    selectHandler,
  } = props;

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className={Style.navItems}>
          <div
            className={cn(Style.navButton, StyleFlatButton.flatButton)}
            onClick={prevHandler}
          >
            <IconPrev className={Style.navIcon} />
          </div>

          <div
            className={cn(Style.navButton, StyleFlatButton.flatButton)}
            onClick={nextHandler}
          >
            <IconNext className={Style.navIcon} />
          </div>

          <SelectQuestion
            questions={questions}
            selectedQuestionIndex={selectedQuestionIndex}
            selectHandler={selectHandler}
          />
        </div>

        <div className={"d-flex"}>
          <div className={cn(Style.createReview, StyleFlatButton.flatButton)}>
            Задать свой вопрос
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interface;
