import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service'; // Assume this service encapsulates Prisma client
import { IRecipeEntity } from '@core/domain/interfaces/recipe_entity.interface';
import { Recipe } from '@core/domain/models/recipe.model';
import { PaginationResult } from '@core/shared/interface/paginator.interface';

@Injectable()
export class RecipeRepository implements IRecipeEntity {
  constructor(private readonly databaseService: DatabaseService) {}

  async paginateRecipe(options: {
    size?: number;
    page?: number;
  } = {
  }): Promise<PaginationResult<Recipe>> {
    const { size = 10, page = 1 } = options
    const result = await this.databaseService.prisma.recipe.paginate(
      {
        orderBy: {
          createdAt: 'desc',
        },
        include: undefined
      },
      {
        size,
        page,
      },
    );

    return result;
  }

  // Implement other methods (findById, create, update, delete) similarly
}