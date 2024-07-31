import { GenericFilter } from './generic_filter.interface';
import { QueryConstants } from '../constants/query.constants';

interface IRecipeFilter {
    name: string;
    ingredients: string;
  }
  
class RecipeFilter extends GenericFilter<IRecipeFilter> {
    byName(name: string): this {
      return this.addCondition('name', name, QueryConstants.CONTAIN);
    }
}

export { RecipeFilter };