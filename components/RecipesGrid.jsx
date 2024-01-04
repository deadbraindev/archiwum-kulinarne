import useSWR from 'swr';
import RecipeCardSmallSkeleton from './RecipeCardSmallSkeleton';
import getRecipes from '../lib/getRecipes';

function RecipesGrid(props) {
  const { size, category, sort, favorite } = props;
  console.log(size, category, sort, favorite);

  //   const { data, isLoading, isFetching } = useSWR(
  //     [`/api/recipes`, paramPage, paramSearch, category],
  //     getRecipes
  //   );

  return (
    <section className="recipesContainer">
      <div className="cardContainer">
        <RecipeCardSmallSkeleton />
        <RecipeCardSmallSkeleton />
        <RecipeCardSmallSkeleton />
        <RecipeCardSmallSkeleton />
      </div>
    </section>
  );
}
export default RecipesGrid;
