'use client';

import { useEffect, useState } from 'react';
import RecipeCardSmall from '../../components/RecipeCardSmall';
import RecipeCardSmallSkeleton from '../../components/RecipeCardSmallSkeleton';
import { isFavorite } from '../../components/RecipeUtilities';

export default function Page() {
  const [localFavorite, setLocalFavorite] = useState([]);
  useEffect(() => {
    setLocalFavorite(JSON.parse(localStorage.getItem('favorites')));
  }, []);
  return (
    <div className="cardContainer">
      {localFavorite !== null || localFavorite?.length > 0 ? (
        localFavorite
          .toReversed()
          .map((recipe) => (
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
        </>
      )}
    </div>
  );
}
