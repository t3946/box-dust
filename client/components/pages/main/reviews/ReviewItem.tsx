import * as React from "react";
import cn from "classnames";
import Style from "@components/pages/main/reviews/ReviewItem.module.scss";
import Rating from "@components/pages/main/reviews/Rating";

export interface IProps {
  review: Record<any, any>;
}

export const ReviewItem: React.FC<IProps> = function (props) {
  const { review } = props;

  return (
    <div className={Style.review}>
      <div className={cn(Style.container)}>
        <div className={"d-flex justify-content-center"}>
          <div className={cn(Style.avatarWrapper)}>
            <img src="/avatar1.png" alt="avatar" />
          </div>
        </div>

        <div className={cn(Style.userName, Style.container__userName)}>
          {review.user.name}
        </div>

        <div>
          <p className={cn(Style.text, "m-0")}>{review.text}</p>
        </div>

        <div className={"d-flex justify-content-center"}>
          <Rating rate={review.rate} />
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
