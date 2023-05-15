'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';

import {
  getRecipes,
  paramPageValidator,
  paramCategoryValidator,
  isFavorite,
} from './utilities';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('strona') || 1;

  const search = searchParams.get('szukaj');

  // This will not be logged on the server when using static rendering
  console.log(search);

  const pathPre = 'recipes?strona=1';
  const pathNext = 'recipes?strona=2';

  useEffect(() => {
    // Do something here...
    console.log('zmieniono path');
  }, [searchParams]);

  return (
    // <>
    //   Search: {search}
    //   <button
    //     className="paginationButton"
    //     type="button"
    //     // href="/recipes?page=1"
    //     // onClick={goNext}
    //     // disabled={isFetching || !data?.showNextUrlLink}
    //     onClick={() => router.push(pathPre)}
    //   >
    //     <span className="visuallyHidden">Poprzednia strona</span>
    //     <svg
    //       className="paginationIcon"
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 9.9 16.81"
    //       aria-hidden="true"
    //       focusable="false"
    //     >
    //       <path d="M9.9,15.32,3,8.4,9.9,1.49,8.41,0,0,8.4l8.41,8.41Z" />
    //     </svg>
    //   </button>
    //   <button
    //     className="paginationButton"
    //     type="button"
    //     // href="/recipes?page=1"
    //     // onClick={goNext}
    //     // disabled={isFetching || !data?.showNextUrlLink}
    //     onClick={() => router.push(pathNext)}
    //   >
    //     <span className="visuallyHidden">Następna strona</span>
    //     <svg
    //       className="paginationIcon"
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 9.9 16.81"
    //       aria-hidden="true"
    //       focusable="false"
    //     >
    //       <path d="M0,1.49,6.92,8.41,0,15.32l1.49,1.49L9.9,8.41,1.49,0Z" />
    //     </svg>
    //   </button>
    // </>
    page
  );
}
