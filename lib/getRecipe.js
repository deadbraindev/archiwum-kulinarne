export default async function getRecipe([url, slug]) {
  // console.log('🚀 ~ getRecipe ~ url:', url);
  const res = await fetch(`${url}/${slug}`);
  if (!res.ok) {
    // !! zrobic return success false
    // throw new Error(`Failed to fetch recipe | ${slug}`);
    // return res.json({ error: `Failed to fetch recipe | ${slug}` });
  }

  return res.json();
}
