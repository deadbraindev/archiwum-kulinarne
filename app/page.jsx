'use client';

import Link from 'next/link';
import useSWR from 'swr';
import RecipesGrid from '../components/RecipesGrid';
import RecipeCardSmallHorizontal from '../components/RecipeCardHorizontalSmall';
import RecipeCardSmallHorizontalSkeleton from '../components/RecipeCardHorizontalSmallSkeleton';
import getRecipe from '../lib/getRecipe';

export default function Page() {
  const { data, isLoading } = useSWR([`/api/recipes`, 'daily'], getRecipe);

  return (
    <>
      {/* <div className="heroBackground" /> */}
      <div className="hero">
        <h1 className="heroTitle">
          zdigitalizowane rodzinne przepisy kulinarne
        </h1>
        <span className="heroText">
          stwórz swoje własne archiwum kulinarne - miejsce, gdzie smaki,
          historie i pasja stają się nieśmiertelne
        </span>
        <div className="heroButtons">
          <div className="heroButton secondary">dodaj przepis</div>
          <Link className="heroButton primary" href="/przepisy">
            zobacz przepisy
          </Link>
        </div>
      </div>

      <section className="recipesContainer recipesContainerHorizontal">
        <span className="recipesContainerTitle"> przepis dnia:</span>
        <div className="cardContainer">
          {isLoading ? (
            <>
              <RecipeCardSmallHorizontalSkeleton />
              <RecipeCardSmallHorizontalSkeleton />
            </>
          ) : (
            <>
              <RecipeCardSmallHorizontal
                name={data.name}
                slug={data.slug.slugCurrent}
                key={data.slug.slugCurrent}
                category={data.category}
                star={
                  (data.stages.items[0].ingredients.length +
                    data.slug.slugCurrent.length) %
                  4
                }
              />
              <RecipeCardSmallHorizontalSkeleton />
            </>
          )}
          {/* <div className="tagContainer">
            <Link href="/przepisy?kategoria=ciasta" className="tag cake">
              ciasta
            </Link>
            <Link href="/przepisy?kategoria=drinki" className="tag drink">
              drinki
            </Link>
            <Link href="/przepisy?kategoria=fastfood" className="tag fastfood">
              fastfood
            </Link>
            <Link href="/przepisy?kategoria=lody" className="tag icecream">
              lody
            </Link>
            <Link href="/przepisy?kategoria=obiadowe" className="tag lunch">
              obiadowe
            </Link>
            <Link
              href="/przepisy?kategoria=przetwory"
              className="tag preserves"
            >
              przetwory
            </Link>
            <Link href="/przepisy?kategoria=ryby" className="tag fish">
              ryby
            </Link>
            <Link href="/przepisy?kategoria=salatki" className="tag salad">
              salatki
            </Link>
            <Link href="/przepisy?kategoria=slodkie" className="tag snack">
              slodkie
            </Link>
            <Link href="/przepisy?kategoria=soki" className="tag juice">
              soki
            </Link>
          </div> */}
        </div>
      </section>
      <div className="sectionSpacer" />
      <RecipesGrid size="8" sort="no" title="ostatnio dodane" />
      <div className="sectionSpacer" />
    </>
  );
}
