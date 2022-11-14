import * as React from "react";
import IconPrev from "@components/common/icons/chevron-left/Solid";
import IconNext from "@components/common/icons/chevron-right/Solid";
import Style from "@components/pages/main/reviews/Interface.module.scss";

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
          <div className={Style.navButton} onClick={nextHandler}>
            <IconPrev className={Style.navIcon} />
          </div>

          <div className={Style.navButton} onClick={prevHandler}>
            <IconNext className={Style.navIcon} />
          </div>
        </div>

        <div className={"d-flex"}>
          <div className={Style.createReview}>оставить отзыв</div>
        </div>
      </div>
    </div>
  );
};

export default Interface;
