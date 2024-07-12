import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ExternalServicesModule } from './infrastructure/external_services/external_services.module';
import { RecipeModule } from './modules/recipe.module';
import { RecipeGeneratorModule } from './modules/recipe-generator.module';

@Module({
  imports: [
    DatabaseModule,
    ExternalServicesModule,
    RecipeModule,
    RecipeGeneratorModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
