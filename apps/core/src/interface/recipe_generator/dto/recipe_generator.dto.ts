import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class Ingredient {
    @ApiProperty({
        description: 'Name of the ingredient',
        required: true,
        type: 'string'
    })
    @IsString()
    name: string;
    @ApiProperty({
        description: 'Part of the ingredient',
        required: false,
        type: String
    })
    part: string;
};


export class RecipeGeneratorDto {
    @ApiProperty({
        description: 'List of ingredients',
        required: true,
        type: Ingredient,
        isArray: true
    })
    ingredients: Ingredient[];

    @ApiProperty({
        description: 'Origin of the recipe',
        required: true,
        type: 'string'
    })
    @IsString()
    @IsNotEmpty()
    origin: string;
}