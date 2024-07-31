import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationResult } from '@core/shared/interface/paginator.interface';
import { FindAllIngredientDto } from './dto/find_ingredient.dto';
import { IngredientService } from '@core/application/services/ingredient.service';
import { Ingredient } from '@core/domain/models/ingredient.model';
import { FindIngredientResponseDto } from './dto/find_ingredient.response.dto';
import { FindByIdIngredientDto } from './dto/find_ingredient_by_id.response.dto';

@ApiTags('Ingredients')
@Controller('ingredient')
export class IngredientController {
    constructor(
        private readonly ingredientService: IngredientService
    ) {}
    
    @ApiResponse({
        description: 'The list of all ingredients',
        type: FindIngredientResponseDto,
    })
    @Get()
    async findAll(
        @Query() params: FindAllIngredientDto,
    ): Promise<PaginationResult<Ingredient>> {
        const { page, size, name, type } = params;
        const options = {
        page,
        size,
        filter: {
            name,
            type
        }};
        return this.ingredientService.findIngredient(options);
    }
    
    @ApiResponse({
        description: 'The ingredient with the given ID',
        type: FindByIdIngredientDto,
    })
    @Get(':id')
    async findById(@Param('id') id: string): Promise<Ingredient> {
        return this.ingredientService.findById(id);
    }
    
    // Add other endpoints (GET by ID, POST, PUT, DELETE) similarly
}