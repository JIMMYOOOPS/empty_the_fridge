import { Recipe } from '../models/recipe.model';
import { PaginationResult } from '../../shared/interface/paginator.interface';

export interface IRecipeEntity {
  paginateRecipe(options: {
    size?: number;
    page?: number;
  }): Promise<PaginationResult<Recipe>>;
//   findById(id: string): Promise<Recipe | null>;
//   create(recipe: Recipe): Promise<Recipe>;
//   update(id: string, recipe: Recipe): Promise<Recipe>;
//   delete(id: string): Promise<void>;
}