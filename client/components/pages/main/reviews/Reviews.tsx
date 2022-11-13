import * as React from "react";
import cn from "classnames";
import Style from "@components/pages/main/reviews/Reviews.module.scss";
import ReviewItem from "@components/pages/main/reviews/ReviewItem";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface IProps {
  reviews: Record<any, any>[];
}

export const Reviews: React.FC<IProps> = function (props) {
  const { reviews } = props;
  const slides = [];

  for (let i = 0; i < reviews.length; i++) {
    reviews[i].rate = Math.floor((i+1) / 2);
    slides.push(
      <SwiperSlide key={`main-page-slide-${i}`}>
        <ReviewItem review={reviews[i]} key={`review-item-${i}`} />
      </SwiperSlide>
    );
  }

  return (
    <div>
      <div
        className={cn([
          Style.headerContainer,
          "d-flex align-items-center justify-content-center mb-4",
        ])}
      >
        <div>
          <h2 className={cn([Style.header, "mb-0"])}>Отзывы</h2>
        </div>
      </div>

      <Swiper
        spaceBetween={40}
        slidesPerView={5}
        loop={true}
        autoplay={{ delay: 2000 }}
        speed={1000}
        breakpoints={{
          "1200": {
            autoplay: {
              delay: 3000,
            },
          },
        }}
      >
        {slides}
      </Swiper>
    </div>
  );
};

export default Reviews;
