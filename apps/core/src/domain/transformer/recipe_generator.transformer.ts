import { IUserIngredients, IUserIngredient } from "@core/application/interface/user_ingredients.interface";
import { TargetAudience, RecipeJSONProperty, RecipeJSONPropertyExample, PromptConstraint } from "@core/domain/constants/recipe_transformer";
import { generate } from "rxjs";

/**
 * Generate a prompt for the recipe generator transformer
 * @param userIngredients - The user ingredients
 * @returns The prompt for the recipe generator transformer
*/
export function promptRecipeGeneratorTransformer(userIngredients: IUserIngredients): string {
    const { ingredients } = userIngredients;
    // Generate prompts
    const targetAudiencePrompt = generateTargetAudiencePrompt();
    const ingredientPrompt = generateIngredientPrompt(ingredients);
    const originPrompt = userIngredients.origin ? generateOriginPrompt(userIngredients.origin) : '';
    const caloriesPrompt = generateCaloriesPrompt();
    const cookingTimePrompt = generateCookingTimePrompt();
    const recipeResponseFormatPrompt = generateRecipeResponseFormatPrompt();
    const recipeResponseExamplePrompt = generateRecipeResponseExamplePrompt();
    const constraint = generatePromptConstraint();
    // Combine all prompts
    const prompt =  `${targetAudiencePrompt} ${ingredientPrompt} ${originPrompt} ${caloriesPrompt} ${cookingTimePrompt} ${recipeResponseFormatPrompt} ${recipeResponseExamplePrompt} ${constraint}`;
    return prompt;
}

function generateTargetAudiencePrompt(): string {
    return `As a ${TargetAudience} looking to make use of the remaining ingredients in your fridge, your task is to generate a recipe.`
}

function generateIngredientPrompt(ingredients: IUserIngredient[]): string {
    const nextIngredients = ingredients.map( ingredient => 
        `${ingredient.name}${ingredient.part ? ` ${ingredient.part}` : ''}`
    ).join(', ');
    return `The recipe must include the following ingredients: ${nextIngredients}.`
}

function generateOriginPrompt(origin: string): string {
    return `The recipe should be inspired by ${origin}.`
}

function generateCaloriesPrompt(): string {
    return `The recipe should include the calories.`
}

function generateCookingTimePrompt(): string {
    return `The recipe should include the minutes required for preparation and cooking as cookingTime.`
}

function generateRecipeResponseFormatPrompt(): string {
    return `Format the recipe response as if it were JSON, including the following properties: ${RecipeJSONProperty.join(', ')}.`
}

function generateRecipeResponseExamplePrompt(): string {
    return `An example of the response is as follow ${JSON.stringify(RecipeJSONPropertyExample)}.`
}

function generatePromptConstraint(): string {
    return `Please note the following constraints: ${PromptConstraint.jsonMarkers} ${PromptConstraint.emptyFields} ${PromptConstraint.quantityMeasurement} ${PromptConstraint.lowerCase} ${PromptConstraint.ingredientSingularity}`
}