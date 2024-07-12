import { Injectable } from "@nestjs/common";
import { IUserIngredients } from "@core/application/interface/user_ingredients.interface";
import { prommptGeneratorTransformer } from "@core/domain/transformer/recipe_generator.transformer";
import { GenAIService } from "@core/infrastructure/external_services/gen_ai_service/gen_ai.service";

@Injectable()
export class RecipeTransformationService {
    constructor(
        private genAIService: GenAIService
    ) {}
    async transformRecipe(userIngredients: IUserIngredients): Promise<string> {
        const prompt = prommptGeneratorTransformer(userIngredients);
        const transformedRecipe = await this.genAIService.generateText(prompt);
        const recipe = JSON.parse(transformedRecipe);
        
        return recipe;
    }
}