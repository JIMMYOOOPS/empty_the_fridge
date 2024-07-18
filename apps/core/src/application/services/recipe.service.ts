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
    filter: Record<string, any>;
  }): Promise<PaginationResult<Recipe>> {
    return this.recipeRepository.paginateRecipe(options);
  }

  async findById(id: string): Promise<Recipe> {
    return this.recipeRepository.findRecipeById(id);
  }

  // Add other methods (findById, create, update, delete) similarly
}