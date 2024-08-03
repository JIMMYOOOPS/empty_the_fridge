import { GenericFilter } from './generic_filter.interface';
import { QueryConstants } from '../constants/query.constants';

interface IRecipeFilter {
    name: string;
    ingredient: string;
    origin: string;
    calories: number;
    cookingTime: number;
  }
  
class RecipeFilter extends GenericFilter<IRecipeFilter> {
    byName(name: string): this {
      return this.addCondition('name', name, QueryConstants.CONTAIN);
    }

    byOrigin(origin: string): this {
      return this.addCondition('origin', origin, QueryConstants.CONTAIN);
    }

    byCalories(calories: number): this {
      // find calories smaller than the given value
      console.log('calories', calories);
      return this.addCondition('calories', calories, QueryConstants.LESS_THAN);
    }

    byCookingTime(cookingTime: number): this {
      // find cooking time smaller than the given value
      return this.addCondition('cookingTime', cookingTime, QueryConstants.LESS_THAN);
    }
}

export { RecipeFilter };