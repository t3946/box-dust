import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Styles from "@components/pages/main/SliderMain.module.scss";
import * as React from "react";

export const SliderMain: React.FC = function () {
  const slides = [];

  SwiperCore.use([Autoplay]);

  for (let i = 0; i < 5; i++) {
    slides.push(
      <SwiperSlide className={Styles.slide} key={`main-page-slide-${i}`}>
        Slide {i}
      </SwiperSlide>
    );
  }

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000 }}
      speed={1000}
    >
      {slides}
    </Swiper>
  );
};

export default SliderMain;
