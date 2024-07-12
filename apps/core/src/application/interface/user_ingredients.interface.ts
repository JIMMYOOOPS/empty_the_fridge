interface IUserIngredient {
    name: string;
    part: string;
}

interface IUserIngredients {
    ingredients: IUserIngredient[];
}

export { 
    IUserIngredient, 
    IUserIngredients 
};