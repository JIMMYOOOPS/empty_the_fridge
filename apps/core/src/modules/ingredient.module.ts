import { Module } from '@nestjs/common';
import { IngredientController } from '@core/interface/ingredient/ingredient.controller';
import { IngredientService } from '@core/application/services/ingredient.service';
import { IngredientRepository } from '@core/infrastructure/database/repository/ingredient.repository';

@Module({
  imports: [],
  controllers: [IngredientController],
  providers: [IngredientService, IngredientRepository],
  exports: [IngredientService, IngredientRepository],
})
export class IngredientModule {}