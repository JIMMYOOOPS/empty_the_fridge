import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { RecipeController } from '../interface/recipe/recipe.controller';
import { RecipeService } from '../application/services/recipe.service';
import { RecipeRepository } from '../infrastructure/database/repository/recipe.repository';
import { IngredientModule } from './ingredient.module';
import { SkillModule } from './skill.module';

@Module({
  imports: [DatabaseModule, IngredientModule, SkillModule],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
  exports: [RecipeService, RecipeRepository],
})
export class RecipeModule {}