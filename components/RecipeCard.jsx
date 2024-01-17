/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { categoryHeaderColorPicker } from './RecipeUtilities';
import getRecipe from '../lib/getRecipe';
import RecipesGrid from './RecipesGrid';

export default async function RecipeCard({ slug }) {
  const recipeData = await getRecipe(slug);

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
          sort="no"
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
