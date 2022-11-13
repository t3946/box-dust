import * as React from "react";
import Solid from "@components/common/icons/star-sharp-half/Solid";
import Style from "@components/pages/main/reviews/Rating.module.scss";
import cn from "classnames";

export interface IProps {
  rate: number;
}

export const Rating: React.FC<IProps> = function (props) {
  const { rate } = props;
  const starItems = [];
  const maxRate = 5;

  for (let i = 1; i <= maxRate; i++) {
    starItems.push(
      <div
        className={cn(Style.star, { [Style.star_theme_opacity]: rate < i })}
        key={`rating-star-${i}`}
      >
        <Solid />
      </div>
    );
  }

  return <div className={Style.rating}>{starItems}</div>;
};

export default Rating;
