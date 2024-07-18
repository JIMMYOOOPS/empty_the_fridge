import { GenericFilter } from './generic_filter.interface';
import { QueryConstants } from '../constants/query.constants';

interface IIngredientFilter {
    name: string;
    ingredients: string;
  }
  
class IngredientFilter extends GenericFilter<IIngredientFilter> {
    name: string;
    ingredients: string;
    constructor(name?: string, ingredients?: string) {
        super();
        this.name = name;
        this.ingredients = ingredients;
    }
    byName(name: string): this {
      return this.addCondition('name', name, QueryConstants.CONTAIN);
    }
}

export { IngredientFilter };