'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getRecipe from '../../lib/getRecipe';
import RecipeCardSkeleton from '../../components/RecipeCardSkeleton';

// export const metadata = {
//   title: 'losowy | archiwum kulinarne',
//   openGraph: {
//     title: 'losowy',
//     url: '/losowy',
//     images: [
//       {
//         url: 'https://archiwum-kulinarne.vercel.app/images/opengraph-img-1200-630.jpg',
//         width: 1200,
//         height: 630,
//       },
//     ],
//   },
// };

export default function Page() {
  // function Losowy() {
  const router = useRouter();
  const fetchRandomRecipe = async () => {
    const recipe = await getRecipe('random');

    console.log(
      '🚀 ~ file: page.jsx:30 ~ fetchRandomRecipe ~ recipe:',
      recipe.slug.slugCurrent
    );

    router.replace(`/przepisy/${recipe.slug.slugCurrent}`);
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);
  return <RecipeCardSkeleton />;
}
