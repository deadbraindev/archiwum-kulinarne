'use client';

import { createContext, useEffect, useState, useMemo } from 'react';

const isLocalStorageAvailable =
  typeof window !== 'undefined' && window.localStorage;

export const FavoriteContext = createContext();
export const initializer = () =>
  isLocalStorageAvailable && JSON.parse(localStorage.getItem('favorites'))
    ? JSON.parse(localStorage.getItem('favorites'))
    : [];

export function FavoriteContextProvider({ children }) {
  const [state, setState] = useState(() => initializer());
  console.log(
    '🚀 ~ file: FavoriteContext.jsx:15 ~ FavoriteContextProvider ~ state:',
    state
  );
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const addToFavorite = (recipe) => {
    const updatedFavorites = [...state, recipe];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setState(updatedFavorites);
  };
  const removeFromFavorite = (recipe) => {
    // const updatedFavorites = [...state, recipe];
    const updatedFavorites = state.filter(
      (currentRecipe) => currentRecipe.slug !== recipe.slug
    );

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setState(updatedFavorites);
  };

  const memoizedValue = useMemo(
    () => ({
      state,
      addToFavorite,
      removeFromFavorite,
      isFetching,
      setIsFetching,
      error,
      setError,
    }),
    [
      state,
      addToFavorite,
      removeFromFavorite,
      isFetching,
      setIsFetching,
      error,
      setError,
    ]
  );

  useEffect(() => {
    setIsFetching(true);
    if (isLocalStorageAvailable) {
      const favorites = JSON.parse(localStorage.getItem('favorites'));
      if (favorites) {
        setIsFetching(false);
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
