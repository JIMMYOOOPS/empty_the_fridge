import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested, IsNotEmpty, IsOptional } from 'class-validator';

class Ingredient {
    @IsString()    
    name: string;

    @IsString()
    type: string;

    @IsString()
    quantity: string;

    @IsString()
    @IsOptional()
    quantityMeasurement?: string;

    @IsString()
    @IsOptional()
    processingMethod?: string;
}

class RecipeDto {
    @IsString()
    name: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Ingredient)
    ingredients: Ingredient[];

    @IsString()
    origin: string;

    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true })
    stepsToProduce: string[];

    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true })
    skillsRequired: string[];
}

export {
    RecipeDto
}