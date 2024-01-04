import { categoryValidator } from './validators/categoryValidator';
import { searchValidator } from './validators/searchValidator';

// const URL = 'https://archiwum-kulinarne.vercel.app/api/recipes';
// const URL = 'http://localhost:3000/api/recipes';

export default async function getRecipes([
  url,
  page,
  search,
  category,
  sort,
  pagesize,
]) {
  if (!searchValidator(search)) {
    if (categoryValidator(category)) {
      const res = await fetch(
        `${url}?category=${category}&page=${page}&sort=${sort}&pagesize=${pagesize}`
      );
      return res.json();
    }
    const res = await fetch(
      `${url}?page=${page}&sort=${sort}&pagesize=${pagesize}`
    );
    return res.json();
  }
  if (searchValidator(search)) {
    if (categoryValidator(category)) {
      const res = await fetch(
        `${url}?category=${category}&page=${page}&search=${search}&sort=${sort}&pagesize=${pagesize}`
      );
      return res.json();
    }
    const res = await fetch(
      `${url}?page=${page}&search=${search}&sort=${sort}&pagesize=${pagesize}`
    );
    return res.json();
  }
  return null;
}
