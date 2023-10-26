// import Link from 'next/link';

// export default function NotFound() {
//   return (
//     <div className="RC">
//       <p className="RCcategory RCcategoryPadding">
//         <span className="RCcategorySeparator">{'>'}</span>
//         <Link className="RCcategoryLink" href="przepisy">
//           przepisy
//         </Link>
//         <span className="RCcategorySeparator">{'>'}</span>
//         <span className="RCcategoryLink">nie-znaleziono-przepisu</span>
//       </p>

//       <div className="RCheader skeletonLight">
//         <Link href="/przepisy" className="RCbuttonPrev" type="button">
//           <span className="visuallyHidden">Wróć do poprzedniej strony</span>
//           <svg
//             className="paginationIcon"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 9.9 16.81"
//             aria-hidden="true"
//             focusable="false"
//           >
//             <path d="M9.9,15.32,3,8.4,9.9,1.49,8.41,0,0,8.4l8.41,8.41Z" />
//           </svg>
//         </Link>
//         <h1 className="RCname">nie znaleziono</h1>
//       </div>

//       <div className="RCstage">
//         {/* {stage.title && <h3 className="RCstageTitle">{i+1}. {stage.title}</h3>} */}
//         <div className="RCing">
//           {/* <span className="notfound404">404</span> */}
//           {/* <h4 className="RCstageIngredients">Składniki:</h4> */}
//         </div>
//         <div className="RCprep">
//           <h2 className="RCstagePreparing">
//             przykro mi, nie ma takiego przepisu
//           </h2>
//           <p className="RCpreparing">
//             [TODO] tu kiedyś bedzie lista pasujących przepisów do błędnego
//             wyszukania, ale narazie wyszukiwarka jest za głupia.
//           </p>

//           <Link className="notfoundLink" href="/przepisy">
//             wróć
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found /recipes</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
