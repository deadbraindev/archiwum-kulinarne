/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  categoryHeaderColorPicker,
  recipeNameToHumanName,
} from './RecipeUtilities';
import getRecipe from '../lib/getRecipe';
import RecipesGrid from './RecipesGrid';

export default async function RecipeCard({ slug }) {
  const recipeData = await getRecipe([
    'https://archiwumkulinarne.deadbrain.dev/api/recipes',
    slug,
  ]);

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
            <h1 className="RCname">
              {recipeNameToHumanName(
                recipeData.name,
                recipeData.slug.slugCurrent
              )}
            </h1>
          </div>
          {/* <strong>tagi: </strong>
          {recipeData.tags &&
            recipeData.tags.map((tag) => <span>{tag}, </span>)}
          <br />
          <strong>google description: </strong>
          {recipeData.description && <span>{recipeData.description}</span>} */}

          {recipeData.stages?.items.map((stage, i) => (
            <section className="RCstage" key={stage.index}>
              {stage.title && (
                <h2 className="RCstageTitle">
                  {i + 1}. {stage.title}
                </h2>
              )}
              <div className="RCing">
                <h3 className="RCstageIngredients">Składniki:</h3>
                <ul className="RCingredientsList">
                  {stage.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="RCprep">
                {stage.preparing && (
                  <h3 className="RCstagePreparing">Przygotowanie:</h3>
                )}
                <p className="RCpreparing">{stage.preparing}</p>
                {stage.GPTpreparing && (
                  <>
                    <span className="GPTbadge">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 2406 2406"
                      >
                        <path
                          d="M1 578.4C1 259.5 259.5 1 578.4 1h1249.1c319 0 577.5 258.5 577.5 577.4V2406H578.4C259.5 2406 1 2147.5 1 1828.6V578.4z"
                          fill="#74aa9c"
                        />
                        <path
                          id="a"
                          d="M1107.3 299.1c-197.999 0-373.9 127.3-435.2 315.3L650 743.5v427.9c0 21.4 11 40.4 29.4 51.4l344.5 198.515V833.3h.1v-27.9L1372.7 604c33.715-19.52 70.44-32.857 108.47-39.828L1447.6 450.3c-86.6-96.8-210.5-151.8-340.3-151.2zm0 117.5l-.6.6c79.699 0 156.3 27.5 217.6 78.4-2.5 1.2-7.4 4.3-11 6.1L952.8 709.3c-18.4 10.4-29.4 30-29.4 51.4V1248l-155.1-89.4V755.8c-.1-187.099 151.601-338.9 339-339.2z"
                          fill="#fff"
                        />
                        <use xlinkHref="#a" transform="rotate(60 1203 1203)" />
                        <use xlinkHref="#a" transform="rotate(120 1203 1203)" />
                        <use xlinkHref="#a" transform="rotate(180 1203 1203)" />
                        <use xlinkHref="#a" transform="rotate(240 1203 1203)" />
                        <use xlinkHref="#a" transform="rotate(300 1203 1203)" />
                      </svg>
                      chatGPT pisze:
                    </span>
                    <p className="GPTpreparing">{stage.GPTpreparing}</p>
                  </>
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="RCimageContainer">
          {recipeData.images?.size > 0 ? (
            recipeData.images?.items.map((image) => (
              <Link href={image.src} target="blank" key={image.src}>
                <div className="RCimage">
                  <Image
                    src={image.src}
                    alt="zeskanowany dokument, odręcznie pisany przepis kulinarny"
                    fill
                    sizes="(max-width: 768px) 70vw, (max-width: 900px) 50vw, 30vw"
                    quality={60}
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
        <RecipesGrid
          size={8}
          category={recipeData.category}
          sort=""
          title="inne z tej kategorii"
        />
        <span className="RCdevInfo">
          ostatnie zmiany {recipeData.timestamps.updatedAt}
        </span>
      </>
    );
  }
  notFound(); // jezeli recipedata nie wczyta sie poprawnie wyswietl blad
}
