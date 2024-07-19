export namespace ErrorType {
    export enum General {
      InternalServerError = "InternalServerError",
    }

    export enum Database {
      ConnectionError = "Database_ConnectionError",
    }
  
    export enum Recipe {
      NameAlreadyExists = "Recipe_NameAlreadyExists",
      TransformRecipeFailed = "Recipe_TransformRecipeFailed",
      NotFound = "Recipe_NotFound",
      InvalidRecipeFromGenAI = "Recipe_InvalidRecipeFromGenAI",
    }
  }

export const ErrorMessages = {
    // General errors
    [ErrorType.General.InternalServerError]: "An unexpected error occurred.",
    // Database errors
    [ErrorType.Database.ConnectionError]: "Failed to connect to the database.",
    // Recipe errors
    [ErrorType.Recipe.NameAlreadyExists]: "Recipe name already exists.",
    [ErrorType.Recipe.TransformRecipeFailed]: "Failed to transform the recipe.",
    [ErrorType.Recipe.NotFound]: "Recipe not found.",
    [ErrorType.Recipe.InvalidRecipeFromGenAI]: "Invalid recipe from GenAI.",
  };