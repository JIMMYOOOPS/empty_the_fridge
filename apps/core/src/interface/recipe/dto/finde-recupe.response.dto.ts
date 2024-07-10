import { PaginationResult, Paginator } from '@core/shared/interface/paginator.interface';
import { ApiProperty } from '@nestjs/swagger';

class Recipe {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    ingredients: string;

    @ApiProperty()
    steps: string;

    @ApiProperty()
    imageUrl: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}

export class FindRecipeResponseDto implements PaginationResult<Recipe> {
    @ApiProperty({ type: Recipe, isArray: true })
    data: Recipe[];

    @ApiProperty()
    pagination: Paginator;
}