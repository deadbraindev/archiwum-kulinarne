'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { useState, useRef, useEffect } from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';
// import NextNProgress from 'nextjs-progressbar';

import classNames from 'classnames';
import RecipeCardSmallSkeleton from '../../components/RecipeCardSmallSkeleton';
import RecipeCardSmall from '../../components/RecipeCardSmall';
import {
  getRecipes,
  paramPageValidator,
  paramCategoryValidator,
  isFavorite,
  categoryArray,
  categoryHeaderColorPicker,
  categorySvgPicker,
} from '../../components/RecipeUtilities';

export default function Recipes() {
  const searchParams = useSearchParams();
  const isBrowser = () => typeof window !== 'undefined'; // The approach recommended by Next.js
  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0 });
  }

  const paramPage = paramPageValidator(searchParams.get('strona'))
    ? parseInt(searchParams.get('strona'), 10)
    : 1;
  const paramSearch = searchParams.get('szukaj'); // zaciaganie paramatre search z linka
  // console.log(paramSearch);
  const paramCategory = paramCategoryValidator(searchParams.get('kategoria'))
    ? searchParams.get('kategoria')
    : null;

  // # # # # # //
  // REACT QUERY
  const { data, status, isFetching, isLoading } = useQuery(
    ['recipes', paramPage, paramSearch, paramCategory],
    () => getRecipes(paramPage, paramSearch, paramCategory),
    {
      keepPreviousData: true,
      retry: 2,
      refetchOnWindowFocus: false,
    }
  );
  // REACT QUERY
  // # # # # # //

  const [inputPage, setInputPage] = useState(paramPage);
  const [inputCategory, setInputCategory] = useState(paramCategory);
  const inputRefFocus = useRef(null); // referencja zeby odwolac sie do inputu i zabrac mu focus
  const router = useRouter();

  const validateAndNavigate = (input) => {
    if (
      // data?.hasFilters &&
      paramSearch !== null &&
      paramPageValidator(input) &&
      input <= data?.numOfPages
    ) {
      if (paramCategoryValidator(inputCategory)) {
        // navigate({
        //   search: `?kategoria=${inputCategory}&szukaj=${paramSearch}&strona=${input}`,
        // });
        router.push(
          `przepisy?kategoria=${inputCategory}&szukaj=${paramSearch}&strona=${input}`
        );
      } else {
        // navigate({
        //   search: `?szukaj=${paramSearch}&strona=${input}`,
        // });
        router.push(`przepisy?szukaj=${paramSearch}&strona=${input}`);
      }

      inputRefFocus.current.blur(); // zabranie focus inputowi searchbara
    } else if (
      // !data?.hasFilters &&
      paramSearch === null &&
      paramPageValidator(input) &&
      input <= data?.numOfPages
    ) {
      router.push(`przepisy?strona=${input}`);
      // navigate({
      //   search: `?strona=${input}`,
      // });
      inputRefFocus.current.blur(); // zabranie focus inputowi searchbara
    }
  };
  const validateAndNavigate2 = (category) => {
    if (paramCategoryValidator(category)) {
      setInputCategory(category);
      router.push(`przepisy?kategoria=${category}`);
    } else {
      setInputCategory('');
      router.push(`przepisy`);
    }
    inputRefFocus.current.blur(); // zabranie focus inputowi searchbara
  };
  const clearCategory = () => {
    setInputCategory(null);
  };
  const [isCategoryListVisible, setIsCategoryListVisible] = useState(false);
  const categoryButtonDynamicClasses = classNames(
    'categoryButton',
    isCategoryListVisible ? '' : 'hidden'
  );

  const showOrHideCategoryList = () => {
    if (isCategoryListVisible) setIsCategoryListVisible(false);
    else setIsCategoryListVisible(true);
  };

  const changeCategory = (category) => {
    setInputCategory(category);
    setIsCategoryListVisible(false);
  };
  const onSubmitPaginationInput = (event) => {
    event.preventDefault(); // brak odswiezania strony przy submicie
    validateAndNavigate(inputPage);
  };
  useEffect(() => {
    setInputPage(paramPage);
    scrollToTop();
  }, [paramPage]);

  TopBarProgress.config({
    barColors: {
      0: '#ffce06',
    },
    barThickness: 8,
    shadowBlur: 0,
  });
  const pathname = usePathname();
  console.log(pathname);

  return (
    <main>
      {/* {isFetching && <TopBarProgress />} */}
      {isFetching && <TopBarProgress />}
      {/* <NextNProgress /> */}

      <div className="recipesContainer">
        {/* <div>recipes page {}</div> */}
        <p className="RCcategory">
          <span className="RCcategorySeparator">{'>'}</span>
          {inputCategory ? (
            <>
              <Link
                className="RCcategoryLink"
                onClick={clearCategory}
                href="/przepisy"
              >
                przepisy
              </Link>
              <span className="RCcategorySeparator">{'>'}</span>
              <Link
                className="RCcategoryLink"
                href={`/przepisy?kategoria=${inputCategory}`}
              >
                {inputCategory}
              </Link>
            </>
          ) : (
            <Link
              className="RCcategoryLink"
              onClick={clearCategory}
              href="/przepisy"
            >
              przepisy
            </Link>
          )}
        </p>

        <div className="categoryContainer">
          <button
            type="button"
            className="categoryVisibilityButton"
            onClick={showOrHideCategoryList}
          >
            {/* <span className={isCategoryListVisible ? "arrow up" : }>&#9660;</span> */}
            {isCategoryListVisible ? 'ukryj kategorie' : 'pokaż kategorie'}
            {/* {"kategorie"} */}

            {/* <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.81 9.9"><path d="M15.32,0,8.4,6.92,1.49,0,0,1.49,8.4,9.9l8.41-8.41Z"/></svg> */}
          </button>

          {inputCategory !== '' && inputCategory !== null ? (
            <button
              type="button"
              className="categoryClear"
              onClick={() => {
                validateAndNavigate2('');
              }}
            >
              <svg viewBox="0 0 16.81 16.81" xmlns="http://www.w3.org/2000/svg">
                <path d="m16.81 15.32-6.92-6.92 6.92-6.91-1.49-1.49-6.92 6.91-6.91-6.91-1.49 1.49 6.91 6.91-6.91 6.92 1.49 1.49 6.91-6.92 6.92 6.92z" />
              </svg>
            </button>
          ) : null}

          {categoryArray.sort().map((category) => (
            <button
              type="button"
              key={category}
              // path={{ pathname: `?kategoria=${category}` }}
              className={`${
                inputCategory === category
                  ? `categoryButton active`
                  : categoryButtonDynamicClasses
              }`}
              onClick={() => {
                changeCategory(category);
                validateAndNavigate2(category);
              }}
            >
              <div
                className={`categoryIcon ${categoryHeaderColorPicker(
                  category
                )}`}
              >
                {categorySvgPicker(category)}
              </div>
              <span>{category}</span>
            </button>
          ))}
        </div>
        <div className="cardContainer">
          {/* //!zrobic ladnie blad */}
          {status === 'error' && <h1>Error fetching data!</h1>}
          {/* {isFetching && <TopBarProgress />} */}
          {isLoading ? (
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
          ) : (
            status === 'success' &&
            data.results?.tiles.map((recipe) => (
              <RecipeCardSmall
                name={recipe.value.name}
                slug={recipe.value.slug.slugCurrent}
                key={recipe.value.slug.slugCurrent}
                category={recipe.value?.category}
                favorite={isFavorite(recipe.value.slug.slugCurrent)}
              />
            ))
          )}
        </div>

        <div className="pagination">
          <Link
            className="paginationPrev"
            href={`/przepisy?strona=${paramPage - 1}`}
          >
            <button
              className="paginationButton"
              type="button"
              // href="/recipes?page=1"
              // onClick={goNext}
              disabled={isFetching || !data?.showPreviousUrlLink}
              // onClick={() => router.push('/dashboard')}
            >
              <span className="visuallyHidden">Poprzednia strona</span>
              <svg
                className="paginationIcon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 9.9 16.81"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M9.9,15.32,3,8.4,9.9,1.49,8.41,0,0,8.4l8.41,8.41Z" />
              </svg>
            </button>
          </Link>

          <div className="paginationInput">
            <form onSubmit={onSubmitPaginationInput}>
              {/* {isFetching || status === 'loading' ? (
                <Skeleton
                  count={1}
                  width="1.8em"
                  height="1.8em"
                  // baseColor="#bababa"
                  enableAnimation={false}
                />
              ) : ( */}
              <input
                className="paginationSearchInput"
                type="number"
                autoComplete="off"
                disabled={!!(status === 'loading' || status === 'error')}
                value={
                  status === 'loading' || status === 'error' ? '0' : inputPage
                }
                onChange={(event) => setInputPage(event.target.value)}
                ref={inputRefFocus}
              />
              {/* <label className="visuallyHidden" htmlFor="paginationSearchInput">
                Przejdź na stronę:
              </label> */}
              {/* )} */}
            </form>
            <span className="visuallyHidden hint" aria-hidden="true">
              Naciśnij klawisz Enter, aby przejść do wybranej strony
            </span>
            <span className="visuallyHidden" aria-hidden="true">
              {`Strona ${inputPage}`}
            </span>
            <span className="paginationInputSeparator">z</span>
            <span className="paginationInputTotalPages">
              {/* {isFetching || status === 'loading' ? (
                <Skeleton
                  count={1}
                  width="1.8em"
                  height="1.8em"
                  // baseColor="#bababa"
                  enableAnimation={false}
                />
              ) : data?.numOfPages ? (
                data.numOfPages
              ) : (
                '0'
              )} */}
              {data?.numOfPages ? data.numOfPages : '0'}
            </span>
          </div>

          <Link
            className="paginationNext"
            href={`/przepisy?strona=${paramPage + 1}`}
          >
            <button
              className="paginationButton"
              type="button"
              // href="/recipes?page=1"
              // onClick={goNext}
              disabled={isFetching || !data?.showNextUrlLink}
              // onClick={() => router.push('/dashboard')}
            >
              <span className="visuallyHidden">Następna strona</span>
              <svg
                className="paginationIcon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 9.9 16.81"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M0,1.49,6.92,8.41,0,15.32l1.49,1.49L9.9,8.41,1.49,0Z" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
