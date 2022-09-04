import * as React from "react";
import Styles from "@components/pages/box/catalog/ModalItem.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";
import { Navigation } from "swiper";
import AngleLeft from "@components/common/icons/angle-left/AngleLeft";
import AngleRight from "@components/common/icons/angle-right/AngleRight";
import balanceToString from "@utils/balanceToString";
import { Modal } from "react-bootstrap";
import PrizeModalStyles from "@components/pages/box/PrizeModal.module.scss";

export interface IProps {
  items: Record<any, any>[];
  handleClose: any;
  show: boolean;
  startFrom: number
}

export const ModalItem: React.FC<IProps> = function (props) {
  const { items, show, handleClose, startFrom } = props;
  const slides = [];
  const sliderSize = 800;
  const [activeSlide, setActiveSlide] = React.useState(0);

  for (let i = 0; i < items.length; i++) {
    slides.push(
      <SwiperSlide>
        <div className={Styles.slide}>
          <div className={cn(Styles.slide__imageWrapper, Styles.imageWrapper)}>
            <img
              className={cn(Styles.image, "user-drag-none", "user-select-none")}
              src={"/storage/" + items[i].image.name}
              alt={""}
            />
          </div>
        </div>
      </SwiperSlide>
    );
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered={true}
      contentClassName={PrizeModalStyles.container}
      dialogClassName={cn(PrizeModalStyles.dialog, Styles.dialog)}
      className={"overflow-hidden"}
    >
      <Modal.Body className={cn("overflow-hidden", "p-0")}>
        <div className={Styles.wrapper}>
          <Swiper
            onSwiper={(swiper) => {
              swiper.slideTo(startFrom, 0);
            }}
            loop={true}
            spaceBetween={0}
            width={sliderSize}
            navigation={{
              prevEl: "." + Styles.slider__navNext,
              nextEl: "." + Styles.slider__navPrev,
            }}
            modules={[Navigation]}
            className={Styles.slider}
            speed={800}
            onSlideChange={(e) => {
              setActiveSlide(e.realIndex);
            }}
          >
            {slides}

            <span
              className={cn(Styles.slider__navPrev, Styles.navigationButton)}
            >
              <AngleRight className={cn(Styles.navigationIcon)} />
            </span>

            <span
              className={cn(Styles.slider__navNext, Styles.navigationButton)}
            >
              <AngleLeft className={cn(Styles.navigationIcon)} />
            </span>

            <div className={cn(Styles.slider__info, Styles.itemInfo)}>
              <span className={Styles.title}>{items[activeSlide].name}</span>

              <span className={cn(Styles.price, "my-2")}>
                {balanceToString(items[activeSlide].list_price * 100)}
              </span>

              <span className={Styles.moreInfo}>подробнее</span>
            </div>
          </Swiper>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalItem;
