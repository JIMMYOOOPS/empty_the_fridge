class RecipeIngredient {
  recipeId: string;
  ingredientId: string;
  type: string;
  quantity: string;
  processingMethod?: string;
  quantityMeasurement?: string;
}

class RecipeSkill {
  recipeId: string;
  skillId: string;
}

class Recipe {
  name: string;
  origin: string;
  stepsToProduce: string[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export {
  RecipeIngredient,
  RecipeSkill,
  Recipe
}