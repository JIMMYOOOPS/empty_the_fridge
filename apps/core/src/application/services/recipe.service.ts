import { Injectable } from '@nestjs/common';
import { Recipe } from '../../domain/models/recipe.model';
import { PaginationResult } from '../../shared/interface/paginator.interface';
import { RecipeRepository } from '@core/infrastructure/database/repository/recipe.repository';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async findRecipe(): Promise<PaginationResult<Recipe>> {
    return this.recipeRepository.paginateRecipe();
  }

  // Add other methods (findById, create, update, delete) similarly
}