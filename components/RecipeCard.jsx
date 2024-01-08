/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';

import { notFound } from 'next/navigation';
// import ImageDataURI from 'image-data-uri';
import { categoryHeaderColorPicker } from './RecipeUtilities';
import getRecipe from '../lib/getRecipe';
// import getRecipes from '../lib/getRecipes';
// import SwiperContainer from './SwiperContainer';
import RecipesGrid from './RecipesGrid';

export default async function RecipeCard({ slug }) {
  const recipeData = await getRecipe(slug);
  // const data = await getRecipes([
  //   'https://archiwumkulinarne.deadbrain.dev/api/recipes', // ulr
  //   '1', // page
  //   '', // search
  //   recipeData.category, // category
  //   'no', // sort
  //   '8', // pagesize
  // ]);

  // const lastAdded = data?.results
  //   ? data.results?.tiles.map((tile) => tile.value)
  //   : 'skeleton';

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
              <Link href={image.src} target="blank" key={image.src}>
                <div className="RCimage">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    sizes="(max-width: 768px) 70vw, (max-width: 900px) 50vw, 30vw"
                    // sizes="(max-width: 768px) 90vw, 400px"
                    quality={60}
                    // loading="eager"
                    // placeholder="blur"
                    // blurDataURL={test}
                    // unoptimized
                    priority
                    className="RCimageSrc"
                  />
                  {/* <img className="RCimageSrc" src={image.src} alt={image.alt} /> */}
                </div>
              </Link>
            ))
          ) : (
            <div className="RCimage">
              <Image alt="handwritten recipe" className="RCimageSrc" />
            </div>
          )}
        </div>
        <RecipesGrid
          size={8}
          category={recipeData.category}
          sort="no"
          title="inne z tej kategorii"
        />
      </>
    );
  }
  notFound(); // jezeli recipedata nie wczyta sie poprawnie wyswietl blad
}
