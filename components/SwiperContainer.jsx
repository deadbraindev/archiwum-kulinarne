'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
// import RecipeCardSmall from './RecipeCardSmall';
import RecipeCardSmall from './RecipeCardSmall';
import RecipeCardSmallSkeleton from './RecipeCardSmallSkeleton';

import { isFavorite } from './RecipeUtilities';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

export default function SwiperContainer(props) {
  SwiperCore.use([Pagination]);

  const { cards } = props;
  // console.log(cards);
  const [isFavoriteArray, setIsFavoriteArray] = useState([]);
  useEffect(() => {
    const initialArray = [];
    if (
      typeof window !== 'undefined' &&
      window.localStorage &&
      typeof cards !== 'string'
    ) {
      cards?.map((card) => initialArray.push(isFavorite(card.slug)));
    }
    setIsFavoriteArray(initialArray);
  }, []);

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
      {/* {true ? ( */}

      {cards === 'skeleton' ? (
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
        cards?.map((card, i) => {
          const slug =
            typeof card.slug === 'string' ? card.slug : card.slug.slugCurrent;

          return (
            <SwiperSlide key={slug}>
              <RecipeCardSmall
                name={card.name}
                slug={slug}
                // key={card.slug}
                category={card.category}
                model={false}
                favorite={isFavoriteArray[i]}
              />
            </SwiperSlide>
          );
        })
      )}
    </Swiper>
  );
}
