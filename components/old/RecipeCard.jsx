import React from "react";
import img from "../icon.png";
import { Link, NavLink } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"
import { categoryHeaderColorPicker } from "./utilities"
import {Helmet} from "react-helmet";


export default function RecipeCard(props) {
  const navigate = useNavigate();
  // console.log(props.category);
  
  // console.table();


  // console.time("answer time");
  // alert("click to continue");
  // console.timeLog("answer time");

  // console.dir(document.head);

  // console.log(props.images);

  return (
    <>

      
    
      <div className="RC">


      <p className="RCcategory">
        
      {/* <Link
          className="RCcategoryLink"
          to={{ 
            pathname: "/"
          }}>{"główna"}
      </Link> */}
      <span className="RCcategorySeparator">{">"}</span>
      <Link
        className="RCcategoryLink"
        to={{ 
          pathname: "/przepisy"
        }}>{"przepisy"}
      </Link>
      <span className="RCcategorySeparator">{">"}</span>
      
      {/* &#9679; */}
      <Link
        className="RCcategoryLink"
        to={{ 
          pathname: "/przepisy",
          search: `?kategoria=${props.category}`,
        }}>{props.category}
      </Link>
      <span className="RCcategorySeparator">{">"}</span>
      {/* &#9679; */}
      <NavLink
        className="RCcategoryLink"
        to={{ 
          pathname: `/przepisy/${props.slug}`
        }}>{props.slug}
      </NavLink>

      {/* &#9679; */}
      </p>

        <div className={`RCheader ${categoryHeaderColorPicker(props.category)}`}>
          <button
            className="RCbuttonPrev"
            type="button"
            onClick={() => navigate(-1)} 
          >
            <span className="visuallyHidden">Wróć do poprzedniej strony</span>
            <svg className="paginationIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.9 16.81"aria-hidden="true" focusable="false">
              <path d="M9.9,15.32,3,8.4,9.9,1.49,8.41,0,0,8.4l8.41,8.41Z"/>
            </svg>
          </button>
          <h1 className="RCname">{props.name}</h1>
      
          
        </div>
        

        {props.stages?.items.map((stage, i) => (
          <div className="RCstage" key={i}>
            {stage.title && <h3 className="RCstageTitle">{i+1}. {stage.title}</h3>}
            <div className="RCing">
              <h4 className="RCstageIngredients">{"Składniki:"}</h4>
              <ul className="RCingredientsList">
                {stage.ingredients.map((ingredient, j) => (
                  <li key={`${i}${j}`}>{ingredient}</li>
                  // <li key={`${i}${j}`}><label><input type="checkbox" name="RCingredient" id={`${i}${j}`} /><span>{ingredient}</span></label></li>
                  
                ))}
              </ul>
            </div>
            <div className="RCprep">
              {stage.preparing && <h4 className="RCstagePreparing">{"Przygotowanie:"}</h4>}
              <p className="RCpreparing">{stage.preparing}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="RCimageContainer">
        {props.images?.size > 0 ? (
            props.images?.items.map((image, i) => (
              <a href={image.src}><div className="RCimage"><img key={i} src={image.thumbnail} alt={image.alt} className="RCimageSrc"/></div></a>
            ))
          ) : (
            <div className="RCimage"><img src={img} alt="handwritten recipe" className="RCimageSrc"/></div>
          )}
      </div>
    </>
  );
}
