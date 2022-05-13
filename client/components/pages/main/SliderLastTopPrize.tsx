import SwiperCore, { Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Styles from "@components/pages/main/SliderLastTopPrize.module.scss";
import * as React from "react";

export const SliderLastTopPrize: React.FC = function () {
  const slides = [];
  SwiperCore.use([Autoplay, EffectFade]);
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
      autoplay={{ delay: 2000 }}
      speed={300}
      effect={"fade"}
      allowTouchMove={false}
    >
      {slides}
    </Swiper>
  );
};

export default SliderLastTopPrize;
