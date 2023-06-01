'use client';

import TopBarProgress from 'react-topbar-progress-indicator';
import RecipeCardSmallSkeleton from '../../components/RecipeCardSmallSkeleton';

export default function Loading() {
  TopBarProgress.config({
    barColors: {
      0: '#ffce06',
    },
    barThickness: 8,
    shadowBlur: 0,
  });

  return (
    <div className="recipesContainer">
      <TopBarProgress />

      <p className="RCcategory">
        <span className="RCcategorySeparator">{'>'}</span>
        <span className="RCcategoryLink">przepisy</span>
      </p>

      <div className="categoryContainer">
        <button type="button" className="categoryVisibilityButton">
          pokaż kategorie
        </button>
      </div>

      <div className="cardContainer">
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
      </div>
    </div>
  );
}
