import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { IIngredientEntity } from '@core/domain/interfaces/ingredient_entity.interface';
import { PaginationResult } from '@core/shared/interface/paginator.interface';
import { ErrorMessages, ErrorType } from '@core/common/constants/error_messages';
import { IngredientFilter } from '@core/infrastructure/common/interface/ingredient_filter.interface';
import { Ingredient } from '@core/domain/models/ingredient.model';

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
            const conditions = ingredientFilter.getConditions();
            const where  = conditions.length > 0 ? { AND: conditions } : {};
            const result = await this.databaseService.prisma.ingredient.paginate(
              {
                orderBy: {
                  createdAt: 'desc',
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
}