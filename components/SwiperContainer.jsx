'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Pagination,
  Scrollbar,
  Autoplay,
  A11y,
  EffectCards,
  Controller,
  Navigation,
} from 'swiper';
import RecipeCardSmall from './RecipeCardSmall';
import RecipeCardSmallSkeleton from './RecipeCardSmallSkeleton';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';

// import 'swiper/effect-fade.min.css';
// import 'swiper/css/scrollbar';

export default function SwiperContainer(props) {
  // SwiperCore.use([Pagination]);

  const { cards, title } = props;
  return (
    <>
      <h2 className="swiperName">{title}:</h2>
      <div className="swiperContainer">
        <Swiper
          modules={[
            Pagination,
            Scrollbar,
            Autoplay,
            A11y,
            Controller,
            EffectCards,
            Navigation,
          ]}
          // navigation
          loop
          // effect="cards"
          // centeredSlides
          grabCursor
          spaceBetween={8}
          // rewind
          // initialSlide={1}
          // autoHeight
          // Autoplay
          // scrollbar={{ draggable: true }}
          height={330}
          pagination={{
            clickable: true,
          }}
          slidesPerView={1}
          breakpoints={{
            360: {
              spaceBetween: 8,
              slidesPerView: 2,
            },
            600: {
              spaceBetween: 8,
              slidesPerView: 3,
            },
            1200: {
              spaceBetween: 16,
              slidesPerView: 4,
            },
            1800: {
              slidesPerView: 4,
              spaceBetween: 28,
            },
          }}
        >
          {cards === 'skeleton' || cards.length < 1 ? (
            <>
              <SwiperSlide>
                <RecipeCardSmallSkeleton />
              </SwiperSlide>
              <SwiperSlide>
                <RecipeCardSmallSkeleton />
              </SwiperSlide>
              <SwiperSlide>
                <RecipeCardSmallSkeleton />
              </SwiperSlide>
              <SwiperSlide>
                <RecipeCardSmallSkeleton />
              </SwiperSlide>
            </>
          ) : (
            cards?.map((card) => {
              const slug =
                typeof card.slug === 'string'
                  ? card.slug
                  : card.slug?.slugCurrent;

              return (
                <SwiperSlide key={slug}>
                  <RecipeCardSmall
                    name={card.name}
                    slug={slug}
                    category={card.category}
                    model={false}
                  />
                </SwiperSlide>
              );
            })
          )}
        </Swiper>
      </div>
    </>
  );
}
