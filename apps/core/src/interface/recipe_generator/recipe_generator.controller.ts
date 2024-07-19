import { Controller, Post, Body } from '@nestjs/common';
import { RecipeGeneratorDto } from './dto/recipe_generator.dto';
import { RecipeProcessorService } from '@core/application/services/recipe_processor.service';
import { IRecipe } from '@core/domain/interfaces/recipe.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Recipe Generator')
@Controller('recipe-generator')
export class RecipeGeneratorController {
    constructor( 
        private readonly RecipeProcessorService: RecipeProcessorService
    ) {}
    @Post()
    async RecipeGeneratorController(@Body() userIngredients: RecipeGeneratorDto): Promise<IRecipe> {
        const text = await this.RecipeProcessorService.processRecipe(userIngredients);
        return text;
    }
}
