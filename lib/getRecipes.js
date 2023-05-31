import { categoryValidator } from './validators/categoryValidator';
import { searchValidator } from './validators/searchValidator';

const URL = 'https://archiwum-kulinarne.vercel.app/api/recipes';
// const URL = 'http://localhost:3000/api/recipes';

export default async function getRecipes(page, search, category) {
  if (!searchValidator(search)) {
    if (categoryValidator(category)) {
      const res = await fetch(`${URL}?category=${category}&page=${page}`);
      return res.json();
    }
    const res = await fetch(`${URL}?page=${page}`);
    return res.json();
  }
  if (searchValidator(search)) {
    if (categoryValidator(category)) {
      const res = await fetch(
        `${URL}?category=${category}&page=${page}&search=${search}`
      );
      return res.json();
    }
    const res = await fetch(`${URL}?page=${page}&search=${search}`);
    return res.json();
  }
  return null;
}
