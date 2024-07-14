import { Injectable } from "@nestjs/common";
import { IUserIngredients } from "@core/application/interface/user_ingredients.interface";
import { promptRecipeGeneratorTransformer } from "@core/domain/transformer/recipe_generator.transformer";
import { GenAIService } from "@core/infrastructure/external_services/gen_ai_service/gen_ai.service";
import { IRecipe } from "@core/domain/interfaces/recipe.interface";

@Injectable()
export class RecipeTransformationService {
    constructor(
        private genAIService: GenAIService
    ) {}
    async transformRecipe(userIngredients: IUserIngredients): Promise<IRecipe> {
        const prompt = promptRecipeGeneratorTransformer(userIngredients);
        const transformedRecipe = await this.genAIService.generateText(prompt);
        const recipe: IRecipe = JSON.parse(transformedRecipe);
        return recipe;
    }
}