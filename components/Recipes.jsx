'use client';

import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState, useRef, useEffect } from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';
import classNames from 'classnames';
import useSWR from 'swr';
import RecipeCardSmallSkeleton from './RecipeCardSmallSkeleton';
import RecipeCardSmall from './RecipeCardSmall';
import getRecipes from '../lib/getRecipes';
import {
  categoryValidator,
  categoryArray,
} from '../lib/validators/categoryValidator';
import { pageValidator } from '../lib/validators/pageValidator';

import {
  isFavorite,
  categoryHeaderColorPicker,
  categorySvgPicker,
} from './RecipeUtilities';

export default function Recipes() {
  // const fetcher = (url) => fetch(url).then((res) => res.json());

  const searchParams = useSearchParams();
  const paramPage = pageValidator(searchParams.get('strona'))
    ? parseInt(searchParams.get('strona'), 10)
    : 1;
  const paramSearch = searchParams.get('szukaj'); // zaciaganie paramatre search z linka
  const paramCategory = categoryValidator(searchParams.get('kategoria'))
    ? searchParams.get('kategoria')
    : null;

  const { data, isLoading, isFetching } = useSWR(
    [`/api/recipes`, paramPage, paramSearch, paramCategory, '', 24],
    getRecipes
  );

  const [inputPage, setInputPage] = useState(paramPage);
  const [inputCategory, setInputCategory] = useState(paramCategory);
  const inputRefFocus = useRef(null); // referencja zeby odwolac sie do inputu i zabrac mu focus
  const router = useRouter();

  const validateAndNavigate = (input) => {
    if (
      // data?.hasFilters &&
      paramSearch !== null &&
      pageValidator(input) &&
      input <= data?.numOfPages
    ) {
      if (categoryValidator(inputCategory)) {
        router.push(
          `przepisy?kategoria=${inputCategory}&szukaj=${paramSearch}&strona=${input}`
        );
      } else {
        router.push(`przepisy?szukaj=${paramSearch}&strona=${input}`);
      }

      inputRefFocus.current.blur(); // zabranie focus inputowi searchbara
    } else if (
      // !data?.hasFilters &&
      paramSearch === null &&
      pageValidator(input) &&
      input <= data?.numOfPages
    ) {
      router.push(`przepisy?strona=${input}`);
      inputRefFocus.current.blur(); // zabranie focus inputowi searchbara
    }
  };

  const goNext = () => {
    // TODO dodac param "kategoria"
    if (data?.showNextUrlLink) {
      setInputPage(data.pageNumber + 1);
      if (data?.hasFilters) {
        router.push(
          `przepisy?szukaj=${paramSearch}&strona=${data.pageNumber + 1}`
        );
      } else if (!data?.hasFilters) {
        router.push(`przepisy?strona=${data.pageNumber + 1}`);
      }
    }
  };
  const goPrevious = () => {
    // TODO dodac param "kategoria"
    if (data?.showPreviousUrlLink) {
      if (data?.hasFilters) {
        router.push(
          `przepisy?szukaj=${paramSearch}&strona=${data.pageNumber - 1}`
        );
      } else if (!data?.hasFilters) {
        router.push(`przepisy?strona=${data.pageNumber - 1}`);
      }
    }
  };

  const validateAndNavigate2 = (category) => {
    if (
      paramSearch !== null &&
      paramSearch !== undefined &&
      paramSearch !== ''
    ) {
      if (categoryValidator(category)) {
        setInputCategory(category);
        router.push(`przepisy?kategoria=${category}&szukaj=${paramSearch}`);
      } else {
        setInputCategory('');
        router.push(`przepisy?szukaj=${paramSearch}`);
      }
    } else if (categoryValidator(category)) {
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
  }, [paramPage]);

  TopBarProgress.config({
    barColors: {
      0: '#ffce06',
    },
    barThickness: 8,
    shadowBlur: 0,
  });

  let paginationInputTotalPages = 0;
  if (isLoading) {
    paginationInputTotalPages = (
      <Skeleton
        count={1}
        width="1.8em"
        height="1.8em"
        enableAnimation={false}
      />
    );
  } else if (data?.numOfPages) {
    paginationInputTotalPages = data?.numOfPages;
  } else {
    paginationInputTotalPages = 0;
  }

  const pathname = usePathname();

  return (
    <>
      {(isFetching || isLoading) && <TopBarProgress />}

      <section className="recipesContainer">
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
                className="RCcategoryLink active"
                href={`/przepisy?kategoria=${inputCategory}`}
              >
                {inputCategory}
              </Link>
            </>
          ) : (
            <Link
              // className="RCcategoryLink"
              className={
                pathname === '/przepisy'
                  ? 'RCcategoryLink active'
                  : 'RCcategoryLink'
              }
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
            {isCategoryListVisible ? 'ukryj kategorie' : 'pokaż kategorie'}
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
          {/* //!! czy to w ogole jest potrzebne?????? */}

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
            data?.results?.tiles.map((recipe) => (
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
          <div className="paginationPrev">
            <button
              className="paginationButton"
              type="button"
              onClick={goPrevious}
              disabled={isFetching || !data?.showPreviousUrlLink}
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
          </div>

          <div className="paginationInput">
            <form onSubmit={onSubmitPaginationInput}>
              <input
                className="paginationSearchInput"
                type="number"
                autoComplete="off"
                disabled={!!(isLoading || isFetching)}
                value={inputPage}
                onChange={(event) => setInputPage(event.target.value)}
                ref={inputRefFocus}
              />
              <span className="visuallyHidden" htmlFor="paginationSearchInput">
                Przejdź na stronę:
              </span>
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
              {paginationInputTotalPages}
            </span>
          </div>

          <div className="paginationNext">
            <button
              className="paginationButton"
              type="button"
              onClick={goNext}
              disabled={isFetching || !data?.showNextUrlLink}
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
          </div>
        </div>
      </section>
    </>
  );
}
