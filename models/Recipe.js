import { Schema, model, models } from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';
import limax from 'limax';

const recipeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Recipe must have a name'],
    validate: {
      validator(value) {
        return (
          value.toLowerCase() !== 'random' && value.toLowerCase() !== 'daily'
        ); // Sprawdza, czy tytuł nie jest "random"
      },
      // message: 'Tytuł przepisu nie może być "random".',
    },
  },
  stages: [
    {
      title: {
        type: String,
      },
      ingredients: [
        {
          type: String,
        },
      ],
      preparing: {
        type: String,
      },
    },
  ],
  images: [
    {
      original: {
        type: String,
      },
      thumbnail: {
        type: String,
      },
    },
  ],
  description: { type: String },
  tags: [
    {
      type: String,
    },
  ],

  // TODO dodac custom error message
  category: {
    type: String,
    enum: [
      'ciasta',
      'slodkie',
      'salatki',
      'soki',
      'obiadowe',
      'przetwory',
      'ryby',
      'drinki',
      'lody',
      'fastfood',
      'inne',
    ],
    required: [true, 'Recipe must have a category'],
  },
});

recipeSchema.set('timestamps', true);

// monguse-slug-plugin
recipeSchema.plugin(mongooseSlugPlugin, {
  errorMessage: 'slug errrr',
  tmpl: '<%=name%>',
  slug: limax,
});
// recipeSchema.plugin(mongoosePaginate);

export default models.Recipe || model('Recipe', recipeSchema);
