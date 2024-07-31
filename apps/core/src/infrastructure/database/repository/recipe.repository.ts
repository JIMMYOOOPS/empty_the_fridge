import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { IRecipeEntity } from '@core/domain/interfaces/recipe_entity.interface';
import { IRecipe } from '@core/domain/interfaces/recipe.interface';
import { Recipe, RestructuredRecipe, JoinedRecipe } from '@core/domain/models/recipe.model';
import { PaginationResult } from '@core/shared/interface/paginator.interface';
import { ErrorMessages, ErrorType } from '@core/common/constants/error_messages';
import { RecipeFilter } from '@core/infrastructure/common/interface/recipe_filter.interface';
import { Ingredient } from '@core/domain/models/ingredient.model'
import { Skill } from '@core/domain/models/skill.model'

@Injectable()
export class RecipeRepository implements IRecipeEntity {
  private readonly logger = new Logger(RecipeRepository.name);
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async create(recipe: IRecipe, ingredientFromDB: Ingredient[], skillsFromDB: Skill[]): Promise<Recipe> {
    try {
      const { name, ingredients, origin, calories, cookingTime, stepsToProduce, skillsRequired } = recipe;

      const updatedRecipe = {
        name,
        origin,
        calories,
        cookingTime,
        stepsToProduce,
        ingredients: ingredients.map((ingredient) => {
          const matchedIngredient = ingredientFromDB.find((ing) => ing.name === ingredient.name);
          return {
            ...ingredient,
            ingredientId: matchedIngredient.id,
          };
        }),
        skillsRequired: skillsRequired.map((skill) => {
          const matchedSkill = skillsFromDB.find((sk) => sk.name === skill);
          return {
            ...matchedSkill,
            skillId: matchedSkill.id,
          };
        }),
      };
  
      const result = await this.databaseService.prisma.recipe.create({
        data: {
          name,
          origin,
          stepsToProduce,
          calories,
          cookingTime,
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
      if (error instanceof HttpException) {
        throw error;
      }
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
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Failed to find recipe by id: ${error}`);
      throw new HttpException(ErrorMessages[ErrorType.General.InternalServerError], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async checkRecipeByName(name: string): Promise<Recipe | null> {
    try {
      const result = await this.databaseService.prisma.recipe.findFirst({
        where: {
          name,
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
        }}
      });
      if (!result) {
        return null;
      }

      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Failed to find recipe by name: ${error}`);
      throw new HttpException(ErrorMessages[ErrorType.General.InternalServerError], HttpStatus.INTERNAL_SERVER_ERROR);
    }
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