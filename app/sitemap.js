// export default function sitemap() {
//   return [
//     {
//       url: 'https://acme.com',
//       lastModified: new Date(),
//       changeFrequency: 'yearly',
//       priority: 1,
//     },
//     {
//       url: 'https://acme.com/about',
//       lastModified: new Date(),
//       changeFrequency: 'monthly',
//       priority: 0.8,
//     },
//     {
//       url: 'https://acme.com/blog',
//       lastModified: new Date(),
//       changeFrequency: 'weekly',
//       priority: 0.5,
//     },
//   ];
// }
const generateRecipesSitemapObjects = async () => {
  const recipes = await fetch(
    'https://archiwumkulinarne.deadbrain.dev/api/recipes?pagesize=100'
  ).then((res) => res.json());

  return recipes.results.tiles.map((recipe) => ({
    slug: recipe.value.slug.slugCurrent,
    updatedAt: new Date(),
  }));
  // return [
  //   {
  //     slug: "blog-post-1",
  //     updatedAt: new Date(),
  //   },
  //   {
  //     slug: "blog-post-2",
  //     updatedAt: new Date(),
  //   },
  // ];
};

export default async function sitemap() {
  return [
    {
      url: 'https://archiwumkulinarne.deadbrain.dev',
      priority: 1,
    },
    {
      url: 'https://archiwumkulinarne.deadbrain.dev/przepisy',
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    ...(await generateRecipesSitemapObjects()).map((recipe) => ({
      url: `https://archiwumkulinarne.deadbrain.dev/przepisy/${recipe.slug}`,
      lastModified: recipe.updatedAt,
      priority: 0.8,
    })),
    {
      url: 'https://archiwumkulinarne.deadbrain.dev/wpa',
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://archiwumkulinarne.deadbrain.dev/kontakt',
      //   changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://archiwumkulinarne.deadbrain.dev/losowy',
      //   changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://archiwumkulinarne.deadbrain.dev/ulubione',
      // changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];
}
