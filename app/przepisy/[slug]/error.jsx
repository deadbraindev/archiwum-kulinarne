'use client';

import Link from 'next/link';
import { useState } from 'react';
import RecipeCardSkeleton from '../../../components/RecipeCardSkeleton';

export default function Error({ reset }) {
  const [isFetching, setIsFetching] = useState(true);
  setTimeout(() => {
    setIsFetching(false);
  }, 4000);

  return (
    <>
      {isFetching && <RecipeCardSkeleton />}
      <div className="RC">
        <p className="RCcategory RCcategoryPadding">
          <span className="RCcategorySeparator">{'>'}</span>
          <Link className="RCcategoryLink" href="/przepisy">
            przepisy
          </Link>
          <span className="RCcategorySeparator">{'>'}</span>
          <span className="RCcategoryLink active">
            błąd-wczytywania-przepisu
          </span>
        </p>
      </div>
      <div className="notFoundContainer">
        <h1 className="notFoundTitle">
          niestety, wystąpiły problemy z wczytywaniem przepisu
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
