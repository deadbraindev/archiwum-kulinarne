import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function RecipeCard() {
  return (
    <div className="RC">
      <p className="RCcategory RCcategoryPadding">
        <span className="RCcategorySeparator">{'>'}</span>
        <Link className="RCcategoryLink" href="przepisy">
          przepisy
        </Link>
        <span className="RCcategorySeparator">{'>'}</span>
        <span className="RCcategoryLink">
          <Skeleton count={1} width="5em" enableAnimation={false} />
        </span>
      </p>

      <div className="RCheader skeletonLight">
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
        <div className="RCname">
          <Skeleton count={1} width="13em" enableAnimation={false} />
        </div>
      </div>

      <div className="RCstage">
        <div className="RCing">
          <h4 className="RCstageIngredients">Składniki:</h4>
          <div className="RCingredientsList">
            <Skeleton
              count={1}
              width={`${Math.random() * (100 - 40) + 40}%`}
              height="1.5em"
              enableAnimation={false}
            />
            <Skeleton
              count={1}
              width={`${Math.random() * (100 - 40) + 40}%`}
              height="1.5em"
              enableAnimation={false}
            />
            <Skeleton
              count={1}
              width={`${Math.random() * (100 - 40) + 40}%`}
              height="1.5em"
              enableAnimation={false}
            />
            <Skeleton
              count={1}
              width={`${Math.random() * (100 - 40) + 40}%`}
              height="1.5em"
              enableAnimation={false}
            />
            <Skeleton
              count={1}
              width={`${Math.random() * (100 - 40) + 40}%`}
              height="1.5em"
              enableAnimation={false}
            />
            <Skeleton
              count={1}
              width={`${Math.random() * (100 - 40) + 40}%`}
              height="1.5em"
              enableAnimation={false}
            />
            <Skeleton
              count={1}
              width={`${Math.random() * (100 - 40) + 40}%`}
              height="1.5em"
              enableAnimation={false}
            />
            <Skeleton
              count={1}
              width={`${Math.random() * (100 - 40) + 40}%`}
              height="1.5em"
              enableAnimation={false}
            />
          </div>
        </div>
        <div className="RCprep">
          <h4 className="RCstagePreparing">Przygotowanie:</h4>
          <p className="RCpreparing">
            <Skeleton
              count={1}
              width={`${Math.random() * (100 - 50) + 50}%`}
              height="1.5em"
              enableAnimation={false}
            />
            <Skeleton
              count={2}
              width={`${Math.random() * (100 - 50) + 50}%`}
              height="1.5em"
              enableAnimation={false}
            />
            <Skeleton
              count={1}
              width={`${Math.random() * (100 - 50) + 50}%`}
              height="1.5em"
              enableAnimation={false}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
