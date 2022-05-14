import * as React from "react";
import Item from "@components/pages/main/history-line/Item";
import Styles from "@components/pages/main/history-line/HistoryLine.module.css";
import cn from "classnames";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface IProps {
  history: any;
}


export const HistoryLine: React.FC<IProps> = function (props) {
  const { history } = props;
  const items = [];
  const slides = [];

  SwiperCore.use([Autoplay]);

  for (let i = 0; i < history.prizes.length; i++) {
    const prize = history.prizes[i];

    slides.push(
      <SwiperSlide className={Styles.slide} key={`main-page-slide-${i}`}>
        <Item item={prize} />
      </SwiperSlide>
    );
  }

  return (
    <Swiper
      observer={true}
      freeMode={true}
      spaceBetween={12}
      slidesPerView={2}
      loop={true}
      autoplay={{ delay: 5000 }}
      breakpoints={{
        576: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 6,
          spaceBetween: 24,
        },
      }}
    >
      {slides}
    </Swiper>
  );
};

export default HistoryLine;
