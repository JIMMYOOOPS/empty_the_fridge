interface Ingredient {
    name: string;
    type: string;
    quantity: string;
    quantityMeasurement?: string;
    processingMethod?: string;
}

interface IRecipe {
    name: string;
    ingredients: Ingredient[];
    origin: string;
    stepsToProduce: string[];
    skillsRequired: string[];
}

export {
    Ingredient,
    IRecipe
}