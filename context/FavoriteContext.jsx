// 'use client';

// import { createContext, useEffect, useState, useReducer } from 'react';

// export const FavoriteContext = createContext();
// export const favoriteArray = [];
// export const initializer = () =>
//   typeof window !== 'undefined' &&
//   window.localStorage &&
//   JSON.parse(localStorage.getItem('favorites'))
//     ? JSON.parse(localStorage.getItem('favorites'))
//     : favoriteArray;

// // if (typeof window !== 'undefined' && window.localStorage)
// // export const initialFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

// // const handleFavoriteButton = (favName, favSlug, favCategory) => {
// //   let existingFavorites = JSON.parse(localStorage.getItem('favorites'));
// //   if (existingFavorites == null) existingFavorites = [];
// //   const favTemp = {
// //     name: favName,
// //     slug: favSlug,
// //     category: favCategory,
// //   };
// //   if (isFavorite) {
// //     toast('Usunięto z ulubionych!');
// //     const index = existingFavorites.findIndex((fav) => fav.slug === slug);

// //     if (index > -1) {
// //       existingFavorites.splice(index, 1);
// //     }
// //     localStorage.setItem('favorites', JSON.stringify(existingFavorites));
// //     setIsFavorite(false);
// //     // setIsFavoriteProps(false);
// //   } else if (!isFavorite) {
// //     toast('Dodano do ulubionych!');
// //     existingFavorites.push(favTemp);
// //     localStorage.setItem('favorites', JSON.stringify(existingFavorites));
// //     setIsFavorite(true);
// //     // setIsFavoriteProps(false);
// //   }
// // };

// export const favoriteReducer = (state, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case 'ADD_TO_FAVORITE': {
//       console.log('ADD_TO_FAVORITE', payload);

//       return payload;
//     }

//     // case 'REMOVE_FROM_FAVORITE': {
//     //   console.log('REMOVE_FROM_FAVORITE', payload);

//     //   // toast('Usunięto z ulubionych!');
//     //   return payload;
//     // }
//     default:
//       console.log('default', payload);
//       return state;
//   }
// };

// export function FavoriteContextProvider({ children }) {
//   const [state, dispatch] = useReducer(
//     favoriteReducer,
//     favoriteArray,
//     initializer
//   );
//   // console.log(
//   //   '🚀 ~ file: FavoriteContext.jsx:70 ~ FavoriteContextProvider ~ state:',
//   //   state
//   // );

//   const [error, setError] = useState(null);
//   const [isFetching, setIsFetching] = useState(true);

//   // useEffect(() => {
//   //   localStorage.setItem('favorites', JSON.stringify(state));
//   // }, [state]);

//   const addToFavorite = (recipe) => {
//     // console.log(favoriteArray);

//     const updatedFavorites = [...state, recipe];
//     console.log(
//       '🚀 ~ file: FavoriteContext.jsx:88 ~ addToFavorite ~ ...state:',
//       ...state
//     );
//     // console.log(
//     //   '🚀 ~ file: FavoriteContext.jsx:87 ~ addToFavorite ~ updatedFavorites:',
//     //   updatedFavorites
//     // );
//     // const count = updatedFavorites.push(recipe);
//     localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // update directly
//     dispatch({
//       type: 'ADD_TO_FAVORITE',
//       payload: updatedFavorites,
//     });
//   };

//   // const isAuth = () => {
//   //   setIsFetching(true);
//   //   if (typeof window !== 'undefined' && window.localStorage) {
//   //     const favorites = JSON.parse(localStorage.getItem('favorites'));
//   //     if (favorites) {
//   //       // dispatch({
//   //       //   type: 'ADD_TO_FAVORITE',
//   //       //   payload: { favoriteArray: favorites },
//   //       // });

//   //       // setIsLoggedIn(false);
//   //       setIsFetching(false);
//   //     }
//   //     setError(null);
//   //     // setIsLoggedIn(false);
//   //     setIsFetching(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   isAuth();
//   // }, []);

//   return (
//     <FavoriteContext.Provider
//       value={{
//         state,
//         dispatch,
//         isFetching,
//         setIsFetching,
//         addToFavorite,
//         // isLoggedIn,
//         // setIsLoggedIn,
//         error,
//         setError,
//       }}
//     >
//       {children}
//     </FavoriteContext.Provider>
//   );
// }

'use client';

import { createContext, useEffect, useState, useMemo } from 'react';

export const FavoriteContext = createContext();
export const favoriteArray = [];
export const initializer = () =>
  typeof window !== 'undefined' &&
  window.localStorage &&
  JSON.parse(localStorage.getItem('favorites'))
    ? JSON.parse(localStorage.getItem('favorites'))
    : favoriteArray;

export function FavoriteContextProvider({ children }) {
  const [state, setState] = useState(() => initializer());
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const addToFavorite = (recipe) => {
    const updatedFavorites = [...state, recipe];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setState(updatedFavorites);
  };

  const memoizedValue = useMemo(
    () => ({
      state,
      addToFavorite,
      isFetching,
      setIsFetching,
      error,
      setError,
    }),
    [state, addToFavorite, isFetching, setIsFetching, error, setError]
  );

  useEffect(() => {
    setIsFetching(true);
    if (typeof window !== 'undefined' && window.localStorage) {
      const favorites = JSON.parse(localStorage.getItem('favorites'));
      if (favorites) {
        setState(favorites);
      }
      setError(null);
      setIsFetching(false);
    }
  }, []);

  return (
    <FavoriteContext.Provider value={memoizedValue}>
      {children}
    </FavoriteContext.Provider>
  );
}
