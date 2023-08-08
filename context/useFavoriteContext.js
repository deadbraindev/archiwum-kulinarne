import { useContext } from 'react';
import { FavoriteContext } from './FavoriteContext';

export const useFavoriteContext = () => {
  const context = useContext(FavoriteContext);
  if (!context)
    throw Error(
      'useFavoriteContext must be used inside FavoriteContextProvider'
    );
  return context;
};
