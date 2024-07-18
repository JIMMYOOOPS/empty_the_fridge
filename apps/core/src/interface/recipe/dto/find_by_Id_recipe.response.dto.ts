import { ApiProperty } from '@nestjs/swagger';

class Ingredient {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    recipeId: string;

    @ApiProperty()
    ingredientId: string;

    @ApiProperty()
    quantity: string;

    @ApiProperty()
    processingMethod?: string;

    @ApiProperty()
    quantityMeasurement?: string;
}

class Skill {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}

class FindByIdRecipeResponseDto{
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    origin: string;

    @ApiProperty()
    stepsToProduce: string[];

    @ApiProperty(
        {
            type: Ingredient,
            isArray: true
        }
    )
    ingredients: Ingredient[];

    @ApiProperty(
        {
            type: Skill,
            isArray: true
        }
    )
    skillsRequired: Skill[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}

export {
    FindByIdRecipeResponseDto
}