// import React from 'react';
import Link from 'next/link';

// import img from "../icon.png";
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { categoryHeaderColorPicker } from "./utilities"

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function RecipeCard() {
  // const navigate = useNavigate();

  return (
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
        <span className="RCcategoryLink">
          <Skeleton count={1} width="5em" enableAnimation={false} />
        </span>
      </p>

      <div className="RCheader skeletonLight">
        {/* <button
          className="RCbuttonPrev"
          type="button"
          href="przepisy"
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
        </button> */}
        <div className="RCname">
          <Skeleton
            count={1}
            width="13em"
            // baseColor="#bababa"
            // highlightColor="#dadada"
            enableAnimation={false}
          />
        </div>
      </div>

      <div className="RCstage">
        {/* {stage.title && <h3 className="RCstageTitle">{i+1}. {stage.title}</h3>} */}
        <div className="RCing">
          <h4 className="RCstageIngredients">Składniki:</h4>
          <div className="RCingredientsList">
            <Skeleton
              count={1}
              width="70%"
              height="1.5em"
              // baseColor="#bababa"
              enableAnimation={false}
            />
            <Skeleton
              count={1}
              width="90%"
              height="1.5em"
              // baseColor="#bababa"
              enableAnimation={false}
            />
            <Skeleton
              count={1}
              width="60%"
              height="1.5em"
              // baseColor="#bababa"
              enableAnimation={false}
            />
            <Skeleton
              count={1}
              width="65%"
              height="1.5em"
              // baseColor="#bababa"
              enableAnimation={false}
            />
            <Skeleton
              count={1}
              width="95%"
              height="1.5em"
              // baseColor="#bababa"
              enableAnimation={false}
            />
            <Skeleton
              count={1}
              width="87%"
              height="1.5em"
              // baseColor="#bababa"
              enableAnimation={false}
            />
            <Skeleton
              count={1}
              width="67%"
              height="1.5em"
              // baseColor="#bababa"
              enableAnimation={false}
            />
            <Skeleton
              count={1}
              width="54%"
              height="1.5em"
              // baseColor="#bababa"
              enableAnimation={false}
            />
          </div>
        </div>
        <div className="RCprep">
          <h4 className="RCstagePreparing">Przygotowanie:</h4>
          <p className="RCpreparing">
            <Skeleton
              count={3}
              width="90%"
              height="1.5em"
              // baseColor="#bababa"
              enableAnimation={false}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
