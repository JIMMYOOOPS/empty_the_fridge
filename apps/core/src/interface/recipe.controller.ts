import { Controller, Get } from '@nestjs/common';
import { RecipeService } from '../application/services/recipe.service';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async findAll() {
    return this.recipeService.findAll();
  }

  // Add other endpoints (GET by ID, POST, PUT, DELETE) similarly
}