import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { IRecipeEntity } from '@core/domain/interfaces/recipe_entity.interface';
import { IRecipe } from '@core/domain/interfaces/recipe.interface';
import { Recipe } from '@core/domain/models/recipe.model';
import { PaginationResult } from '@core/shared/interface/paginator.interface';
import { ErrorMessages, ErrorType } from '@core/common/constants/error_messages';

@Injectable()
export class RecipeRepository implements IRecipeEntity {
  private readonly logger = new Logger(RecipeRepository.name);
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async create(recipe: IRecipe): Promise<any> {
    try {
      const { name, ingredients, origin, stepsToProduce, skillsRequired } = recipe;      
      const validateRecipeName = await this.databaseService.prisma.recipe.findFirst({
        where: {
          name,
        },
      });
      if (validateRecipeName) {
        throw new HttpException(ErrorMessages[ErrorType.Recipe.NameAlreadyExists], HttpStatus.BAD_REQUEST);
      }
      // retrieve or create the ingredient Id from the database
      const ingredientNames = ingredients.map((ingredient) => ingredient.name);
      const ingredientsPromiseFromDB = ingredientNames.map(async (name) => {
        const ingredient = await this.databaseService.prisma.ingredient.findFirst({
          where: {
            name,
          },
        });
        if (!ingredient) {
          return await this.databaseService.prisma.ingredient.create({
            data: {
              name,
              type: ingredients.find((ingredient) => ingredient.name === name).type,
            },
          });
        }

        // check all ingredient properties, if it is undefined or null then update the property
        const requiredUpdateIngredientProperties: { 
          [key: string]: string | null | undefined
        } = {};
        for (const [key, value] of Object.entries(ingredient)) {
          if (value === null || value === undefined) {
            requiredUpdateIngredientProperties[key] = ingredients.find((ingredient) => ingredient.name === name)[key];
          }
        }
        if (Object.keys(requiredUpdateIngredientProperties).length > 0) {
          return await this.databaseService.prisma.ingredient.update({
            where: {
              name,
            },
            data: requiredUpdateIngredientProperties,
          });
        }
      });
      const ingredientFromDB = await Promise.all(ingredientsPromiseFromDB);
      // retrieve or create the skill Id from the database
      const skillsPromiseFromDB = skillsRequired.map(async (name) => {
        const skill = await this.databaseService.prisma.skill.findFirst({
          where: {
            name,
          },
        });
        if (!skill) {
          return await this.databaseService.prisma.skill.create({
            data: {
              name,
            },
          });
        }
        return skill;
      });
      const skillsFromDB = await Promise.all(skillsPromiseFromDB);
      // add ingredientIds and skillsIds to ingredients and recipeSkills
      const updatedRecipe = {
        name,
        origin,
        stepsToProduce,
        ingredients: ingredients.map((ingredient, key) => ({
          ...ingredient,
          ingredientId: ingredientFromDB[key].id,
        })),
        skillsRequired: skillsRequired.map((skill, index) => ({
          skill,
          skillId: skillsFromDB[index].id,
        })),
      };
  
      const result = await this.databaseService.prisma.recipe.create({
        data: {
          name,
          origin,
          stepsToProduce,
          ingredients: {
            create: updatedRecipe.ingredients.map((ingredient) => ({
              quantity: ingredient.quantity,
              processingMethod: ingredient.processingMethod,
              quantityMeasurement: ingredient.quantityMeasurement,
              type: ingredient.type,
              ingredient: {
                connect: {
                  id: ingredient.ingredientId,
                },
              },
            })),
          },
          skillsRequired: {
            create: updatedRecipe.skillsRequired.map((skill) => ({
              skill: {
                connect: {
                  id: skill.skillId,
                },
              },
            })),
          },
        },
      });
      return result;
    } catch (error) {
      this.logger.error(`Failed to create recipe: ${error}`);
      throw new HttpException(ErrorMessages[ErrorType.General.InternalServerError], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async paginateRecipe(options: {
    size?: number;
    page?: number;
  } = {
  }): Promise<any>
  // Promise<PaginationResult<Recipe>> 
  {
    try {
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
    } catch (error) {
      this.logger.error(`Failed to paginate recipe: ${error}`);
      throw new HttpException(ErrorMessages[ErrorType.General.InternalServerError], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // Implement other methods (findById, create, update, delete) similarly
}