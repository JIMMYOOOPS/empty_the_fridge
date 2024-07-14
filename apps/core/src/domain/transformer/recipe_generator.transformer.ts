import { IUserIngredients, IUserIngredient } from "@core/application/interface/user_ingredients.interface";
import { TargetAudience, RecipeJSONProperty, RecipeJSONPropertyExample, PromptConstraint } from "@core/domain/constants/recipe_transformer";

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
    const originPrompt = generateOriginPrompt(userIngredients.origin);
    const recipeResponseFormatPrompt = generateRecipeResponseFormatPrompt();
    const recipeResponseExamplePrompt = generateRecipeResponseExamplePrompt();
    const constraint = generatePromptConstraint();
    // Combine all prompts
    const prompt =  `${targetAudiencePrompt} ${ingredientPrompt} ${originPrompt} ${recipeResponseFormatPrompt} ${recipeResponseExamplePrompt} ${constraint}`;
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

function generateRecipeResponseFormatPrompt(): string {
    return `Please format the recipe response as if it were JSON, including the following properties: ${RecipeJSONProperty.join(', ')}.`
}

function generateRecipeResponseExamplePrompt(): string {
    return `An example of the response is as follow ${JSON.stringify(RecipeJSONPropertyExample)}.`
}

function generatePromptConstraint(): string {
    return `Please note that ${PromptConstraint.json_markers} ${PromptConstraint.empty_fields} ${PromptConstraint.quantity}`
}