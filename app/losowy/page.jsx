'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getRecipe from '../../lib/getRecipe';
import RecipeCardSkeleton from '../../components/RecipeCardSkeleton';

export default function Page() {
  // function Losowy() {
  const router = useRouter();
  const fetchRandomRecipe = async () => {
    const recipe = await getRecipe('random');
    router.replace(`/przepisy/${recipe.slug.slugCurrent}`);
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);
  return <RecipeCardSkeleton />;
}
