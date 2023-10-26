// import TopBarProgress from 'react-topbar-progress-indicator';
// import { Suspense } from 'react';
// import RecipeCardSkeleton from '../../../components/RecipeCardSkeleton';
// import getRecipe from '../../../lib/getRecipe';
// import Loading from './loading';
import RecipeCard from '../../../components/RecipeCard';

async function getMetadata(slug) {
  const res = await fetch(
    `https://archiwum-kulinarne.vercel.app/api/recipes/${slug}`
  );
  return res.json();
}

export async function generateMetadata({ params }, parent) {
  const { slug } = params;
  const recipeData = await getMetadata(slug);
  const recipe = await recipeData;
  const previousStartupImages = (await parent).appleWebApp?.startupImage || [];
  const previousOGImages = (await parent).openGraph?.images || [];

  // console.log(previousStartupImages);
  if (recipe.success) {
    const ogDesc = recipeData.stages?.items.map((stage) => stage.preparing);

    return {
      // HTML
      title: recipe.name?.toLowerCase(),
      description: `kategoria: ${recipeData.category} | ${ogDesc
        .join(' ')
        .substring(0, 150)}`,
      // end HTML

      // OG
      openGraph: {
        title: recipe.name?.toLowerCase(),
        // title: `${recipe.name?.toLowerCase()} - przepis z archiwum kulinarnego`,
        description: 'og tags description lorem ipsum',
        url: `/przepisy/${recipe.slug?.slugCurrent}`,
        images: previousOGImages,
      },
      // end OG

      // APPLE
      // appleWebApp: {
      //   title: `${recipe.name?.toLowerCase()} | archiwum kulinarne`,
      //   startupImage: previousStartupImages,
      // },
      // end APPLE
    };
  }
  return {
    // HTML
    title: 'błędna nazwa przepisu',
    // end HTML

    // OG
    openGraph: {
      title: 'błędna nazwa przepisu | archiwum kulinarne',
      url: '/przepisy',
      images: previousOGImages,
    },
    // end OG

    // APPLE
    appleWebApp: {
      title: 'błędna nazwa przepisu | archiwum kulinarne',
      startupImage: previousStartupImages,
    },
    // end APPLE
  };
}

export async function generateStaticParams() {
  const recipes = await fetch(
    'https://archiwum-kulinarne.vercel.app/api/recipes?pagesize=100'
  ).then((res) => res.json());

  return recipes.results.tiles.map((recipe) => ({
    slug: recipe.value.slug.slugCurrent,
  }));
}

export default function Page({ params }) {
  const { slug } = params;

  return <RecipeCard slug={slug} />;
}
