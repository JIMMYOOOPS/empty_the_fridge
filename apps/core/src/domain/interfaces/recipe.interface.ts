interface Ingredient {
    name: string;
    type: string;
    quantity: string;
    quantityMeasurement?: string;
    processingMethod?: string;
    recipesCount?: number;
}

interface IRecipe {
    name: string;
    ingredients: Ingredient[];
    origin: string;
    calories: number;
    cookingTime: number;
    stepsToProduce: string[];
    skillsRequired: string[];
}

export {
    Ingredient,
    IRecipe
}