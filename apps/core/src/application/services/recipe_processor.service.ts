import { Injectable } from "@nestjs/common";
import { RecipeTransformationService } from "@core/domain/services/recipe_transformation.service";
import { IUserIngredients } from "@core/application/interface/user_ingredients.interface";

@Injectable()
export class RecipeProcessorService {
    constructor(
        private readonly recipeTransformationService: RecipeTransformationService
    ) {}

    async processRecipe(userIngredients: IUserIngredients) {
        const transformedRecipe = this.recipeTransformationService.transformRecipe(userIngredients);
        return transformedRecipe;
    }
}