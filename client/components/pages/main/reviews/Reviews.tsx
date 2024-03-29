import * as React from "react";
import cn from "classnames";
import Style from "@components/pages/main/reviews/Reviews.module.scss";
import ReviewItem from "@components/pages/main/reviews/ReviewItem";
import { Swiper, SwiperSlide } from "swiper/react";
import Interface from "@components/pages/main/reviews/Interface";
import { Swiper as SwiperClass } from "swiper/types";

interface IProps {
  reviews: Record<any, any>[];
}

export const Reviews: React.FC<IProps> = function (props) {
  const { reviews } = props;
  const slides = [];
  const [swiper, setSwiper] = React.useState<SwiperClass>();

  for (let i = 0; i < reviews.length; i++) {
    slides.push(
      <SwiperSlide key={`main-page-slide-${i}`}>
        <ReviewItem review={reviews[i]} key={`review-item-${i}`} />
      </SwiperSlide>
    );
  }

  return (
    <div className={Style.reviews}>
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
        spaceBetween={24}
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
        onAfterInit={(swiper) => {
          setSwiper(swiper);
        }}
      >
        {slides}
      </Swiper>

      <div className={Style.reviews__interface}>
        <Interface
          nextHandler={() => {
            swiper?.slideNext();
          }}
          prevHandler={() => {
            swiper?.slidePrev();
          }}
        />
      </div>
    </div>
  );
};

export default Reviews;
