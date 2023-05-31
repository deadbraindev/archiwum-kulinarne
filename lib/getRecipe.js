export default async function getRecipe(slug) {
  const res = await fetch(
    `https://archiwum-kulinarne.vercel.app/api/recipes/${slug}`
  );
  if (!res.ok) {
    // !! zrobic return success false
    // throw new Error(`Failed to fetch recipe | ${slug}`);

    return res.json({ error: `Failed to fetch recipe | ${slug}` });
  }

  return res.json();
}
