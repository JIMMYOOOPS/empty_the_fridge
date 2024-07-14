import { Injectable } from "@nestjs/common";
import { RecipeTransformationService } from "@core/domain/services/recipe_transformation.service";
import { IUserIngredients } from "@core/application/interface/user_ingredients.interface";
import { RecipeRepository } from "@core/infrastructure/database/repository/recipe.repository";

@Injectable()
export class RecipeProcessorService {
    constructor(
        private readonly recipeTransformationService: RecipeTransformationService,
        private readonly recipeRepository: RecipeRepository
    ) {}

    async processRecipe(userIngredients: IUserIngredients) {
        const transformedRecipe = this.recipeTransformationService.transformRecipe(userIngredients);
        // save the recipe to the database
        // const recipe = await this.recipeRepository.create(transformedRecipe);
        return transformedRecipe;
    }
}