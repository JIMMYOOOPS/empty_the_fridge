import { Injectable } from '@nestjs/common';
import { Recipe } from '../../domain/models/recipe.model';
import { PaginationResult } from '../../shared/interface/paginator.interface';
import { RecipeRepository } from '@core/infrastructure/database/repository/recipe.repository';
import { IngredientRepository } from '@core/infrastructure/database/repository/ingredient.repository';

@Injectable()
export class IngredientService {
  constructor(
    private readonly ingredientRepository: IngredientRepository
) {}

  async findIngredient(options: {
    size?: number;
    page?: number;
    filter: Record<string, any>;
  }): Promise<any> {
    return this.ingredientRepository.paginateIngredient(options);
  }

  async findById(id: string): Promise<any> {
    // return this.recipeRepository.findRecipeById(id);
    return 'findIngredientById';
  }

  // Add other methods (findById, create, update, delete) similarly
}