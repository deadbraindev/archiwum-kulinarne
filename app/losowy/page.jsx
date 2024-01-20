'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getRecipe from '../../lib/getRecipe';
import RecipeCardSkeleton from '../../components/RecipeCardSkeleton';

export default function Page() {
  const router = useRouter();
  const fetchRandomRecipe = async () => {
    const recipe = await getRecipe([
      'https://archiwumkulinarne.deadbrain.dev/api/recipes',
      'random',
    ]);
    router.replace(`/przepisy/${recipe.slug.slugCurrent}`);
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);
  return <RecipeCardSkeleton />;
}
