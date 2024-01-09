'use client';

import useSWR from 'swr';
import Link from 'next/link';
import RecipeCardSmallSkeleton from './RecipeCardSmallSkeleton';
import RecipeCardSmall from './RecipeCardSmall';
import getRecipes from '../lib/getRecipes';
import { isFavorite } from './RecipeUtilities';

export default function RecipesGrid(props) {
  const { size, category, sort, title } = props;

  const { data, isLoading } = useSWR(
    [`/api/recipes`, '1', '', category, sort, size],
    getRecipes
  );

  const recipeNameToHumanName = (name, slug) => {
    const lastChar = slug.charAt(slug.length - 1);
    if (/\d/.test(lastChar)) {
      return `${name} #${lastChar}`;
    }
    return name;
  };

  return (
    <section className="recipesContainer gridRecipes">
      <div className="recipesContainerHeader">
        <Link
          href={`/przepisy?sortowanie=${sort}${
            category ? `&kategoria=${category}` : ''
          }`}
          className="recipesContainerTitle"
        >
          {title}
        </Link>

        <Link
          href={`/przepisy?sortowanie=${sort}${
            category ? `&kategoria=${category}` : ''
          }`}
          className="paginationArrow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 9.9 16.81"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M0,1.49,6.92,8.41,0,15.32l1.49,1.49L9.9,8.41,1.49,0Z" />
          </svg>
        </Link>
      </div>

      <div className="cardContainer">
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
          data?.results?.tiles.map((recipe) => (
            <RecipeCardSmall
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
          ))
        )}
      </div>
    </section>
  );
}
