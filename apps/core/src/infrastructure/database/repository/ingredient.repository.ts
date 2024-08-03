import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { IIngredientEntity } from '@core/domain/interfaces/ingredient_entity.interface';
import { PaginationResult } from '@core/shared/interface/paginator.interface';
import { ErrorMessages, ErrorType } from '@core/common/constants/error_messages';
import { IngredientFilter } from '@core/infrastructure/common/interface/ingredient_filter.interface';
import { Ingredient } from '@core/domain/models/ingredient.model';
import { Ingredient as IIngredient } from '@core/domain/interfaces/recipe.interface';
import { GetBatchResult } from '@prisma/client/runtime/library';

@Injectable()
export class IngredientRepository implements IIngredientEntity {
  private readonly logger = new Logger(IngredientRepository.name);
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

    async paginateIngredient(options: {
        size?: number;
        page?: number;
        filter: Record<string, any>;
    }): Promise<PaginationResult<Ingredient>> {
        try {
            const { size = 10, page = 1, filter } = options;
      
            const ingredientFilter = new IngredientFilter();
            filter?.name && ingredientFilter.byName(filter.name);
            filter?.type && ingredientFilter.byType(filter.type);
            const conditions = ingredientFilter.getConditions();
            
            const where  = conditions.length > 0 ? { where: {
              AND: conditions
            } } : {};
            
            const result = await this.databaseService.prisma.ingredient.paginate(
              {
                orderBy: {
                  recipesCount: 'desc',
                },
                include: undefined,
                ...where
              },
              {
                size,
                page,
              },
            );
        
            return {
              data: result.data,
              pagination: result.pagination
            }
          } catch (error) {
            this.logger.error(`Failed to paginate recipe: ${error}`);
            throw new HttpException(ErrorMessages[ErrorType.General.InternalServerError], HttpStatus.INTERNAL_SERVER_ERROR);
          }
    }

    async findById(id: string): Promise<Ingredient> {
      try {
        const ingredient = await this.databaseService.prisma.ingredient.findUnique({
          where: {
            id,
          },
        });
        return ingredient;
      } catch (error) {
        this.logger.error(`Failed to find ingredient by id: ${error}`);
        throw new HttpException(ErrorMessages[ErrorType.General.InternalServerError], HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    // Find Ingredients by name
    async findManyByName(name: string[]): Promise<Ingredient[]> {
      try {
        const ingredients = await this.databaseService.prisma.ingredient.findMany({
          where: {
            name: {
              in: name,
          },
          }
        });
        return ingredients;
      } catch (error) {
        this.logger.error(`Failed to find ingredients: ${error}`);
        throw new HttpException(ErrorMessages[ErrorType.General.InternalServerError], HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    // Create many ingredients
    async createMany(data: IIngredient[]): Promise<GetBatchResult> {
      try {
        const result = await this.databaseService.prisma.ingredient.createMany({
          data: data.map(({ name, type }) => ({ name, type }))
      });

        return result;
      } catch (error) {
        this.logger.error(`Failed to create many ingredients: ${error}`);
        throw new HttpException(ErrorMessages[ErrorType.General.InternalServerError], HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    async update(data: Record<string, any>): Promise<Ingredient> {
      try {
        const { name } = data;
        const ingredient = await this.databaseService.prisma.ingredient.update({
          where: {
            name,
          },
          data,
        });
        return ingredient;
      } catch (error) {
        this.logger.error(`Failed to update ingredient: ${error}`);
        throw new HttpException(ErrorMessages[ErrorType.General.InternalServerError], HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}