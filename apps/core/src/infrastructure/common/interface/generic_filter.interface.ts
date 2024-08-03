import { QueryConstants } from "../constants/query.constants";

interface IBaseFilter {
    where?: Record<string, any>;
  }

export class GenericFilter<T> implements IBaseFilter {
    where?: Record<keyof T, any>;
  
    constructor() {
      this.where = {} as Record<keyof T, any>;
    }
  
    addCondition(key: keyof T, value: any, conditionType: string): this {
      if (conditionType === QueryConstants.CONTAIN || conditionType === QueryConstants.EQUAL) {
        this.where[key] = {
          contains: value,
          mode: QueryConstants.INSENSITIVE, // case-insensitive
        };
      } else if (conditionType === QueryConstants.LESS_THAN) {
        this.where[key] = {
          lt: value,
        };
      }

      return this;
    }

    getConditions(): Record<string, any>[] {
      const conditions: Record<string, any>[] = [];
      Object.keys(this.where).forEach((key) => {
        const value = this.where[key];
        conditions.push({
          [key]: value,
        });
      }
      );
      return conditions;
    }
  }