/* eslint-disable jsx-a11y/control-has-associated-label */

'use client';

import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState, useRef, useEffect } from 'react';
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
import { sortValidator } from '../lib/validators/sortValidator';

import {
  isFavorite,
  categoryHeaderColorPicker,
  categorySvgPicker,
} from './RecipeUtilities';

export default function Recipes() {
  const searchParams = useSearchParams();
  const paramPage = pageValidator(searchParams.get('strona'))
    ? parseInt(searchParams.get('strona'), 10)
    : 1;
  const paramSearch = searchParams.get('szukaj'); // zaciaganie paramatre search z linka
  const paramCategory = categoryValidator(searchParams.get('kategoria'))
    ? searchParams.get('kategoria')
    : null;
  const paramSort = sortValidator(searchParams.get('sortowanie'))
    ? searchParams.get('sortowanie')
    : null;

  const { data, isLoading, isFetching, error } = useSWR(
    [`/api/recipes`, paramPage, paramSearch, paramCategory, paramSort, 24],
    getRecipes
  );

  const [inputPage, setInputPage] = useState(paramPage);
  const [inputCategory, setInputCategory] = useState(paramCategory);
  const [inputSort, setInputSort] = useState(paramSort);

  const inputRefFocus = useRef(null); // referencja zeby odwolac sie do inputu i zabrac mu focus
  const router = useRouter();

  const validateAndNavigate = (input) => {
    if (
      paramSearch !== null &&
      pageValidator(input) &&
      input <= data?.numOfPages
    ) {
      if (categoryValidator(inputCategory)) {
        router.push(
          `przepisy?kategoria=${inputCategory}&szukaj=${paramSearch}&strona=${input}${
            sortValidator(inputSort) ? `&sortowanie=${inputSort}` : ''
          }`
        );
      } else {
        router.push(
          `przepisy?szukaj=${paramSearch}&strona=${input}${
            sortValidator(inputSort) ? `&sortowanie=${inputSort}` : ''
          }`
        );
      }

      inputRefFocus.current.blur(); // zabranie focus inputowi searchbara
    } else if (
      paramSearch === null &&
      pageValidator(input) &&
      input <= data?.numOfPages
    ) {
      router.push(
        `przepisy?strona=${input}${
          sortValidator(inputSort) ? `&sortowanie=${inputSort}` : ''
        }`
      );
      inputRefFocus.current.blur(); // zabranie focus inputowi searchbara
    }
  };

  const goNext = () => {
    if (data?.showNextUrlLink) {
      setInputPage(data.pageNumber + 1);
      if (data?.hasFilters) {
        router.push(
          `przepisy?${
            paramSearch !== null && paramSearch !== undefined
              ? `szukaj=${paramSearch}`
              : ''
          }${sortValidator(inputSort) ? `&sortowanie=${inputSort}` : ''}${
            categoryValidator(inputCategory)
              ? `&kategoria=${inputCategory}`
              : ''
          }&strona=${data.pageNumber + 1}`
        );
      } else if (!data?.hasFilters) {
        router.push(
          `przepisy?${
            sortValidator(inputSort) ? `sortowanie=${inputSort}` : ''
          }&strona=${data.pageNumber + 1}`
        );
      }
    }
  };
  const goPrevious = () => {
    if (data?.showPreviousUrlLink) {
      if (data?.hasFilters) {
        router.push(
          `przepisy?strona=${data.pageNumber - 1}${
            paramSearch !== null && paramSearch !== undefined
              ? `&szukaj=${paramSearch}`
              : ''
          }${sortValidator(inputSort) ? `&sortowanie=${inputSort}` : ''}${
            categoryValidator(inputCategory)
              ? `&kategoria=${inputCategory}`
              : ''
          }`
        );
      } else if (!data?.hasFilters) {
        router.push(
          `przepisy?${
            sortValidator(inputSort) ? `sortowanie=${inputSort}` : ''
          }&strona=${data.pageNumber - 1}`
        );
      }
    }
  };

  const validateAndNavigate2 = (category, sort) => {
    if (
      paramSearch !== null &&
      paramSearch !== undefined &&
      paramSearch !== ''
    ) {
      if (categoryValidator(category)) {
        setInputCategory(category);
        setInputSort(sort);

        router.push(
          `przepisy?kategoria=${category}&szukaj=${paramSearch}${
            sortValidator(sort) ? `&sortowanie=${sort}` : ''
          }`
        );
      } else {
        setInputCategory('');
        setInputSort(sort);

        router.push(
          `przepisy?szukaj=${paramSearch}${
            sortValidator(sort) ? `&sortowanie=${sort}` : ''
          }`
        );
      }
    } else if (categoryValidator(category)) {
      setInputCategory(category);
      setInputSort(sort);

      router.push(
        `przepisy?kategoria=${category}${
          sortValidator(sort) ? `&sortowanie=${sort}` : ''
        }`
      );
    } else {
      setInputCategory('');
      setInputSort(sort);
      router.push(
        `przepisy?${sortValidator(sort) ? `&sortowanie=${sort}` : ''}`
      );
    }
    inputRefFocus.current.blur(); // zabranie focus inputowi searchbara
  };
  const clearCategory = () => {
    setInputCategory('');
  };
  const clearSort = () => {
    setInputSort(null);
  };

  const [isCategoryListVisible, setIsCategoryListVisible] = useState(false);
  const [isSortListVisible, setIsSortListVisible] = useState(false);

  const categoryButtonDynamicClasses = classNames(
    'categoryButton',
    isCategoryListVisible ? '' : 'hidden'
  );
  const sortButtonDynamicClasses = classNames(
    'categoryButton',
    isSortListVisible ? '' : 'hidden'
  );

  const showOrHideCategoryList = () => {
    if (isCategoryListVisible) setIsCategoryListVisible(false);
    else setIsCategoryListVisible(true);
  };
  const showOrHideSortList = () => {
    if (isSortListVisible) setIsSortListVisible(false);
    else setIsSortListVisible(true);
  };

  const changeCategory = (category) => {
    setInputCategory(category);
    setIsCategoryListVisible(false);
    setIsSortListVisible(false);
  };
  const changeSort = (sort) => {
    setInputSort(sort);
    setIsSortListVisible(false);
  };
  const onSubmitPaginationInput = (event) => {
    event.preventDefault(); // brak odswiezania strony przy submicie
    validateAndNavigate(inputPage);
  };
  useEffect(() => {
    setInputPage(paramPage);
    setInputCategory(paramCategory);
    setInputSort(paramSort);
  }, [searchParams]);

  useEffect(() => {
    if (error !== undefined) {
      setIsSortListVisible(false);
      setIsCategoryListVisible(false);
    }
  }, [error]);

  const recipeNameToHumanName = (name, slug) => {
    const lastChar = slug.charAt(slug.length - 1);
    if (/\d/.test(lastChar)) {
      return `${name} #${lastChar}`;
    }
    return name;
  };

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
  const sortFullname = (sort) => {
    if (sort === 'az' || sort === null) return 'od A do Z';
    if (sort === 'za') return 'od Z do A';
    if (sort === 'no') return 'od najnowszych';
    if (sort === 'on') return 'od najstarszych';
    return '';
  };

  const pathname = usePathname();
  return (
    <section className="recipesContainer">
      <p className="RCcategory">
        <span className="RCcategorySeparator">{'>'}</span>
        {inputCategory ? (
          <>
            <Link
              className="RCcategoryLink"
              onClick={() => {
                clearCategory();
                clearSort();
                setIsCategoryListVisible(false);
                setIsSortListVisible(false);
              }}
              href="/przepisy"
            >
              przepisy
            </Link>
            <span className="RCcategorySeparator">{'>'}</span>
            <Link
              className="RCcategoryLink active"
              onClick={() => {
                clearSort();
                setIsCategoryListVisible(false);
                setIsSortListVisible(false);
              }}
              href={`/przepisy?kategoria=${inputCategory}`}
            >
              {inputCategory}
            </Link>
          </>
        ) : (
          <Link
            className={
              pathname === '/przepisy'
                ? 'RCcategoryLink active'
                : 'RCcategoryLink'
            }
            onClick={() => {
              clearCategory();
              clearSort();
              setIsCategoryListVisible(false);
              setIsSortListVisible(false);
            }}
            href="/przepisy"
          >
            przepisy
          </Link>
        )}
      </p>
      <div className="filtersContainer">
        <div className="categoryContainer">
          <button
            type="button"
            className="categoryVisibilityButton"
            onClick={showOrHideCategoryList}
          >
            {inputCategory ? (
              <div className="categoryButton list active">
                <div
                  className={`categoryIcon ${categoryHeaderColorPicker(
                    inputCategory
                  )}`}
                >
                  {categorySvgPicker(inputCategory)}
                </div>
                <span>{inputCategory}</span>
              </div>
            ) : (
              <span className="categoryListTitle">wybierz kategorię</span>
            )}
            <svg
              className={
                isCategoryListVisible ? 'listArrow closed' : 'listArrow open'
              }
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 9.9 16.81"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M0,1.49,6.92,8.41,0,15.32l1.49,1.49L9.9,8.41,1.49,0Z" />
            </svg>
          </button>

          {inputCategory !== '' && inputCategory !== null ? (
            <button
              type="button"
              className="categoryClear"
              onClick={() => {
                setIsCategoryListVisible(false);
                validateAndNavigate2('', inputSort);
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
                  ? `categoryButton hidden`
                  : categoryButtonDynamicClasses
              }`}
              onClick={() => {
                changeCategory(category);
                validateAndNavigate2(category, inputSort);
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
        <div className="sortContainer">
          <button
            type="button"
            className="categoryVisibilityButton"
            onClick={showOrHideSortList}
          >
            <span className="categoryListTitle">
              {'sortowanie: '}
              <span style={{ fontWeight: 'normal' }}>
                {sortFullname(inputSort)}
              </span>
            </span>
            <svg
              className={
                isSortListVisible ? 'listArrow closed' : 'listArrow open'
              }
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 9.9 16.81"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M0,1.49,6.92,8.41,0,15.32l1.49,1.49L9.9,8.41,1.49,0Z" />
            </svg>
          </button>
          {inputSort !== null && (
            <button
              type="button"
              className={sortButtonDynamicClasses}
              onClick={() => {
                changeSort(null);
                validateAndNavigate2(inputCategory, null);
              }}
            >
              <span className="sortButtonTitle">od A do Z</span>
            </button>
          )}

          {inputSort !== 'za' && (
            <button
              type="button"
              className={sortButtonDynamicClasses}
              onClick={() => {
                changeSort('za');
                validateAndNavigate2(inputCategory, 'za');
              }}
            >
              <span className="sortButtonTitle">od Z do A</span>
            </button>
          )}

          {inputSort !== 'no' && (
            <button
              type="button"
              className={sortButtonDynamicClasses}
              onClick={() => {
                changeSort('no');
                validateAndNavigate2(inputCategory, 'no');
              }}
            >
              <span className="sortButtonTitle">najnowsze</span>
            </button>
          )}

          {inputSort !== 'on' && (
            <button
              type="button"
              className={sortButtonDynamicClasses}
              onClick={() => {
                changeSort('on');
                validateAndNavigate2(inputCategory, 'on');
              }}
            >
              <span className="sortButtonTitle">najstarsze</span>
            </button>
          )}

          {inputSort !== '' && inputSort !== null ? (
            <button
              type="button"
              className="categoryClear"
              onClick={() => {
                changeSort(null);
                validateAndNavigate2(inputCategory, null);
              }}
            >
              <svg viewBox="0 0 16.81 16.81" xmlns="http://www.w3.org/2000/svg">
                <path d="m16.81 15.32-6.92-6.92 6.92-6.91-1.49-1.49-6.92 6.91-6.91-6.91-1.49 1.49 6.91 6.91-6.91 6.92 1.49 1.49 6.91-6.92 6.92 6.92z" />
              </svg>
            </button>
          ) : null}
        </div>
        {paramSearch && (
          <div className="searchContainer">
            <div className="categoryVisibilityButton search">
              <span className="categoryListTitle">
                {'wyniki wyszukiwania dla: '}
                <span style={{ fontWeight: 'normal' }}>{paramSearch}</span>
              </span>
            </div>
          </div>
        )}

        {paramSearch || paramCategory || paramSort ? (
          <div className="filterResetContainer">
            <Link className="filterReset" href="/przepisy">
              resetuj filtry
            </Link>
          </div>
        ) : (
          //
          <div className="filterResetContainer" />
        )}
      </div>

      {error !== undefined && (
        <div className="notFoundContainer">
          <h1 className="notFoundTitle">błąd podczas wczytywania przepisów</h1>
          <div className="notFoundButtons">
            <Link className="notFoundButton" href="/">
              wróć na stronę główną
            </Link>
            {/* <span>lub</span> */}
            <Link className="notFoundButton primary" href="/losowy">
              przejdź do losowego przepisu
            </Link>
          </div>
        </div>
      )}
      {data?.success === false ? (
        <div className="notFoundContainer">
          <h1 className="notFoundTitle">
            brak przepisów spełniających filtry wyszukiwania
          </h1>
        </div>
      ) : null}
      <div className="cardContainer">
        {isLoading && error === undefined && (
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
        )}
        {!isLoading &&
          error === undefined &&
          data?.results?.tiles.map((recipe) => (
            <RecipeCardSmall
              // name={recipe.value.name}
              name={recipeNameToHumanName(
                recipe.value.name,
                recipe.value.slug.slugCurrent
              )}
              slug={recipe.value.slug.slugCurrent}
              key={recipe.value.slug.slugCurrent}
              category={recipe.value?.category}
              favorite={isFavorite(recipe.value.slug.slugCurrent)}
              star={
                (recipe.value.stages[0].ingredients.length +
                  recipe.value.slug.slugCurrent.length) %
                4
              }
            />
          ))}
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
  );
}
