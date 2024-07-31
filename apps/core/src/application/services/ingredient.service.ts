import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Ingredient } from '@core/domain/models/ingredient.model';
import { IngredientRepository } from '@core/infrastructure/database/repository/ingredient.repository';
import { ErrorMessages, ErrorType } from '@core/common/constants/error_messages';
import { PaginationResult } from '@core/shared/interface/paginator.interface';

@Injectable()
export class IngredientService {
  constructor(
    private readonly ingredientRepository: IngredientRepository
) {}

  async findIngredient(options: {
    size?: number;
    page?: number;
    filter: Record<string, any>;
  }): Promise<PaginationResult<Ingredient>> {
    try {
      return this.ingredientRepository.paginateIngredient(options);
    } catch (error) {
      throw new HttpException(ErrorMessages[ErrorType.General.InternalServerError], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: string): Promise<Ingredient> {
    try {
      const ingredient = await this.ingredientRepository.findById(id);
      if (!ingredient) {
        throw new HttpException(ErrorMessages[ErrorType.Ingredient.NotFound], HttpStatus.NOT_FOUND);
      }
      return this.ingredientRepository.findById(id);
    } catch (error) {
      if (error instanceof HttpException)  {
        throw error;
      }
      throw new HttpException(ErrorMessages[ErrorType.General.InternalServerError], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // Add other methods (findById, create, update, delete) similarly
}