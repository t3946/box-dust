import SwiperCore, {Autoplay} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import Styles from "@components/pages/main/SliderMain.module.scss";
import * as React from "react";

export const SliderMain: React.FC = function () {
  const slides = [];

  SwiperCore.use([Autoplay]);

  for (let i = 0; i < 5; i++) {
    slides.push(
      <SwiperSlide className={Styles.slide} key={`main-page-slide-${i}`}>
        <img
          src="/images/pages/main/main-banner/slide1.png"
          alt="slide"
          width={1000}
          height={300}
          className={Styles.slideImage}
        />
      </SwiperSlide>
    );
  }

  return (
    <div>
      <Swiper
        spaceBetween={15}
        slidesPerView={1}
        loop={true}
        autoplay={{delay: 2000}}
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

export default SliderMain;
