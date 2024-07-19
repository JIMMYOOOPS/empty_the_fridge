import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { IRecipeEntity } from '@core/domain/interfaces/recipe_entity.interface';
import { IRecipe } from '@core/domain/interfaces/recipe.interface';
import { Recipe, RestructuredRecipe, JoinedRecipe } from '@core/domain/models/recipe.model';
import { PaginationResult } from '@core/shared/interface/paginator.interface';
import { ErrorMessages, ErrorType } from '@core/common/constants/error_messages';
import { RecipeFilter } from '@core/infrastructure/common/interface/recipe_filter.interface';

@Injectable()
export class RecipeRepository implements IRecipeEntity {
  private readonly logger = new Logger(RecipeRepository.name);
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async create(recipe: IRecipe): Promise<Recipe> {
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
      const ingredientFromDB = await this.processIngredientsForCreate(ingredientNames, ingredients);
      const skillsFromDB = await this.processSkillsForCreate(skillsRequired);

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
    filter?: Record<string, any>
  } = {
  }): Promise<PaginationResult<RestructuredRecipe>> 
  {
    try {
      const { size = 10, page = 1, filter } = options;

      const recipeFilter = new RecipeFilter();
      filter?.name && recipeFilter.byName(filter.name);
      const conditions = recipeFilter.getConditions();
      const where  = conditions.length > 0 ? { where : {
        AND: conditions
      }} : {};
      const result = await this.databaseService.prisma.recipe.paginate(
        {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            ingredients: {
              include: {
                ingredient: true, // Include the details of each ingredient
              },
            },
            skillsRequired: {
              include: {
                skill: true, // Include the details of each skill
              },
            },
          },
          ...where
        },
        {
          size,
          page,
        },
      );

      // Restructure the recipe object to include the ingredient and skill details
      const restructuredRecipe = result.data.map((recipe) => this.restructureRecipe(recipe));
  
      return {
        data: restructuredRecipe,
        pagination: result.pagination
      }
    } catch (error) {
      this.logger.error(`Failed to paginate recipe: ${error}`);
      throw new HttpException(ErrorMessages[ErrorType.General.InternalServerError], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findRecipeById(id: string): Promise<RestructuredRecipe> {
    try {
      const result = await this.databaseService.prisma.recipe.findUnique({
        where: {
          id,
        },
        include: {
          ingredients: {
            include: {
              ingredient: true,
            },
          },
          skillsRequired: {
            include: {
              skill: true,
            },
          },
        },
      });
      if (!result) {
        throw new HttpException(ErrorMessages[ErrorType.Recipe.NotFound], HttpStatus.NOT_FOUND);
      }
      const restructuredRecipe = this.restructureRecipe(result);
      return restructuredRecipe;
    } catch (error) {
      this.logger.error(`Failed to find recipe by id: ${error}`);
      throw new HttpException(ErrorMessages[ErrorType.General.InternalServerError], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async processIngredientsForCreate(ingredientNames: string[], ingredients: any[]) {
    // Fetch all ingredients at once
    const existingIngredients = await this.databaseService.prisma.ingredient.findMany({
      where: {
        name: {
          in: ingredientNames,
        },
      },
    });
  
    const existingIngredientNames = existingIngredients.map((ing) => ing.name);
    const ingredientsToCreate = ingredients.filter((ing) => !existingIngredientNames.includes(ing.name));
    const ingredientsToUpdate = existingIngredients.filter((ing) => {
      const currentIngredient = ingredients.find((ingredient) => ingredient.name === ing.name);
      return Object.entries(ing).some(([key, value]) => value === null || value === undefined && currentIngredient[key] !== undefined);
    });
  
    // Bulk insert new ingredients
    if (ingredientsToCreate.length > 0) {
      await this.databaseService.prisma.ingredient.createMany({
        data: ingredientsToCreate.map(({ name, type }) => ({ name, type })),
      });
    }
  
    // Update existing ingredients if necessary
    for (const ingredient of ingredientsToUpdate) {
      const updateData = {};
      const currentIngredient = ingredients.find((ing) => ing.name === ingredient.name);
      for (const [key, value] of Object.entries(ingredient)) {
        if (value === null || value === undefined && currentIngredient[key] !== undefined) {
          updateData[key] = currentIngredient[key];
        }
      }
  
      if (Object.keys(updateData).length > 0) {
        await this.databaseService.prisma.ingredient.update({
          where: { name: ingredient.name },
          data: updateData,
        });
      }
    }
  
    // Optionally, return the updated list of ingredients
    return await this.databaseService.prisma.ingredient.findMany({
      where: {
        name: {
          in: ingredientNames,
        },
      },
    });
  }

  async processSkillsForCreate(skills: string[]) {
    // Fetch all skills at once
    const existingSkills = await this.databaseService.prisma.skill.findMany({
      where: {
        name: {
          in: skills,
        },
      },
    });
  
    const existingSkillNames = existingSkills.map((skill) => skill.name);
    const skillsToCreate = skills.filter((skill) => !existingSkillNames.includes(skill));
  
    // Bulk insert new skills
    if (skillsToCreate.length > 0) {
      await this.databaseService.prisma.skill.createMany({
        data: skillsToCreate.map((name) => ({ name })),
      });
    }

    return await this.databaseService.prisma.skill.findMany({
      where: {
        name: {
          in: skills,
        },
      },
    });
  }

  restructureRecipe(recipe: JoinedRecipe): RestructuredRecipe {
    const result = {
      ...recipe,
      ingredients: recipe.ingredients.map((ingredient) => ({
        recipeId: ingredient.recipeId,
        ingredientId: ingredient.ingredientId,
        quantity: ingredient.quantity,
        quantityMeasurement: ingredient.quantityMeasurement,
        processingMethod: ingredient.processingMethod,
        name: ingredient.ingredient.name,
        type: ingredient.ingredient.type,
        createdAt: ingredient.ingredient.createdAt,
        updatedAt: ingredient.ingredient.updatedAt,
      })),
      skillsRequired: recipe.skillsRequired.map((skill) => ({
        recipeId: skill.recipeId,
        skillId: skill.skillId,
        name: skill.skill.name,
        createdAt: skill.skill.createdAt,
        updatedAt: skill.skill.updatedAt,
      })),
    };
    return result;
  }
}