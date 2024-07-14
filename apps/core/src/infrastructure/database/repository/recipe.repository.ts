import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { IRecipeEntity } from '@core/domain/interfaces/recipe_entity.interface';
import { IRecipe } from '@core/domain/interfaces/recipe.interface';
import { Recipe } from '@core/domain/models/recipe.model';
import { PaginationResult } from '@core/shared/interface/paginator.interface';

@Injectable()
export class RecipeRepository implements IRecipeEntity {
  constructor(private readonly databaseService: DatabaseService) {}

  // async create(recipe: IRecipe): Promise<any> {
  // //   const { name, ingredients, origin, steps_to_produce, recipeSkills } = recipe;
  // //   // i have a model for recipe and a interface for recipe, since the model reflects the junction of the interface and the database, i will use the model to create the recipe
  // //   // retrieve or create the ingredient Id from the database
  // //   const ingredientNames = ingredients.map((ingredient) => ingredient.name);
  // //   const ingredientsPromiseFromDB = ingredientNames.map(async (name) => {
  // //     const ingredient = await this.databaseService.prisma.ingredient.findFirst({
  // //       where: {
  // //         name,
  // //       },
  // //     });
  // //     if (!ingredient) {
  // //       return await this.databaseService.prisma.ingredient.create({
  // //         data: {
  // //           name,
  // //         },
  // //       });
  // //     }
  // //     return ingredient;
  // //   });
  // //   // retrieve or create the skill Id from the database
  // //   const skillsPromiseFromDB = await recipeSkills.map(async (name) => {
  // //     const skill = await this.databaseService.prisma.skill.findFirst({
  // //       where: {
  // //         name,
  // //       },
  // //     });
  // //     if (!skill) {
  // //       return await this.databaseService.prisma.skill.create({
  // //         data: {
  // //           name: skill.name,
  // //         },
  // //       });
  // //     }
  // //     return skill;
  // //   });

  // //   // add ingredientIds and skillsIds to ingredients and recipeSkills
  // //   const ingredientFromDB = await Promise.all(ingredientsPromiseFromDB);
  // //   const skillsFromDB = await Promise.all(skillsPromiseFromDB);

  // //   // create updated recipe that includes ingredientIds and skillIds
  // //   const updatedRecipe = {
  // //     name,
  // //     origin,
  // //     steps_to_produce,
  // //     ingredients: ingredients.map((ingredient, index) => ({
  // //       ...ingredient,
  // //       ingredientId: ingredientFromDB[index].id,
  // //     })),
  // //     recipeSkills: recipeSkills.map((skill, index) => ({
  // //       skill,
  // //       skillId: skillsFromDB[index].id,
  // //     })),
  // //   };
  // //   }

  //   // const result = await this.databaseService.prisma.recipe.create({
  //   //   data: {
  //   //     name,
  //   //     origin,
  //   //     steps_to_produce: {
  //   //       create: steps_to_produce.map((step) => ({ step })),
  //   //     },
  //   //     ingredients: {
  //   //       create: ingredients.map((ingredient) => ({
  //   //         quantity: ingredient.quantity,
  //   //         processing_method: ingredient.processing_method,
  //   //         quantity_measurement: ingredient.quantity_measurement,
  //   //         ingredient: {
  //   //           connect: {
  //   //             id: ingredient.ingredientId,
  //   //           },
  //   //         },
  //   //       })),
  //   //     },
  //   //     recipeSkills: {
  //   //       create: recipeSkills.map((skill) => ({
  //   //         skill: {
  //   //           connect: {
  //   //             id: skill.skillId,
  //   //           },
  //   //         },
  //   //       })),
  //   //     },
  //   //   },
  //   // });
  // }

  async paginateRecipe(options: {
    size?: number;
    page?: number;
  } = {
  }): Promise<any>
  // Promise<PaginationResult<Recipe>> 
  {
    const { size = 10, page = 1 } = options
    const result = await this.databaseService.prisma.recipe.paginate(
      {
        orderBy: {
          createdAt: 'desc',
        },
        include: undefined
      },
      {
        size,
        page,
      },
    );

    return result;
  }

  // Implement other methods (findById, create, update, delete) similarly
}