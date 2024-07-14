import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { RecipeController } from '../interface/recipe/recipe.controller';
import { RecipeService } from '../application/services/recipe.service';
import { RecipeRepository } from '../infrastructure/database/repository/recipe.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
  exports: [RecipeService, RecipeRepository],
})
export class RecipeModule {}