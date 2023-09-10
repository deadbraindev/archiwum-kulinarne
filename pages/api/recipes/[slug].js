import NextCors from 'nextjs-cors';
import dbConnect from '../../../lib/dbConnect';
import Recipe from '../../../models/Recipe';

export default async function handler(req, res) {
  //   const URL = 'https://archiwumkulinarne.deadbrain.dev';

  const {
    query: { slug },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        await NextCors(req, res, {
          methods: ['GET'],
          origin: [
            'https://archiwumkulinarne.deadbrain.dev',
            'http://localhost:3000',
          ],
          optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        let recipe = false;
        if (slug === 'random') {
          const count = await Recipe.countDocuments(); // Pobierz liczbę przepisów w kolekcji
          const randomIndex = Math.floor(Math.random() * count); // Wylosuj indeks
          recipe = await Recipe.findOne().skip(randomIndex);
        } else {
          recipe = await Recipe.findOne({ slug }).select('-__v'); // znalezienie przepisu po slug
        }
        if (recipe) {
          const prettyImagesArray =
            recipe.images !== null
              ? recipe.images.map((image, i) => ({
                  index: i,
                  thumbnail: image.thumbnail,
                  src: image.original,
                  alt: 'handwritten recipe, scan',
                }))
              : '';

          const prettyStagesArray = recipe.stages.map((stage, i) => ({
            index: i,
            title: stage.title || null,
            ingredients: stage.ingredients,
            preparing: stage.preparing,
          }));

          const result = {
            success: true,
            id: recipe._id,
            name: recipe.name,
            slug: {
              slugCurrent: recipe.slug,
              slugHistory: recipe.slug_history,
            },
            path: `/api/recipes/${recipe.slug}`,
            origin: '/api/recipes',
            category: recipe.category,
            stages: {
              size: prettyStagesArray.length,
              items: prettyStagesArray,
            },
            images: {
              size: prettyImagesArray.length,
              items: prettyImagesArray,
            },
            timestamps: {
              createdAt: recipe.createdAt,
              updatedAt: recipe.updatedAt,
            },
          };

          res.status(200).json(result);
        } else
          res.status(404).json({
            success: false,
            error: {
              _message: 'Recipe does not exist',
              name: 'QueryError',
              message: 'Recipe query error: slug: Recipe does not exist',
            },
          });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'PUT' /* Edit a model by its ID */:
      //   try {
      //     const pet = await Pet.findByIdAndUpdate(id, req.body, {
      //       new: true,
      //       runValidators: true,
      //     })
      //     if (!pet) {
      //       return res.status(400).json({ success: false })
      //     }
      //     res.status(200).json({ success: true, data: pet })
      //   } catch (error) {
      //     res.status(400).json({ success: false })
      //   }
      break;

    case 'DELETE' /* Delete a model by its ID */:
      //   try {
      //     const deletedPet = await Pet.deleteOne({ _id: id });
      //     if (!deletedPet) {
      //       return res.status(400).json({ success: false });
      //     }
      //     res.status(200).json({ success: true, data: {} });
      //   } catch (error) {
      //     res.status(400).json({ success: false });
      //   }
      // try {
      //   const deletedRecipe = await Recipe.findOneAndDelete({
      //     slug,
      //   });
      //   res.status(200).json({ success: true, deletedRecipe });
      // } catch (err) {
      //   res.status(400).json(`deleteRecipe.controller | ${err}`);
      // }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
