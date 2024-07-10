import { Injectable } from '@nestjs/common';
import { Recipe } from '../../domain/models/recipe.model';
import { PaginationResult } from '../../shared/interface/paginator.interface';
import { RecipeRepository } from '@core/infrastructure/database/repository/recipe.repository';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async findRecipe(options: {
    size?: number;
    page?: number;
  }): Promise<PaginationResult<Recipe>> {
    return this.recipeRepository.paginateRecipe(options);
  }

  // Add other methods (findById, create, update, delete) similarly
}