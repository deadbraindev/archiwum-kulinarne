import Link from 'next/link';
import Image from 'next/image';

import { notFound } from 'next/navigation';
// import ImageDataURI from 'image-data-uri';
import { categoryHeaderColorPicker } from './RecipeUtilities';
import getRecipe from '../lib/getRecipe';
import getRecipes from '../lib/getRecipes';
import SwiperContainer from './SwiperContainer';

export default async function RecipeCard({ slug }) {
  const recipeData = await getRecipe(slug);
  const data = await getRecipes([
    'https://archiwumkulinarne.deadbrain.dev/api/recipes', // ulr
    '1', // page
    '', // search
    recipeData.category, // category
    'no', // sort
    '8', // pagesize
  ]);

  const lastAdded = data?.results
    ? data.results?.tiles.map((tile) => tile.value)
    : 'skeleton';

  if (recipeData.success) {
    // console.log(recipeData.images.items[0].thumbnail);

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
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    sizes="(max-width: 768px) 70vw, (max-width: 900px) 50vw, 35vw"
                    // sizes="(max-width: 768px) 90vw, 400px"
                    quality={80}
                    // loading="eager"
                    // placeholder="blur"
                    // blurDataURL={test}
                    placeholder="data:image/png;base64,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"
                    // unoptimized
                    priority
                    className="RCimageSrc"
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
