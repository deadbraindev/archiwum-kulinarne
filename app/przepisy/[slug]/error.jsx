'use client';

import Link from 'next/link';
import TopBarProgress from 'react-topbar-progress-indicator';

import { useEffect, useState } from 'react';

TopBarProgress.config({
  barColors: {
    0: '#ffce06',
  },
  barThickness: 8,
  shadowBlur: 0,
});

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error);
  }, [error]);

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
          <Link className="RCcategoryLink" href="przepisy">
            przepisy
          </Link>
          <span className="RCcategorySeparator">{'>'}</span>
          <span className="RCcategoryLink">błąd</span>
        </p>
        <div className="RCheader skeletonLight">
          <Link href="/przepisy" className="RCbuttonPrev" type="button">
            <span className="visuallyHidden">Wróć do poprzedniej strony</span>
            <svg
              className="paginationIcon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 9.9 16.81"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M9.9,15.32,3,8.4,9.9,1.49,8.41,0,0,8.4l8.41,8.41Z" />
            </svg>
          </Link>
          <h1 className="RCname">błąd</h1>
        </div>
        <div className="RCstage">
          {/* {stage.title && <h3 className="RCstageTitle">{i+1}. {stage.title}</h3>} */}
          <div className="RCing">
            {/* <span className="notfound404">404</span> */}
            {/* <h4 className="RCstageIngredients">Składniki:</h4> */}
          </div>
          <div className="RCprep">
            <h2 className="RCstagePreparing">
              przykro mi, jest prolem z serwerem, spróbuj ponownie...
            </h2>
            <p className="RCpreparing">500 Internal Server Error</p>
            <button
              className=""
              type="button"
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
            >
              Try again
            </button>
            {/* <Link className="notfoundLink" href="/przepisy">
            wróć
          </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}
