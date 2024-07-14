interface Ingredient {
    name: string;
    quantity: string;
    quantity_measurement?: string;
    processing_method?: string;
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