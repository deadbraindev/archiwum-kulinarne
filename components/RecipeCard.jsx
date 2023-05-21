import Link from 'next/link';
import { categoryHeaderColorPicker } from './RecipeUtilities';
import getRecipe from '../lib/getRecipe';

export default async function RecipeCard({ slug }) {
  const recipeData = await getRecipe(slug);
  // console.log(recipeData);

  return (
    <>
      {/* //!! zrobic osluge bledu czyli if getRecipe success ..... */}
      {recipeData.success ? (
        <>
          <div className="RC">
            <p className="RCcategory">
              {/* <Link className="RCcategoryLink" href="/">
                🏠
              </Link> */}
              <span className="RCcategorySeparator">{'>'}</span>
              <Link className="RCcategoryLink" href="przepisy">
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
              {/* <button
            className="RCbuttonPrev"
            type="button"
            onClick={() => navigate(-1)}
          >
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
          </button> */}
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
      ) : (
        <div className="RC">
          <p className="RCcategory">
            {/* <Link className="RCcategoryLink" href="/">
              🏠
            </Link> */}
            <span className="RCcategorySeparator">{'>'}</span>
            <Link className="RCcategoryLink" href="przepisy">
              przepisy
            </Link>
            <span className="RCcategorySeparator">{'>'}</span>
            <span className="RCcategoryLink">nie-znaleziono-przepisu</span>
          </p>

          <div className="RCheader skeletonLight">
            <button
              className="RCbuttonPrev"
              type="button"
              // onClick={() => navigate(-1)}
            >
              <span className="visuallyHidden">Wróć do poprzedniej strony</span>
              <svg
                className="paginationIcon"
                viewBox="0 0 256 430"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
              </svg>
            </button>
            <h1 className="RCname">Nie znaleziono</h1>
          </div>

          <div className="RCstage">
            {/* {stage.title && <h3 className="RCstageTitle">{i+1}. {stage.title}</h3>} */}
            <div className="RCing">
              {/* <span className="notfound404">404</span> */}
              {/* <h4 className="RCstageIngredients">Składniki:</h4> */}
            </div>
            <div className="RCprep">
              <h4 className="RCstagePreparing">
                przykro mi, nie ma takiego przepisu jak &quot;{slug}&quot;
              </h4>
              <p className="RCpreparing">
                [TODO] tu kiedyś bedzie lista pasujących przepisów do błędnego
                wyszukania, ale narazie wyszukiwarka jest za głupia.
              </p>

              {/* <Link
              className="notfoundLink"
              to="/"
            >wróć
            </Link> */}
            </div>

            {/* <div className="notfound"> */}

            {/* <img className="notfoundSvg" src={notfoundSvg} alt="logo archiwum kulinarne z napisem 'nic tu nie ma'"></img> */}
            {/* <span className="notfoundUps">oupss!</span>
            <span className="notfoundInfo">nic tu nie ma...</span> */}

            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
}
