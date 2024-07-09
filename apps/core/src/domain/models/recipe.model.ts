export class Recipe {
    constructor(
      public id: string,
      public title: string,
      public ingredients: string[],
      public instructions: string,
    ) {}
  }