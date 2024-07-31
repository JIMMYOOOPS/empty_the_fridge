import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IUserIngredients } from "@core/application/interface/user_ingredients.interface";
import { promptRecipeGeneratorTransformer } from "@core/domain/transformer/recipe_generator.transformer";
import { GenAIService } from "@core/infrastructure/external_services/gen_ai_service/gen_ai.service";
import { IRecipe } from "@core/domain/interfaces/recipe.interface";
import { Logger } from "@nestjs/common";
import { ErrorType, ErrorMessages } from "@core/common/constants/error_messages";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { RecipeDto } from "../dto/recipe.dto";

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
            const recipe = JSON.parse(transformedRecipe);
            // calories and cookingTime are returned as string from AI
            const updatedRecipe = {
                ...recipe,
                calories: parseInt(recipe.calories),
                cookingTime: parseInt(recipe.cookingTime)
            }
            if (!await this.validateRecipe(updatedRecipe)) {
                throw new HttpException(ErrorMessages[ErrorType.Recipe.InvalidRecipeFromGenAI], HttpStatus.BAD_REQUEST);
            }
            this.logger.log(`Recipe: ${JSON.stringify(updatedRecipe)}`);
            return updatedRecipe;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            this.logger.error(`Failed to transform the recipe: ${error}`);
            throw new HttpException(ErrorMessages[ErrorType.Recipe.TransformRecipeFailed], HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async validateRecipe(recipe: IRecipe): Promise<boolean> {
        // Validate if recipe is coherent with IRecipe
        const recipeObj = plainToClass(RecipeDto, recipe);
        // Returns array of errors if any
        const errors = await validate(recipeObj);
        this.logger.log(`Recipe validation errors: ${JSON.stringify(errors, null, 2)}`);
        return errors.length === 0;
    }
}