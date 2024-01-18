import RecipeCard from '../../../components/RecipeCard';

async function getMetadata(slug) {
  const res = await fetch(
    `https://archiwumkulinarne.deadbrain.dev/api/recipes/${slug}`
  );
  return res.json();
}

export async function generateMetadata({ params }, parent) {
  const { slug } = params;
  const recipeData = await getMetadata(slug);
  // const recipe = await recipeData;
  const previousImages = (await parent).openGraph?.images || [];

  if (recipeData.success) {
    const ogDesc = recipeData.stages?.items.map((stage) => stage.preparing);

    return {
      metadataBase: new URL('https://archiwumkulinarne.deadbrain.dev'),
      alternates: {
        canonical: `/przepisy/${recipeData.slug?.slugCurrent}`,
      },
      title: recipeData.name?.toLowerCase(),
      description:
        recipeData.description ||
        `kategoria: ${recipeData.category} | ${ogDesc
          .join(' ')
          .substring(0, 150)}`,
      keywords: recipeData.tags || [
        'jedzenie',
        'przepisy',
        'rodzinne przepisy',
        'dziedzictwo kulinarne',
        'gotowanie w domu',
        'tradycyjne smaki',
        'gotowanie z miłością',
        'przepisy pokoleniowe',
        'domowa kuchnia',
        'kulinarne wspomnienia',
        'gotowanie dziedzictwa',
        'tradycyjne dania',
      ],
      openGraph: {
        title: `${recipeData.name?.toLowerCase()} - archiwum kulinarne`,
        description:
          recipeData.description ||
          `kategoria: ${recipeData.category} | przepis kulinarny`,
        url: `/przepisy/${recipeData.slug?.slugCurrent}`,
        // images: [`ok-${recipeData.category}.jpg`, ...previousImages],
        images: [
          {
            url: `https://archiwumkulinarne.deadbrain.dev/images/og-${recipeData.category}.jpg`,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  }
  return {
    metadataBase: new URL('https://archiwumkulinarne.deadbrain.dev'),
    alternates: {
      canonical: `/przepisy}`,
    },
    title: 'błędna nazwa przepisu',
    openGraph: {
      title: 'błędna nazwa przepisu | archiwum kulinarne',
      url: '/przepisy',
      images: previousImages,
    },
  };
}

export async function generateStaticParams() {
  const recipes = await fetch(
    'https://archiwumkulinarne.deadbrain.dev/api/recipes?pagesize=100'
  ).then((res) => res.json());

  return recipes.results.tiles.map((recipe) => ({
    slug: recipe.value.slug.slugCurrent,
  }));
}
export const dynamicParams = false;
export const dynamic = 'error';

export default function Page({ params }) {
  const { slug } = params;

  return <RecipeCard slug={slug} />;
}
