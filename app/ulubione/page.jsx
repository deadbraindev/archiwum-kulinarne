'use client';

import { useEffect, useState } from 'react';
import RecipeCardSmall from '../../components/RecipeCardSmall';
import RecipeCardSmallSkeleton from '../../components/RecipeCardSmallSkeleton';
// import Favorites from '../../components/Favorites';
import { isFavorite } from '../../components/RecipeUtilities';

// export const metadata = {
//   title: 'ulubione | archiwum kulinarne',
//   openGraph: {
//     title: 'ulubione',
//     url: '/ulubione',
//     images: [
//       {
//         url: 'https://archiwum-kulinarne.vercel.app/images/opengraph-img-1200-630.jpg',
//         width: 1200,
//         height: 630,
//       },
//     ],
//   },
// };

export default function Page() {
  const [localFavorite, setLocalFavorite] = useState(null);
  useEffect(() => {
    setLocalFavorite(JSON.parse(localStorage.getItem('favorites')));
  }, []);
  return (
    // <div className="recipesContainer">
    //   <h1 className="swiperName">ulubione przepisy:</h1>
    <div className="cardContainer">
      {localFavorite !== null ? (
        localFavorite.map((recipe) => (
          <RecipeCardSmall
            name={recipe.name}
            slug={recipe.slug}
            key={recipe.slug}
            category={recipe.category}
            favorite={isFavorite(recipe.slug)}
          />
        ))
      ) : (
        <>
          <RecipeCardSmallSkeleton />
          <RecipeCardSmallSkeleton />
          <RecipeCardSmallSkeleton />
          <RecipeCardSmallSkeleton />
          <RecipeCardSmallSkeleton />
          <RecipeCardSmallSkeleton />
          <RecipeCardSmallSkeleton />
          <RecipeCardSmallSkeleton />
          <RecipeCardSmallSkeleton />
          <RecipeCardSmallSkeleton />
          <RecipeCardSmallSkeleton />
          <RecipeCardSmallSkeleton />
          <RecipeCardSmallSkeleton />
          <RecipeCardSmallSkeleton />
          <RecipeCardSmallSkeleton />
          <RecipeCardSmallSkeleton />
        </>
      )}
    </div>
    // </div>
  );
}
