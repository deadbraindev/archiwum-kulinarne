import RecipeForm from '../../../../components/RecipeForm';
import getRecipe from '../../../../lib/getRecipe';

export default async function Page({ params }) {
  const { slug } = params;
  const recipeData = await getRecipe([
    'https://archiwumkulinarne.deadbrain.dev//api/recipes',
    slug,
  ]);
  return <RecipeForm recipeData={recipeData} />;
}
