import Link from 'next/link';
import Image from 'next/image';

import { notFound } from 'next/navigation';
import { categoryHeaderColorPicker } from './RecipeUtilities';
import getRecipe from '../lib/getRecipe';
// import getRecipes from '../lib/getRecipes';
import SwiperContainer from './SwiperContainer';

async function getLastAdded(category) {
  const res = await fetch(
    `https://archiwum-kulinarne.vercel.app/api/recipes/lastadded?category=${category}`,
    {
      next: {
        revalidate: 3600,
      },
      // cache: 'no-store',
    }
  );
  if (!res.ok) {
    console.log(
      `błąd wczytywania danych api/recipes/lastadded?category=${category}`
    );
  }
  return res.json();
}

export default async function RecipeCard({ slug }) {
  const recipeData = await getRecipe(slug);
  const data = await getLastAdded(recipeData.category);
  const lastAdded = data?.results
    ? data.results?.tiles.map((tile) => tile.value)
    : 'skeleton';

  if (recipeData.success) {
    // console.log(recipeData.images);
    // console.log(recipeData.images.items[0]?.src);
    return (
      <>
        <div className="RC">
          <p className="RCcategory RCcategoryPadding">
            <span className="RCcategorySeparator">{'>'}</span>
            <Link className="RCcategoryLink" href="/przepisy" scroll>
              przepisy
            </Link>
            <span className="RCcategorySeparator">{'>'}</span>
            <Link
              className="RCcategoryLink"
              href={`/przepisy?kategoria=${recipeData.category}`}
            >
              {recipeData.category}
            </Link>
            <span className="RCcategorySeparator">{'>'}</span>
            <Link className="RCcategoryLink" href={`/przepisy/${slug}`}>
              {slug}
            </Link>
          </p>
          <div
            className={`RCheader ${categoryHeaderColorPicker(
              recipeData.category
            )}`}
          >
            {/* <Link href="/przepisy" className="RCbuttonPrev" type="button">
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
            </Link> */}
            <h1 className="RCname">{recipeData.name}</h1>
          </div>

          {recipeData.stages?.items.map((stage, i) => (
            <div className="RCstage" key={stage.index}>
              {stage.title && (
                <h3 className="RCstageTitle">
                  {i + 1}. {stage.title}
                </h3>
              )}
              <div className="RCing">
                <h4 className="RCstageIngredients">Składniki:</h4>
                <ul className="RCingredientsList">
                  {stage.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="RCprep">
                {stage.preparing && (
                  <h4 className="RCstagePreparing">Przygotowanie:</h4>
                )}
                <p className="RCpreparing">{stage.preparing}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="RCimageContainer">
          {recipeData.images?.size > 0 ? (
            recipeData.images?.items.map((image) => (
              <a href={image.src} target="blank">
                <div className="RCimage">
                  {/* <span>{image.src}</span> */}
                  <Image
                    // key={i}
                    src={image.src}
                    // src="https://iili.io/HyJVKqG.jpg"
                    alt={image.alt}
                    // width={500}
                    // height={500}
                    fill
                    quality={25}
                    loading="lazy"
                    // placeholder="blur"
                    // blurDataURL={image.thumbnail}
                    className="RCimageSrc"
                  />
                </div>
              </a>
            ))
          ) : (
            <div className="RCimage">
              <Image alt="handwritten recipe" className="RCimageSrc" />
            </div>
          )}
        </div>
        <SwiperContainer
          cards={lastAdded}
          title="ostatnio dodane w tej kategorii"
        />
      </>
    );
  }
  if (
    !recipeData.success &&
    recipeData.error.message ===
      'Recipe query error: slug: Recipe does not exist'
  ) {
    notFound(); // 404 not found handling
  } else {
    throw new Error(`Failed to fetch recipes, try again...`);
  }
}
