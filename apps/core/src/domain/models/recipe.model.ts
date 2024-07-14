class RecipeIngredient {
  recipeId: string;
  ingredientId: string;
  quantity: string;
  processing_method?: string;
  quantity_measurement?: string;
}

class RecipeSkill {
  recipeId: string;
  skillId: string;
}

export class Recipe {
  id: string;
  name: string;
  ingredients: RecipeIngredient[];
  origin: string;
  steps_to_produce: string[];
  recipeSkills: RecipeSkill[];
}