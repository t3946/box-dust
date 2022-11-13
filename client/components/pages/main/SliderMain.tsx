import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Styles from "@components/pages/main/SliderMain.module.scss";
import * as React from "react";
import cn from "classnames";

export const SliderMain: React.FC = function () {
  const slides = [];

  SwiperCore.use([Autoplay]);

  for (let i = 1; i <= 3; i++) {
    slides.push(
      <SwiperSlide
        className={Styles.slide}
        key={`main-page-slide-${i}`}
        style={{
          backgroundImage: `url(/images/pages/main/main-banner/slide${i}.png)`,
        }}
      >
        <div className={cn(Styles.slide__caption, Styles.slideText)}>
          <span>«Чёрная пятница»</span> <br />
          <span>
            каждую пятницу с 18:00 До 21:00 скидка 15% на все коробки!
          </span>
        </div>
      </SwiperSlide>
    );
  }

  return (
    <div>
      <Swiper
        spaceBetween={15}
        slidesPerView={1}
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

export default SliderMain;
