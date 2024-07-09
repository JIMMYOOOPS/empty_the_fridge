import { Recipe } from '../models/recipe.model';

export interface IRecipeEntity {
  findAll(): Promise<Recipe[]>;
//   findById(id: string): Promise<Recipe | null>;
//   create(recipe: Recipe): Promise<Recipe>;
//   update(id: string, recipe: Recipe): Promise<Recipe>;
//   delete(id: string): Promise<void>;
}