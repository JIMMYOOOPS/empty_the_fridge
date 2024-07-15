import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IUserIngredients } from "@core/application/interface/user_ingredients.interface";
import { promptRecipeGeneratorTransformer } from "@core/domain/transformer/recipe_generator.transformer";
import { GenAIService } from "@core/infrastructure/external_services/gen_ai_service/gen_ai.service";
import { IRecipe } from "@core/domain/interfaces/recipe.interface";
import { Logger } from "@nestjs/common";
import { ErrorType, ErrorMessages } from "@core/common/constants/error_messages";

@Injectable()
export class RecipeTransformationService {
    private logger = new Logger(RecipeTransformationService.name)
    constructor(
        private genAIService: GenAIService
    ) {}
    async transformRecipe(userIngredients: IUserIngredients): Promise<IRecipe> {
        try {
            const prompt = promptRecipeGeneratorTransformer(userIngredients);
            const transformedRecipe = await this.genAIService.generateText(prompt);
            const recipe: IRecipe = JSON.parse(transformedRecipe);
            this.logger.log(`Recipe: ${JSON.stringify(recipe)}`);
            return recipe;
        } catch (error) {
            this.logger.error(`Failed to transform the recipe: ${error}`);
            throw new HttpException(ErrorMessages[ErrorType.Recipe.TransformRecipeFailed], HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}