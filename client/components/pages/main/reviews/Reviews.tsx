import * as React from "react";
import Form from "@components/pages/main/reviews/Form";
import cn from "classnames";
import Styles from "@components/pages/main/reviews/Form.module.scss";
import { useDispatch } from "react-redux";
import { load } from "@redux/actions/Reviews";
import Item from "@components/pages/main/reviews/Item";

interface IProps {
  reviews: Record<any, any>[];
}

export const Reviews: React.FC<IProps> = function (props) {
  const { reviews } = props;
  const dispatch = useDispatch();
  const [isLoadingNewReviews, setIsLoadingNewReviews] = React.useState(false);
  const items = [];

  for (const i in reviews) {
    items.push(
      <Item
        className={Styles.reviews__item}
        review={reviews[i]}
        key={`review-item-${i}`}
      />
    );
  }

  function loadMore() {
    setIsLoadingNewReviews(true);
    dispatch(
      load({
        data: {
          page: 2,
        },
        callback() {
          setIsLoadingNewReviews(false);
        },
      })
    );
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center mb-4">
        <img
          className={Styles.headerImage}
          src="/images/pages/main/reviews.png"
          alt=""
        />
        <div>
          <h2 className={cn([Styles.header, "mb-0"])}> Отзывы </h2>
        </div>
      </div>

      <button
        className={cn([Styles.button, "w-100", "mb-3"])}
        type={"button"}
        onClick={loadMore}
        disabled={isLoadingNewReviews}
      >
        Больше отзывов
      </button>

      <div
        className={cn([
          Styles.reviewsContainer,
          "custom-scrollbar",
          "pe-3",
          "mb-3",
        ])}
      >
        {items}
      </div>

      <Form />
    </div>
  );
};

export default Reviews;
