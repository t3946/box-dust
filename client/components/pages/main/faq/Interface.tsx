import * as React from "react";
import IconPrev from "@components/common/icons/chevron-left/Solid";
import IconNext from "@components/common/icons/chevron-right/Solid";
import Style from "@components/pages/main/faq/Interface.module.scss";
import StyleFlatButton from "@components/common/ui/flat-button/FlatButton.module.scss";
import cn from "classnames";

export interface IProps {
  nextHandler: any;
  prevHandler: any;
}

export const Interface: React.FC<IProps> = function (props) {
  const { nextHandler, prevHandler } = props;

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
