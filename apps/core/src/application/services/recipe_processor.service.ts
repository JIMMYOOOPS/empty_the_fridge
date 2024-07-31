import { Injectable } from "@nestjs/common";
import { RecipeTransformationService } from "@core/domain/services/recipe_transformation.service";
import { IUserIngredients } from "@core/application/interface/user_ingredients.interface";
import { Ingredient } from "@core/domain/interfaces/recipe.interface"
import { RecipeRepository } from "@core/infrastructure/database/repository/recipe.repository";
import { IngredientRepository } from "@core/infrastructure/database/repository/ingredient.repository";
import { SkillRepository } from "@core/infrastructure/database/repository/skill.repository";
import { Recipe } from "@core/domain/models/recipe.model";

@Injectable()
export class RecipeProcessorService {
    constructor(
        private readonly recipeTransformationService: RecipeTransformationService,
        private readonly recipeRepository: RecipeRepository,
        private readonly ingredientRepository: IngredientRepository,
        private readonly skillRepository: SkillRepository,
    ) {}

    async processRecipe(userIngredients: IUserIngredients): Promise<Recipe> {
        const transformedRecipe = await this.recipeTransformationService.transformRecipe(userIngredients);
        const { name, ingredients } = transformedRecipe;
        // validate the recipe
        const checkRecipeResult = await this.recipeRepository.checkRecipeByName(name);
        if (checkRecipeResult) {
          return checkRecipeResult
        }
        // save ingredients if they are not in the database
        const ingredientNames = ingredients.map((ingredient) => ingredient.name);
        const ingredientFromDB = await this.processIngredientsForCreate(ingredientNames, ingredients);

        // save skills if they are not in the database
        const skills = transformedRecipe.skillsRequired;
        const skillsFromDB = await this.processSkillsForCreate(skills);

        // save the recipe to the database
        const recipe = await this.recipeRepository.create(transformedRecipe, ingredientFromDB, skillsFromDB);
        if (!recipe) {
            throw new Error("Failed to save the recipe");
        }
        return recipe;
    }

    async processIngredientsForCreate(ingredientNames: string[], ingredients: Ingredient[]) {
        // Fetch ingredients
        const existingIngredients = await this.ingredientRepository.findManyByName(ingredientNames);
        const existingIngredientNames = existingIngredients.map((ing) => ing.name);
        const ingredientsToCreate = ingredients.filter((ing) => !existingIngredientNames.includes(ing.name));
        const ingredientsToUpdate = ingredients.filter((ing) => existingIngredientNames.includes(ing.name));
        // Bulk insert new ingredients
        if (ingredientsToCreate.length > 0) {
          await this.ingredientRepository.createMany(ingredientsToCreate);
        }
        // Update existing ingredients if necessary
        for (const ingredient of ingredientsToUpdate) {
          const updateData = {};
          const currentIngredient = ingredients.find((ing) => ing.name === ingredient.name);
          for (const [key, value] of Object.entries(ingredient)) {
            // add recipeCount by 1
            if (key === 'recipesCount') {
              updateData[key] = ingredient[key] + 1;
            } else if (value === null || value === undefined || value !== currentIngredient[key] && currentIngredient[key] !== undefined) {
              updateData[key] = value ? value : currentIngredient[key];
            }
          }
      
          if (Object.keys(updateData).length > 0) {
            await this.ingredientRepository.update(updateData);
          }
        }
        return await this.ingredientRepository.findManyByName(ingredientNames);
      }
    
    async processSkillsForCreate(skills: string[]) {
    // Fetch all skills at once
    const existingSkills = await this.skillRepository.findMany(skills);
    const existingSkillNames = existingSkills.map((skill) => skill.name);
    const skillsToCreate = skills.filter((skill) => !existingSkillNames.includes(skill));
    // Bulk insert new skills
    if (skillsToCreate.length > 0) {
        await this.skillRepository.createMany(skillsToCreate);
    }
    return await this.skillRepository.findMany(skills);
    }
}