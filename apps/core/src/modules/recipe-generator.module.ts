import { Module } from '@nestjs/common';
import { RecipeGeneratorController } from '@core/interface/recipe_generator/recipe_generator.controller';
import { RecipeProcessorService } from '@core/application/services/recipe_processor.service';
import { RecipeTransformationService } from '@core/domain/services/recipe_transformation.service';
import { GenAIService } from '@core/infrastructure/external_services/gen_ai_service/gen_ai.service';
import { RecipeRepository } from '@core/infrastructure/database/repository/recipe.repository';
import { IngredientModule } from './ingredient.module';
import { SkillModule } from './skill.module';

@Module({
    imports: [IngredientModule, SkillModule],
    controllers: [
        RecipeGeneratorController
    ],
    providers: [
        RecipeProcessorService,
        RecipeTransformationService,
        GenAIService,
        RecipeRepository,
    ],
    exports: []
})
export class RecipeGeneratorModule {}