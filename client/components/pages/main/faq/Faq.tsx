import * as React from "react";
import Style from "@components/pages/main/faq/Faq.module.scss";
import Item from "@components/pages/main/faq/Item";
import { Swiper as SwiperClass } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import Interface from "@components/pages/main/faq/Interface";

export const Faq: React.FC = function () {
  const [swiper, setSwiper] = React.useState<SwiperClass>();
  const questions = [
    {
      title: "Авторизуйся чтобы играть",
      content:
        "Чтобы играть и выигрывать, тебе понадобиться авторизоваться. Зарегистироваться(ссылка) или войти(ссылка).",
    },

    {
      title: "Как играть?",
      content: "Регнись. Залей бабла. Выигрывай.",
    },

    {
      title: "Оплата",
      content: "Оплачивай через робокассу.",
    },

    {
      title: "Доставка",
      content: "Доставка по России",
    },

    {
      title: "Заработать",
      content: "Хочешь тоже заработать на лохах. Тогда тебе сюда!!!",
    },

    {
      title: "Благодарность",
      content:
        "Если вы хотите выразить авторам проекта свою благодарность, вы можете отправить донат на патреон(ссылка). Спасибо что вы с нами.",
    },
  ];

  const slides = [];

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    slides.push(
      <SwiperSlide key={`main-page-faq-slide-${i}`}>
        <Item question={question} />
      </SwiperSlide>
    );
  }

  const [swiperIndex, setSwiperIndex] = React.useState(0);

  return (
    <div>
      <h2 className={Style.header}>FAQ</h2>

      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        // autoplay={{ delay: 2000 }}
        speed={1000}
        autoHeight={true}
        onAfterInit={(swiper) => {
          setSwiper(swiper);
        }}
        onSlideChange={(swiper) => {
          setSwiperIndex(swiper.realIndex);
        }}
      >
        {slides}
      </Swiper>

      {swiper && (
        <div className={Style.faq__interface}>
          <Interface
            nextHandler={() => {
              swiper?.slideNext();
            }}
            prevHandler={() => {
              swiper?.slidePrev();
            }}
            selectHandler={(index: number) => {
              swiper?.slideTo(index + 1, 1000);
            }}
            questions={questions}
            selectedQuestionIndex={swiperIndex}
          />
        </div>
      )}
    </div>
  );
};

export default Faq;
