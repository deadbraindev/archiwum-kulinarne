'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import RecipeCardSmall from './RecipeCardSmall';
import RecipeCardSmallSkeleton from './RecipeCardSmallSkeleton';
import { categoryValidator } from '../lib/validators/categoryValidator';
import { categoryHeaderColorPicker } from './RecipeUtilities';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

export default function SwiperContainer(props) {
  const { cards, title, category } = props;

  return (
    <>
      <h2
        className={
          categoryValidator(category)
            ? `swiperName ${categoryHeaderColorPicker(category)}`
            : 'swiperName'
        }
      >
        {title}:
      </h2>
      <div className="swiperContainer">
        <Swiper
          modules={[Pagination]}
          loop={!(cards.length < 5)}
          grabCursor
          spaceBetween={8}
          height={330}
          pagination={{
            clickable: true,
          }}
          centeredSlides
          initialSlide={1}
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
              // initialSlide: 2,
              spaceBetween: 16,
              slidesPerView: 4,
            },
            1800: {
              // initialSlide: 2,
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
