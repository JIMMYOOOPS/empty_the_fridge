import { IUserIngredients } from "@core/application/interface/user_ingredients.interface";
import { TargetAudience, RecipeJSONProperty } from "@core/domain/constants/recipe_transformer";

export function prommptGeneratorTransformer(userIngredients: IUserIngredients): string {
    const { ingredients } = userIngredients;
    // Transform user ingredients into prompt for recipe generator
    // Create target audience prompt
    const targetAudiencePrompt = `As a ${TargetAudience} looking to make use of the remaining ingredients in your fridge, your task is to generate a recipe.`
    // Create ingredient prompt
    const nextIngredients = ingredients.map( ingredient => 
        `${ingredient.name}${ingredient.part ? ` ${ingredient.part}` : ''}`
    ).join(', ');
    const ingredientPrompt = `The recipe must include the following ingredients: ${nextIngredients}.`
    // Response format prompt for recipe generator
    const recipeResponseFormatPrompt = `Please format the recipe response as if it were JSON, including the following properties: ${RecipeJSONProperty}.`
    // Add constraints
    const constraignts = `Do not wrap the json codes in JSON markers like this`
    // Combine all prompts
    const prompt =  `${targetAudiencePrompt} ${ingredientPrompt} ${recipeResponseFormatPrompt}${constraignts}`;
    return prompt;
}
