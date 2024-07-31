import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/exception.filter';
import { throttlerConfig } from './common/config/throttle.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ExternalServicesModule } from './infrastructure/external_services/external_services.module';
import { RecipeModule } from './modules/recipe.module';
import { RecipeGeneratorModule } from './modules/recipe-generator.module';
import { IngredientModule } from './modules/ingredient.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: throttlerConfig,
      }
    ),
    DatabaseModule,
    ExternalServicesModule,
    RecipeModule,
    RecipeGeneratorModule,
    IngredientModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }
  ],
})
export class AppModule {}
