import * as React from "react";
import IconPrev from "@components/common/icons/chevron-left/Solid";
import IconNext from "@components/common/icons/chevron-right/Solid";
// import IconPrev from "@components/common/icons/angle-left/AngleLeft";
// import IconNext from "@components/common/icons/angle-right/AngleRight";
import Style from "@components/pages/main/reviews/Interface.module.scss";
import cn from "classnames";

export interface IProps {}

export const Interface: React.FC<IProps> = function (props) {
  const {} = props;

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className={Style.navItems}>
          <div className={Style.navButton}>
            <IconPrev className={Style.navIcon} />
          </div>

          <div className={Style.navButton}>
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
