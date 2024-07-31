interface IUserIngredient {
    name: string;
    part: string;
}

interface IUserIngredients {
    ingredients: IUserIngredient[];
    origin: string;
}

export { 
    IUserIngredient, 
    IUserIngredients 
};