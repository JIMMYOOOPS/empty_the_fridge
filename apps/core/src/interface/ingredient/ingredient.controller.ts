import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { PaginationResult } from '@core/shared/interface/paginator.interface';
import { FindAllIngredientDto } from './dto/find_ingredient.dto';
import { IngredientService } from '@core/application/services/ingredient.service';

@Controller('ingredient')
export class IngredientController {
    constructor(
        private readonly ingredientService: IngredientService
    ) {}
    
    @ApiResponse({
        description: 'The list of all ingredients',
        // type: FindIngredientResponseDto,
    })
    @Get()
    async findAll(
        @Query() params: FindAllIngredientDto,
    ): Promise<any> {
        const { page, size, name } = params;
        const options = {
        page,
        size,
        filter: {
            name,
        }
        };
        return this.ingredientService.findIngredient(options);
    }
    
    @ApiResponse({
        description: 'The ingredient with the given ID',
        // type: FindByIdIngredientDto,
    })
    @Get(':id')
    async findById(@Param('id') id: string): Promise<any> {
        return this.ingredientService.findById(id);
    }
    
    // Add other endpoints (GET by ID, POST, PUT, DELETE) similarly
}