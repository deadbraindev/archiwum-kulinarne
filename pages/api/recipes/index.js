import NextCors from 'nextjs-cors';
import removeAccents from 'remove-accents';
import dbConnect from '../../../lib/dbConnect';
import Recipe from '../../../models/Recipe';

export default async function handler(req, res) {
  const URL = 'https://archiwumkulinarne.deadbrain.dev';
  // const URL = 'http://localhost:3000';

  const { method } = req;
  // console.log(method);

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        await NextCors(req, res, {
          methods: ['GET'],
          origin: [
            'https://archiwumkulinarne.deadbrain.dev',
            'http://localhost:3000',
            'https://archiwum-kulinarne.vercel.app',
          ],
          optionsSuccessStatus: 200,
        });

        // sprawdzanie czy parametr jest poprawny
        const paramSchema = ['category', 'page', 'search', 'sort', 'pagesize'];

        const validParams = Object.keys(req.query).map((param) => {
          if (paramSchema.includes(param)) return true;
          return false;
        });
        if (validParams.every(Boolean)) {
          // query do wyswietlania przepisow
          const paramSort =
            req.query.sort === 'za' ||
            req.query.sort === 'no' ||
            req.query.sort === 'on'
              ? req.query.sort
              : '';
          const paramPageSize = parseInt(req.query.pagesize, 10);

          const query = [
            { $match: { _id: { $exists: true } } }, // Dopasuj wszystko, jeśli nie ma parametru "sort" w zapytaniu
            (() => {
              switch (paramSort) {
                case 'za':
                  return { $sort: { slug: -1 } }; // Sortuj malejąco wg. pola "slug"
                case 'no':
                  return { $sort: { createdAt: 1 } }; // Sortuj rosnąco wg. pola "createdAt"
                case 'on':
                  return { $sort: { createdAt: -1 } }; //  Sortuj malejąco wg. pola "createdAt"
                default:
                  return { $sort: { slug: 1 } }; // Domyślne sortowanie rosnące wg. pola "slug"
              }
            })(),
          ];
          // CATEGORY
          // query do zliczania przepisow po filtracji
          let queryCount = { $and: [{ _id: { $exists: true } }] };
          if (req.query.search && req.query.search !== undefined) {
            const paramSearch = removeAccents(
              decodeURI(req.query.search)
                .toLowerCase()
                .trim()
                .replace(/\s+/g, ' ')
            );

            queryCount = {
              $and: [
                {
                  $or: [
                    { name: { $regex: paramSearch, $options: 'i' } },
                    { slug: { $regex: paramSearch } },
                    { slug_history: { $regex: paramSearch } },
                  ],
                },
              ],
            };
            query.push({
              $match: {
                $or: [
                  { name: { $regex: paramSearch, $options: 'i' } }, // matchuje po name i slug
                  { slug: { $regex: paramSearch } }, // matchuje po name i slug
                  { slug_history: { $regex: paramSearch } },
                ],
              },
            });
          }
          const validateRecipeCategory = [
            'ciasta',
            'drinki',
            'fastdood',
            'lody',
            'obiadowe',
            'przetwory',
            'ryby',
            'salatki',
            'slodkie',
            'soki',
          ];

          if (req.query.category && req.query.category !== undefined) {
            const paramCategory = req.query.category
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');
            if (validateRecipeCategory.includes(paramCategory)) {
              queryCount.$and.push({ category: { $regex: paramCategory } });
              query.push({
                $match: {
                  category: paramCategory,
                },
              });
            } else
              return res.status(400).json({
                success: false,
                error: {
                  errors: {
                    category: {
                      name: 'ValidatorError',
                      message: 'Category not found',
                    },
                  },
                  _message: 'Recipe validation failed',
                  name: 'ValidationError',
                  message:
                    'Recipe validation failed: category: Category not found',
                },
              });
          }
          const countAllRecipes = await Recipe.countDocuments(queryCount);
          if (countAllRecipes < 1) {
            res.status(404).json({
              success: false, //! czy tu ma byc false czy true
              error: {
                _message: 'No results found',
                name: 'QueryError',
                message: 'Recipe query error: No results found',
              },
            });
          } else {
            const page = req.query.page
              ? Math.max(parseInt(req.query.page, 10) - 1, 0)
              : 0;
            const perPage =
              !Number.isNaN(paramPageSize) &&
              paramPageSize >= 1 &&
              paramPageSize <= 32
                ? paramPageSize
                : 24;
            const allPages = Math.ceil(countAllRecipes / perPage - 1);
            const skip = perPage * page;
            query.push({ $skip: skip }, { $limit: perPage }); // paginacja

            const hasFilters = !!(
              (req.query.search && req.query.search !== undefined) ||
              (req.query.category && req.query.category !== undefined)
            );

            // # # # # # //
            // mongoose-paginate-v2
            // fajne, ale moj sposob do potestowania, jak beda problemy PRZEPISAC NA MONGOOSE-PAGINATE-V2
            // let option = {
            //     page: page,
            //     limit: 2,
            //     select: 'name',
            // }
            // const query2 = { name: { $regex: req.query.search }};
            // const paginatev2 = await Recipe.paginate(queryCount, option);
            // console.log(paginatev2);
            // mongoose-paginate-v2
            // # # # # # //

            if (Number.isNaN(page)) {
              res.status(400).json({
                success: false,
                error: {
                  errors: {
                    page: {
                      name: 'ValidatorError',
                      message: 'Page number must be a number',
                    },
                  },
                  _message: 'Page number must be a number',
                  name: 'ValidatorError',
                  message:
                    'Recipe validation failed: page: Page number must be a number',
                },
              });
            } else if (page > allPages) {
              res.status(404).json({
                success: false,
                error: {
                  _message: 'Page number does not exist',
                  name: 'QueryError',
                  message:
                    'Recipe query error: page: Page number does not exist',
                },
              });
            } else {
              const recipes = await Recipe.aggregate(query); // pobranie wszystkich przepisow

              const prettyRecipes = recipes.map((recipe, i, { length }) =>
                // map(jeden przepis, index, dlugosc tablicy)
                ({
                  index: i,
                  value: {
                    slug: {
                      slugCurrent: recipe.slug,
                      slugHistory: recipe.slug_history,
                    },
                    name: recipe.name,
                    id: recipe._id,
                    category: recipe.category,
                    stages: recipe.stages,
                    timestamps: {
                      createdAt: recipe.createdAt,
                      updatedAt: recipe.updatedAt,
                    },
                  },
                  // url: `${URL}/api/recipes/${recipe.slug}`,
                  path: `/api/recipes/${recipe.slug}`,
                  first: i === 0,
                  last: i === length - 1,
                })
              );

              const result = {
                success: true,
                count: countAllRecipes,
                numOfPages: allPages + 1,
                pageNumber: page + 1,
                showNextUrlLink: page !== allPages,
                showPreviousUrlLink: !!page,
                next:
                  page === allPages ? null : `${URL}/recipes?page=${page + 2}`,
                previous: page
                  ? `${URL}/recipes?page=${Math.max(page, 1)}`
                  : null,
                results: {
                  size: prettyRecipes.length,
                  tiles: prettyRecipes,
                },
                pageCanonicalLink: `${URL}/api/recipes`,
                resetFilter: URL,
                hasFilters,
                hasResults: true, // TODO zaimplementowac! czy to potrzebne???
              };
              res.status(200).json(result);
            }
          }
        } else {
          res.status(400).json({
            success: false,
            error: {
              errors: {
                query: req.query,
              },
              _message: 'Invalid query parameters',
              name: 'ValidatorError',
              message: 'Recipe validation failed: Invalid query parameters',
            },
          });
        }
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'POST':
      // if (
      //   req.body.name === null ||
      //   req.body.name === undefined ||
      //   req.body.name === ''
      // )
      //   return res.status(400).json({
      //     success: false,
      //     error: {
      //       errors: {
      //         name: {
      //           name: 'ValidatorError',
      //           message: 'Recipe must have a name',
      //           properties: {
      //             message: 'Recipe must have a name',
      //             type: 'required',
      //             path: 'name',
      //           },
      //           kind: 'required',
      //           path: 'name',
      //         },
      //       },
      //       _message: 'Recipe validation failed',
      //       name: 'ValidationError',
      //       message: 'Recipe validation failed: name: Recipe must have a name',
      //     },
      //   });

      // try {
      //   // name
      //   // stages
      //   /// title
      //   /// ingredients
      //   /// preparing
      //   //
      //   // TODO zrobic przekazywanie zalogowanego uzytkownika i zapisywanie go do danego przepisu pod createdBy
      //   // TODO normalizeUrl() https://www.npmjs.com/package/normalize-url
      //   // TODO hasImage???

      //   const recipe = new Recipe({
      //     name: req.body.name,
      //     stages: req.body.stages?.map((stage) => ({
      //       title: stage.title,
      //       ingredients: stage.ingredients,
      //       preparing: stage.preparing,
      //     })),
      //     images: req.body.images,
      //     category: req.body.category,
      //   });

      //   await recipe.save().then(() => {
      //     res.status(200).json({ success: true, recipe });
      //   });
      // } catch (error) {
      //   res.status(400).json({ success: false, error });
      // }
      break;
    default:
      res.status(400).json({
        success: false,
        message:
          'default case error message, nawet nie wiem kiedy to sie ma prawo wyswietlic',
      });
      break;
  }
  return null;
}
