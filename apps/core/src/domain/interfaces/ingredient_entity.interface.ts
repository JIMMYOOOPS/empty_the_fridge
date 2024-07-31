import { PaginationResult } from '../../shared/interface/paginator.interface';

export interface IIngredientEntity {
    paginateIngredient(options: {
    size?: number;
    page?: number;
  }): Promise<PaginationResult<any>>;
}