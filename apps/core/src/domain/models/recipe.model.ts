import { Ingredient } from './ingredient.model';

class RecipeIngredient {
  recipeId: string;
  ingredientId: string;
  quantity: string;
  processingMethod?: string;
  quantityMeasurement?: string;
  ingredient: Ingredient;
}

class RecipeSkill {
  recipeId: string;
  skillId: string;
  skill: Skill;
}

class Recipe {
  name: string;
  origin: string;
  stepsToProduce: string[];
  calories: number;
  cookingTime: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

class Skill {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

class JoinedRecipe extends Recipe {
  ingredients: RecipeIngredient[];
  skillsRequired: RecipeSkill[];
}

class RestructuredRecipe extends Recipe {
  name: string;
  origin: string;
  stepsToProduce: string[];
  ingredients: {
    recipeId: string;
    ingredientId: string;
    name: string;
    type: string;
    quantity: string;
    quantityMeasurement?: string;
    processingMethod?: string;
  }[];
  skillsRequired: {
    recipeId: string;
    skillId: string;
    name: string;
  }[];
}

export {
  RecipeIngredient,
  RecipeSkill,
  Recipe,
  JoinedRecipe,
  RestructuredRecipe
}