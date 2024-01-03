import Link from 'next/link';
import Image from 'next/image';

import { notFound } from 'next/navigation';
import { categoryHeaderColorPicker } from './RecipeUtilities';
import getRecipe from '../lib/getRecipe';
// import getRecipes from '../lib/getRecipes';
import SwiperContainer from './SwiperContainer';

async function getLastAdded(category) {
  const res = await fetch(
    `https://archiwumkulinarne.vercel.app/api/recipes/?category=${category}&sort=no&pagesize=8`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  if (!res.ok) {
    throw new Error(
      `Failed to fetch recipes (/api/recipes/?category=${category}&sort=no&pagesize=8), try again...`
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
            <Link className="RCcategoryLink active" href={`/przepisy/${slug}`}>
              {slug}
            </Link>
          </p>
          <div
            className={`RCheader ${categoryHeaderColorPicker(
              recipeData.category
            )}`}
          >
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
              <Link href={image.src} target="blank">
                <div className="RCimage">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={100}
                    // crop={{ ratio: '1/1', position: 'center' }}
                    loading="lazy"
                    className="RCimageSrc"
                    // onClick={handleClick}
                  />
                </div>
              </Link>
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
          category={recipeData.category}
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
