interface Ingredient {
    name: string;
    quantity: string;
    quantity_measurement?: string;
    processing_method?: string;
}

interface IRecipe {
    id: string;
    name: string;
    ingredients: Ingredient[];
    origin: string;
    steps_to_produce: string[];
    recipeSkills: string[];
}

export {
    Ingredient,
    IRecipe
}