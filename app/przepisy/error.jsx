'use client';

import Link from 'next/link';
import { useState } from 'react';
import RecipeCardSmallSkeleton from '../../components/RecipeCardSmallSkeleton';

export default function Error({ reset }) {
  const [isFetching, setIsFetching] = useState(true);
  setTimeout(() => {
    setIsFetching(false);
  }, 5000);

  return (
    <>
      {isFetching && (
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
      )}
      <div className="RC">
        <p className="RCcategory RCcategoryPadding">
          <span className="RCcategorySeparator">{'>'}</span>
          <span className="RCcategoryLink active">
            błąd-wczytywania-przepisów
          </span>
        </p>
      </div>
      <div className="notFoundContainer">
        <h1 className="notFoundTitle">
          niestety, wystąpiły problemy z wczytywaniem przepisów
        </h1>
        <div className="notFoundButtons">
          <button
            className="notFoundButton"
            type="button"
            onClick={() => reset()}
          >
            spróbuj ponownie
          </button>
          {/* <span>lub</span> */}
          <Link className="notFoundButton primary" href="/">
            wróć na stronę główną
          </Link>
        </div>
      </div>
    </>
  );
}
