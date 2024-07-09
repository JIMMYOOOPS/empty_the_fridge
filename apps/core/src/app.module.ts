import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './infrastructure/database/database.module';
import { RecipeModule } from './modules/recipe.module';

@Module({
  imports: [
    DatabaseModule,
    RecipeModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
