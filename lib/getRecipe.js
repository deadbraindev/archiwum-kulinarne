// const URL = 'https://archiwumkulinarne.deadbrain.dev/api/recipes';
// const URL = 'http://localhost:3000/api/recipes';

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

// export default async function getRecipes([
//   url,
//   page,
//   search,
//   category,
//   sort,
//   pagesize,
// ]) {
//   if (!searchValidator(search)) {
//     if (categoryValidator(category)) {
//       const res = await fetch(
//         `${url}?category=${category}&page=${page}&sort=${sort}&pagesize=${pagesize}`
//       );
//       return res.json();
//     }
//     const res = await fetch(
//       `${url}?page=${page}&sort=${sort}&pagesize=${pagesize}`
//     );
//     return res.json();
//   }
//   if (searchValidator(search)) {
//     if (categoryValidator(category)) {
//       const res = await fetch(
//         `${url}?category=${category}&page=${page}&search=${search}&sort=${sort}&pagesize=${pagesize}`
//       );
//       return res.json();
//     }
//     const res = await fetch(
//       `${url}?page=${page}&search=${search}&sort=${sort}&pagesize=${pagesize}`
//     );
//     return res.json();
//   }
//   return null;
// }
