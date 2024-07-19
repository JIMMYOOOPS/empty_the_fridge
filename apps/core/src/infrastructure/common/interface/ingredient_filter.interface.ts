import { GenericFilter } from './generic_filter.interface';
import { QueryConstants } from '../constants/query.constants';

interface IIngredientFilter {
    name: string;
    type: string;
  }
  
class IngredientFilter extends GenericFilter<IIngredientFilter> {
    name: string;
    type: string;
    constructor(name?: string, type?: string) {
        super();
        this.name = name;
        this.type = type;
    }
    byName(name: string): this {
      return this.addCondition('name', name, QueryConstants.CONTAIN);
    }
    byType(type: string): this {
      return this.addCondition('type', type, QueryConstants.EQUAL);
    }
}

export { IngredientFilter };