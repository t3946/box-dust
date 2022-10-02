import * as React from "react";
import Item from "@components/pages/main/history-line/Item";
import Styles from "@components/pages/main/history-line/HistoryLine.module.css";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Swiper as SwiperClass } from "swiper/types";
import { getLast } from "@redux/actions/PrizesHistory";

interface IProps {
  history: any;
}

export const HistoryLine: React.FC<IProps> = function (props) {
  const { history } = props;
  const slides = [];
  const dispatch = useDispatch();
  const [swiper, setSwiper] = useState<SwiperClass>();

  SwiperCore.use([Autoplay]);

  for (let i = 0; i < history.prizes.length; i++) {
    const prize = history.prizes[i];

    slides.push(
      <SwiperSlide className={Styles.slide} key={`main-page-slide-${i}`}>
        <Item item={prize} index={i} />
      </SwiperSlide>
    );
  }

  function addNewPrize() {
    dispatch(
      getLast({
        success() {
          swiper?.slideTo(1, 0, false);

          //swiper.slideTo haven't callback
          setTimeout(() => {
            swiper?.slideTo(0, 1000, true);
          }, 10);
        },
      })
    );
  }

  const UPDATE_FAKE_HISTORY_INTERVAL = 10_000;
  const autoUpdateHistoryInterval = setInterval(
    addNewPrize,
    UPDATE_FAKE_HISTORY_INTERVAL
  );

  useEffect(() => {
    return () => {
      clearInterval(autoUpdateHistoryInterval);
    };
  });

  return (
    <Swiper
      observer={true}
      freeMode={false}
      spaceBetween={12}
      slidesPerView={2}
      loop={false}
      autoplay={false}
      allowTouchMove={false}
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
      onAfterInit={(swiper) => setSwiper(swiper)}
    >
      {slides}
    </Swiper>
  );
};

export default HistoryLine;
