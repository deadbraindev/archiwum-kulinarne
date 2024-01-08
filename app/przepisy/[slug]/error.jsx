'use client';

import Link from 'next/link';
import TopBarProgress from 'react-topbar-progress-indicator';

import { useState } from 'react';

TopBarProgress.config({
  barColors: {
    0: '#ffce06',
  },
  barThickness: 8,
  shadowBlur: 0,
});

export default function Error({ reset }) {
  const [isFetching, setIsFetching] = useState(true);
  setTimeout(() => {
    setIsFetching(false);
  }, 3000);

  return (
    <>
      {isFetching && <TopBarProgress />}
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
