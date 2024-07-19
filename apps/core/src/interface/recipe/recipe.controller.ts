import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationResult } from '@core/shared/interface/paginator.interface';
import { RecipeService } from '../../application/services/recipe.service';
import { Recipe } from '@core/domain/models/recipe.model';
import { FindAllRecipeDto } from './dto/find_recipe.dto';
import { FindRecipeResponseDto } from './dto/find_recipe.response.dto';
import { FindByIdRecipeResponseDto } from './dto/find_by_Id_recipe.response.dto';

@ApiTags('Recipes')
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
    const { page, size, name } = params;
    const options = {
      page,
      size,
      filter: {
        name,
      }
    };
    return this.recipeService.findRecipe(options);
  }

  @ApiResponse({
    description: 'The recipe with the given ID',
    type: FindByIdRecipeResponseDto,
  })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Recipe> {
    return this.recipeService.findById(id);
  }

  // Add other endpoints (GET by ID, POST, PUT, DELETE) similarly
}
