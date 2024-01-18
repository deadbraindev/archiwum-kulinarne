/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RecipeCardSmall from './RecipeCardSmall';
import {
  categoryHeaderColorPicker,
  recipeNameToHumanName,
} from './RecipeUtilities';

export default function RecipeForm(props) {
  const { recipeData } = props;
  // console.log(recipeData?.tags);
  const [recipe, setRecipe] = useState(recipeData, {
    description: recipeData?.description || '',
    tags: recipeData?.tags || '',
  });
  //   console.log('🚀 ~ RecipeForm ~ recipe:', recipe);
  const handleInputChange = (stageIndex, inputType, inputValue) => {
    const updatedRecipe = { ...recipe };
    updatedRecipe.stages.items[stageIndex][inputType] = inputValue;
    setRecipe(updatedRecipe);
  };

  const handleAddStage = () => {
    const updatedRecipe = { ...recipe };
    updatedRecipe.stages.items.push({
      title: '',
      ingredients: [''],
      preparing: '',
      GPTdescription: '', // Dodano pole GPTdescription
    });
    setRecipe(updatedRecipe);
  };

  const handleRemoveStage = (stageIndex) => {
    const updatedRecipe = { ...recipe };
    updatedRecipe.stages.items.splice(stageIndex, 1);
    setRecipe(updatedRecipe);
  };

  const handleAddIngredient = (stageIndex) => {
    const updatedRecipe = { ...recipe };
    updatedRecipe.stages.items[stageIndex].ingredients.push('');
    setRecipe(updatedRecipe);
  };

  const handleRemoveIngredient = (stageIndex, ingredientIndex) => {
    const updatedRecipe = { ...recipe };
    updatedRecipe.stages.items[stageIndex].ingredients.splice(
      ingredientIndex,
      1
    );
    setRecipe(updatedRecipe);
  };
  const handleImageChange = (imageIndex, e) => {
    const updatedRecipe = { ...recipe };
    updatedRecipe.images.items[imageIndex].src = e.target.value;
    setRecipe(updatedRecipe);
  };
  const handleAddImage = () => {
    const updatedRecipe = { ...recipe };
    updatedRecipe.images.items.push({ src: '' });
    setRecipe(updatedRecipe);
  };
  const handleRemoveImage = (imageIndex) => {
    const updatedRecipe = { ...recipe };
    updatedRecipe.images.items.splice(imageIndex, 1);
    setRecipe(updatedRecipe);
  };

  const convertRecipeData = () => {
    const convertedStages = recipe.stages.items
      .map((stage) => {
        const nonEmptyIngredients = stage.ingredients.filter(
          (ingredient) => ingredient.trim() !== ''
        );
        return nonEmptyIngredients.length > 0
          ? {
              title: stage.title || '',
              ingredients: nonEmptyIngredients,
              preparing: stage.preparing || '(?)',
              GPTpreparing: stage.GPTdescription || '',
            }
          : undefined; // Exclude the stage if it has no non-empty ingredients
      })
      .filter(Boolean); // Remove undefined stages

    const convertedImages =
      recipe.images?.items
        .filter((image) => image.src.trim() !== '') // Filter out images with empty sources
        .map((image) => ({
          original: image.src,
          thumbnail: `${image.src.replace('.jpg', '')}.md.jpg`,
        })) || [];
    let convertedTags = [];

    if (recipe.tags) {
      if (typeof recipe.tags === 'string') {
        convertedTags = recipe.tags.split(',').map((tag) => tag.trim());
      } else if (Array.isArray(recipe.tags)) {
        convertedTags = recipe.tags.map((tag) =>
          typeof tag === 'string' ? tag.trim() : tag
        );
      }
    }
    return {
      name: recipe.name,
      stages: convertedStages,
      images: convertedImages,
      category: recipe.category,
      slug: recipe.slug.slugCurrent,
      star: recipe.star || 0,
      description: recipe.description || '',
      tags: convertedTags,
    };
  };

  const handleSave = async () => {
    const convertedData = convertRecipeData();

    try {
      const response = await fetch('http://localhost:3000/api/recipes', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(convertedData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Recipe updated successfully:', responseData);
        // Add any additional logic you want after a successful update
      } else {
        const errorData = await response.json();
        console.error('Failed to update recipe:', errorData);
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };
  return (
    <div>
      <h2>Edit Recipe</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={recipe.name}
          onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
        />
        <br />
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          value={recipe.category}
          onChange={(e) => setRecipe({ ...recipe, category: e.target.value })}
        />
        <div className="EditStages">
          {recipe.stages.items.map((stage, stageIndex) => (
            <div key={stageIndex} className="EditStage">
              <h3>Stage {stageIndex + 1}</h3>
              <label htmlFor={`title-${stageIndex}`}>Title:</label>
              <input
                type="text"
                id={`title-${stageIndex}`}
                value={stage.title || ''}
                onChange={(e) =>
                  handleInputChange(stageIndex, 'title', e.target.value)
                }
              />
              <br />

              <label>Ingredients:</label>
              <ul>
                {stage.ingredients.map((ingredient, ingredientIndex) => (
                  <li key={ingredientIndex}>
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) =>
                        handleInputChange(stageIndex, 'ingredients', [
                          ...stage.ingredients.slice(0, ingredientIndex),
                          e.target.value,
                          ...stage.ingredients.slice(ingredientIndex + 1),
                        ])
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveIngredient(stageIndex, ingredientIndex)
                      }
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
              <br />

              <button
                type="button"
                onClick={() => handleAddIngredient(stageIndex)}
              >
                Add Ingredient
              </button>
              <br />

              <label htmlFor={`preparing-${stageIndex}`}>Preparing:</label>
              <textarea
                id={`preparing-${stageIndex}`}
                className="EditPreparing"
                value={stage.preparing || ''}
                onChange={(e) =>
                  handleInputChange(stageIndex, 'preparing', e.target.value)
                }
              />
              <br />
              <label htmlFor={`GPTdescription-${stageIndex}`}>
                GPT Description:
              </label>
              <textarea
                className="EditPreparing"
                id={`GPTdescription-${stageIndex}`}
                value={stage.GPTdescription || ''}
                onChange={(e) =>
                  handleInputChange(
                    stageIndex,
                    'GPTdescription',
                    e.target.value
                  )
                }
              />
              <button
                type="button"
                onClick={() => handleRemoveStage(stageIndex)}
              >
                Remove Stage
              </button>
            </div>
          ))}
          {/* <pre className="EditStage">{JSON.stringify(recipe, null, 2)}</pre>
          <pre className="EditStage">
            {JSON.stringify(recipe.stages, null, 2)}
          </pre> */}
          <div className="EditStage">
            <span>{recipe.name}</span>
            {recipe.stages.items.map((stage, index) => (
              <div key={index}>
                <h2>{stage.title}</h2>

                {stage.ingredients.map((ingredient, i) => (
                  <>
                    <span key={i}>- {ingredient}</span>
                    <br />
                  </>
                ))}

                <p>{stage.preparing}</p>
              </div>
            ))}
          </div>
        </div>
        <br />

        <button type="button" onClick={handleAddStage}>
          Add Stage
        </button>
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={recipe.description}
          onChange={(e) =>
            setRecipe({ ...recipe, description: e.target.value })
          }
        />
        <br />

        <label htmlFor="tags">Tags (comma-separated):</label>
        <input
          type="text"
          id="tags"
          value={recipe.tags}
          onChange={(e) => setRecipe({ ...recipe, tags: e.target.value })}
        />
        <br />

        {recipe.images?.items.map((image, imageIndex) => (
          <div key={imageIndex}>
            <label htmlFor={`image-original-${imageIndex}`}>
              Image Original url:
            </label>
            <input
              type="text"
              id={`image-original-${imageIndex}`}
              value={image.src}
              onChange={(e) => handleImageChange(imageIndex, e)}
            />
            <button type="button" onClick={() => handleRemoveImage(imageIndex)}>
              X
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddImage}>
          Add Image
        </button>
        {/* <br /> */}
        <br />

        <label htmlFor="slug">Slug:</label>
        <input
          type="text"
          id="slug"
          value={recipe.slug.slugCurrent}
          onChange={(e) =>
            setRecipe({
              ...recipe,
              slug: { slugCurrent: e.target.value },
            })
          }
        />
        <br />

        <label htmlFor="star">Star (0-3):</label>
        <input
          type="number"
          id="star"
          value={recipe.star}
          min={0}
          max={3}
          onChange={(e) =>
            setRecipe({ ...recipe, star: parseInt(e.target.value, 10) })
          }
        />
        <br />

        {/* <button type="button" onClick={() => console.log(convertRecipeData())}>
          Save
        </button> */}
        <button
          type="button"
          onClick={() => {
            console.log(convertRecipeData());
            // handleSave();
          }}
        >
          Save
        </button>
      </form>

      <RecipeCardSmall
        slug={recipe.slug.slugCurrent}
        name={recipeNameToHumanName(recipe.name, recipe.slug.slugCurrent)}
        category={recipe.category}
        star={recipe.star}
      />
      <div className="RC">
        <p className="RCcategory RCcategoryPadding">
          <span className="RCcategorySeparator">{'>'}</span>
          <Link className="RCcategoryLink" href="/przepisy" scroll>
            przepisy
          </Link>
          <span className="RCcategorySeparator">{'>'}</span>
          <Link
            className="RCcategoryLink"
            href={`/przepisy?kategoria=${recipe.category}`}
          >
            {recipe.category}
          </Link>
          <span className="RCcategorySeparator">{'>'}</span>
          <Link
            className="RCcategoryLink active"
            href={`/przepisy/${recipe.slug.slugCurrent}`}
          >
            {recipe.slug.slugCurrent}
          </Link>
        </p>
        <div
          className={`RCheader ${categoryHeaderColorPicker(recipe.category)}`}
        >
          <h1 className="RCname">
            {recipeNameToHumanName(recipe.name, recipe.slug.slugCurrent)}
          </h1>
        </div>

        {recipe.stages?.items.map((stage, i) => (
          <section className="RCstage" key={stage.index}>
            {stage.title && (
              <h2 className="RCstageTitle">
                {i + 1}. {stage.title}
              </h2>
            )}
            <div className="RCing">
              <h3 className="RCstageIngredients">Składniki:</h3>
              <ul className="RCingredientsList">
                {stage.ingredients.map((ingredient) => (
                  <li key={ingredient + i}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="RCprep">
              {stage.preparing && (
                <h3 className="RCstagePreparing">Przygotowanie:</h3>
              )}
              <p className="RCpreparing">{stage.preparing}</p>
            </div>
          </section>
        ))}
      </div>

      <div className="RCimageContainer">
        {recipe.images?.size > 0 ? (
          recipe.images?.items.map((image) => (
            <Link href={image.src} target="blank" key={image.src}>
              <div className="RCimage">
                <Image
                  src={image.src}
                  alt="zeskanowany dokument, odręcznie pisany przepis kulinarny"
                  fill
                  sizes="(max-width: 768px) 70vw, (max-width: 900px) 50vw, 30vw"
                  quality={60}
                  // unoptimized
                  priority
                  className="RCimageSrc"
                />
              </div>
            </Link>
          ))
        ) : (
          <div className="RCimage">
            <Image alt="handwritten recipe" className="RCimageSrc" />
          </div>
        )}
      </div>
      <pre>{JSON.stringify(recipe, null, 2)}</pre>
    </div>
  );
}
