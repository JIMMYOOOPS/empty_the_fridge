// Ensure that your NestJS modules (DatabaseModule, RecipeModule) are properly set up to include these services and controllers.
// The DatabaseModule should provide the PrismaService and the RecipeRepository.
// The RecipeModule should import the DatabaseModule and provide the RecipeService and RecipeController.
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { RecipeController } from '../interface/recipe.controller';
import { RecipeService } from '../application/services/recipe.service';
import { RecipeRepository } from '../infrastructure/database/repository/recipe.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
})
export class RecipeModule {}