import { Controller, Post, Body } from '@nestjs/common';
import { RecipeGeneratorDto } from './dto/recipe_generator.dto';
import { RecipeProcessorService } from '@core/application/services/recipe_processor.service';

@Controller('recipe-generator')
export class RecipeGeneratorController {
    constructor( 
        private readonly RecipeProcessorService: RecipeProcessorService
    ) {}
    @Post()
    async RecipeGeneratorController(@Body() userIngredients: RecipeGeneratorDto): Promise<string> {
        const text = await this.RecipeProcessorService.processRecipe(userIngredients);
        return text;
    }
}
