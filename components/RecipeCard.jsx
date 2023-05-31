import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categoryHeaderColorPicker } from './RecipeUtilities';
import getRecipe from '../lib/getRecipe';

export default async function RecipeCard({ slug }) {
  const recipeData = await getRecipe(slug);
  console.log(recipeData);
  if (!recipeData.success) notFound(); // 404 not found handling
  else if (recipeData.success) {
    return (
      <>
        <div className="RC">
          <p className="RCcategory RCcategoryPadding">
            <span className="RCcategorySeparator">{'>'}</span>
            <Link className="RCcategoryLink" href="przepisy" scroll>
              przepisy
            </Link>
            <span className="RCcategorySeparator">{'>'}</span>
            <Link
              className="RCcategoryLink"
              href={`przepisy?kategoria=${recipeData.category}`}
            >
              {recipeData.category}
            </Link>
            <span className="RCcategorySeparator">{'>'}</span>
            <Link className="RCcategoryLink" href={`przepisy/${slug}`}>
              {slug}
            </Link>
          </p>
          <div
            className={`RCheader ${categoryHeaderColorPicker(
              recipeData.category
            )}`}
          >
            <Link href="/przepisy" className="RCbuttonPrev" type="button">
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
            </Link>
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
          {/* {props.images?.size > 0 ? (
          props.images?.items.map((image, i) => (
            <a href={image.src}>
              <div className="RCimage">
                <img
                  key={i}
                  src={image.thumbnail}
                  alt={image.alt}
                  className="RCimageSrc"
                />
              </div>
            </a>
          ))
        ) : (
          <div className="RCimage">
            <img src={img} alt="handwritten recipe" className="RCimageSrc" />
          </div>
        )} */}
        </div>
      </>
    );
  }
}
