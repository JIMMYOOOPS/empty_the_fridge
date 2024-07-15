import { Controller, Get, Query } from '@nestjs/common';
import { RecipeService } from '../../application/services/recipe.service';
import { FindAllRecipeDto } from './dto/find_recipe.dto';
import { Recipe } from '@core/domain/models/recipe.model';
import { FindRecipeResponseDto } from './dto/find_recipe.response.dto';
import { PaginationResult } from '@core/shared/interface/paginator.interface';
import { ApiResponse } from '@nestjs/swagger';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @ApiResponse({
    description: 'The list of all recipes',
    type: FindRecipeResponseDto,
  })
  @Get()
  async findAll(
    @Query() params: FindAllRecipeDto,
  ): Promise<PaginationResult<Recipe>> {
    const { page, size } = params;
    const options = {
      page,
      size,
    };
    return this.recipeService.findRecipe(options);
  }

  // @ApiResponse({
  //   description: 'The recipe with the given ID',
  //   type: Recipe,
  // })

  // Add other endpoints (GET by ID, POST, PUT, DELETE) similarly
}
