'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import RecipeCardSmall from './RecipeCardSmall';
import RecipeCardSmallSkeleton from './RecipeCardSmallSkeleton';
import { useFavoriteContext } from '../context/useFavoriteContext';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

export default function SwiperFavorite() {
  SwiperCore.use([Pagination]);
  const { state } = useFavoriteContext();

  const [favoriteCount, setFavoriteCount] = useState([]);

  useEffect(() => {
    setFavoriteCount(state);
  }, [state]);

  return (
    <Swiper
      // centeredSlides
      grabCursor
      spaceBetween={8}
      rewind
      // initialSlide={1}
      // autoHeight
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
          // initialSlide: 2,
        },
        1800: {
          // initialSlide: 2,

          slidesPerView: 4,
          spaceBetween: 28,
        },
      }}
    >
      {favoriteCount === [] ? (
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
          <SwiperSlide>
            <RecipeCardSmallSkeleton />
          </SwiperSlide>
        </>
      ) : (
        favoriteCount.map((card) => (
          <SwiperSlide key={card.slug}>
            <RecipeCardSmall
              name={card.name}
              slug={card.slug}
              category={card.category}
              model={false}
            />
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
}
