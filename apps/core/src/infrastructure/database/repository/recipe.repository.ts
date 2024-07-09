import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service'; // Assume this service encapsulates Prisma client
import { IRecipeEntity } from '@core/domain/interfaces/recipeEntity.interface';
import { Recipe } from '@core/domain/models/recipe.model';

@Injectable()
export class RecipeRepository implements IRecipeEntity {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Recipe[]> {
    const recipes = await this.databaseService.prisma.recipe.findMany();
    const result = recipes.map(recipe => new Recipe(recipe.id, recipe.title, 
        recipe.ingredients, recipe.instructions
    ));
    return result;
  }

  // Implement other methods (findById, create, update, delete) similarly
}