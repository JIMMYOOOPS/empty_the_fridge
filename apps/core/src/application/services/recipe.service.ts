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
    // remove undefined values from the filter object
    const nextOptions = {
      ...options,
      filter: this.getFilteredOptions(options).filter,
    };
    
    return this.recipeRepository.paginateRecipe(nextOptions);
  }

  async findById(id: string): Promise<Recipe> {
    return this.recipeRepository.findRecipeById(id);
  }

  // remove undefined values from the filter object
  getFilteredOptions(options: { filter: Record<string, any> }): { filter: Record<string, any> } {
    const filterOptions = options.filter;
    const entries = Object.entries(filterOptions);
    // Filter out entries with undefined values
    const filteredEntries = entries.filter(([key, value]) => value !== undefined);
    const filter = Object.fromEntries(filteredEntries);
    return { filter };
  }
}