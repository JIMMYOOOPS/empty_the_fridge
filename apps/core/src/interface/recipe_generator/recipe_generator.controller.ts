import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { RecipeGeneratorDto } from './dto/recipe_generator.dto';
import { RecipeProcessorService } from '@core/application/services/recipe_processor.service';
import { ApiTags } from '@nestjs/swagger';
import { Recipe } from '@core/domain/models/recipe.model';

@ApiTags('Recipe Generator')
@Controller('recipe-generator')
export class RecipeGeneratorController {

    constructor(
        private readonly RecipeProcessorService: RecipeProcessorService,
    ) {}

    @Post()
    // Throttle the RecipeGeneratorController method to 4 requests per 10 seconds
    @UseGuards(ThrottlerGuard)
    @Throttle({
        default: {
            limit: 4,
            ttl: 10000,
        }
    })
    async RecipeGeneratorController(@Body() userIngredients: RecipeGeneratorDto): Promise<Recipe> {
        const text = await this.RecipeProcessorService.processRecipe(userIngredients);
        return text;
    }
}
