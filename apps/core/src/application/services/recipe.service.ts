import { Injectable } from '@nestjs/common';
import { Recipe } from '../../domain/models/recipe.model';
import { RecipeRepository } from '@core/infrastructure/database/repository/recipe.repository';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async findAll(): Promise<Recipe[]> {
    return this.recipeRepository.findAll();
  }

  // Add other methods (findById, create, update, delete) similarly
}