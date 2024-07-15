import { PaginationResult, Paginator } from '@core/shared/interface/paginator.interface';
import { ApiProperty } from '@nestjs/swagger';

class Ingredient {
    @ApiProperty()
    recipeId: string;

    @ApiProperty()
    ingredientId: string;

    @ApiProperty()
    quantity: string;

    @ApiProperty()
    processingMethod: string;

    @ApiProperty()
    quantityMeasurement: string;

    @ApiProperty()
    ingredient: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
    };
}

class Recipe {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    origin: string;

    @ApiProperty()
    stepsToProduce: string[];

    @ApiProperty()
    ingredients: Ingredient[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}

[
    {
        "id": "clymhcfa9000414ffr2297jjc",
        "name": "Chicken and Rice with Yogurt Sauce",
        "origin": "Italian",
        "stepsToProduce": [
            "In a large pan, heat olive oil over medium heat.",
            "Add diced chicken and cook until browned on all sides.",
            "Add minced garlic and diced tomatoes to the pan. Cook for 5 minutes, stirring occasionally.",
            "Stir in cooked rice and season with salt and pepper.",
            "Remove from heat and stir in chopped basil.",
            "Serve hot, topped with yogurt sauce. ",
            "To make the yogurt sauce, simply combine plain yogurt with a pinch of salt and pepper."
        ],
        "createdAt": "2024-07-15T04:23:54.466Z",
        "updatedAt": "2024-07-15T04:23:54.466Z",
        "ingredients": [
            {
                "recipeId": "clymhcfa9000414ffr2297jjc",
                "ingredientId": "clymhcfa3000114ffc9mkx1d3",
                "quantity": "2",
                "processingMethod": "",
                "quantityMeasurement": "g",
                "ingredient": {
                    "id": "clymhcfa3000114ffc9mkx1d3",
                    "name": "pepper",
                    "createdAt": "2024-07-15T04:23:54.459Z",
                    "updatedAt": "2024-07-15T04:23:54.459Z",
                    "type": "seasoning"
                }
            },
            {
                "recipeId": "clymhcfa9000414ffr2297jjc",
                "ingredientId": "clymhcfa3000014ff3f6k3guz",
                "quantity": "5",
                "processingMethod": "",
                "quantityMeasurement": "g",
                "ingredient": {
                    "id": "clymhcfa3000014ff3f6k3guz",
                    "name": "tomatoes",
                    "createdAt": "2024-07-15T04:23:54.459Z",
                    "updatedAt": "2024-07-15T04:23:54.459Z",
                    "type": "vegetable"
                }
            },
            {
                "recipeId": "clymhcfa9000414ffr2297jjc",
                "ingredientId": "clymh4d9e00009kd99k1rjnaf",
                "quantity": "2",
                "processingMethod": "",
                "quantityMeasurement": "tbsp",
                "ingredient": {
                    "id": "clymh4d9e00009kd99k1rjnaf",
                    "name": "garlic",
                    "createdAt": "2024-07-15T04:17:38.594Z",
                    "updatedAt": "2024-07-15T04:17:38.594Z",
                    "type": "vegetable"
                }
            },
            {
                "recipeId": "clymhcfa9000414ffr2297jjc",
                "ingredientId": "clymh2t5500071qw4myyx9a6h",
                "quantity": "10",
                "processingMethod": "chopped",
                "quantityMeasurement": "g",
                "ingredient": {
                    "id": "clymh2t5500071qw4myyx9a6h",
                    "name": "salt",
                    "createdAt": "2024-07-15T04:16:25.865Z",
                    "updatedAt": "2024-07-15T04:16:25.865Z",
                    "type": "seasoning"
                }
            },
            {
                "recipeId": "clymhcfa9000414ffr2297jjc",
                "ingredientId": "clymh2t5500061qw43lzshg85",
                "quantity": "2",
                "processingMethod": "minced",
                "quantityMeasurement": "",
                "ingredient": {
                    "id": "clymh2t5500061qw43lzshg85",
                    "name": "olive oil",
                    "createdAt": "2024-07-15T04:16:25.865Z",
                    "updatedAt": "2024-07-15T04:16:25.865Z",
                    "type": "oil"
                }
            },
            {
                "recipeId": "clymhcfa9000414ffr2297jjc",
                "ingredientId": "clymh2t5500051qw4bxllxgwy",
                "quantity": "2",
                "processingMethod": "diced",
                "quantityMeasurement": "",
                "ingredient": {
                    "id": "clymh2t5500051qw4bxllxgwy",
                    "name": "basil",
                    "createdAt": "2024-07-15T04:16:25.865Z",
                    "updatedAt": "2024-07-15T04:16:25.865Z",
                    "type": "herb"
                }
            },
            {
                "recipeId": "clymhcfa9000414ffr2297jjc",
                "ingredientId": "clymh2t5500021qw498wckfzi",
                "quantity": "100",
                "processingMethod": "plain",
                "quantityMeasurement": "g",
                "ingredient": {
                    "id": "clymh2t5500021qw498wckfzi",
                    "name": "yogurt",
                    "createdAt": "2024-07-15T04:16:25.865Z",
                    "updatedAt": "2024-07-15T04:16:25.865Z",
                    "type": "dairy"
                }
            },
            {
                "recipeId": "clymhcfa9000414ffr2297jjc",
                "ingredientId": "clymh2t5500011qw4quezx2is",
                "quantity": "200",
                "processingMethod": "cooked",
                "quantityMeasurement": "g",
                "ingredient": {
                    "id": "clymh2t5500011qw4quezx2is",
                    "name": "rice",
                    "createdAt": "2024-07-15T04:16:25.865Z",
                    "updatedAt": "2024-07-15T04:16:25.865Z",
                    "type": "carbohydrate"
                }
            },
            {
                "recipeId": "clymhcfa9000414ffr2297jjc",
                "ingredientId": "clymh2t5500001qw41vegxs1a",
                "quantity": "200",
                "processingMethod": "diced",
                "quantityMeasurement": "g",
                "ingredient": {
                    "id": "clymh2t5500001qw41vegxs1a",
                    "name": "chicken",
                    "createdAt": "2024-07-15T04:16:25.865Z",
                    "updatedAt": "2024-07-15T04:16:25.865Z",
                    "type": "meat"
                }
            }
        ],
        "skillsRequired": [
            {
                "recipeId": "clymhcfa9000414ffr2297jjc",
                "skillId": "clymhcfa8000314ffk6f75bo7",
                "skill": {
                    "id": "clymhcfa8000314ffk6f75bo7",
                    "name": "Stirring",
                    "createdAt": "2024-07-15T04:23:54.464Z",
                    "updatedAt": "2024-07-15T04:23:54.464Z"
                }
            },
            {
                "recipeId": "clymhcfa9000414ffr2297jjc",
                "skillId": "clymhcfa8000214ffidwlaywc",
                "skill": {
                    "id": "clymhcfa8000214ffidwlaywc",
                    "name": "Mincing",
                    "createdAt": "2024-07-15T04:23:54.464Z",
                    "updatedAt": "2024-07-15T04:23:54.464Z"
                }
            },
            {
                "recipeId": "clymhcfa9000414ffr2297jjc",
                "skillId": "clymh4d9j00029kd9ov6tzgvv",
                "skill": {
                    "id": "clymh4d9j00029kd9ov6tzgvv",
                    "name": "Frying",
                    "createdAt": "2024-07-15T04:17:38.599Z",
                    "updatedAt": "2024-07-15T04:17:38.599Z"
                }
            },
            {
                "recipeId": "clymhcfa9000414ffr2297jjc",
                "skillId": "clymh2t59000b1qw4qvtooece",
                "skill": {
                    "id": "clymh2t59000b1qw4qvtooece",
                    "name": "Chopping",
                    "createdAt": "2024-07-15T04:16:25.869Z",
                    "updatedAt": "2024-07-15T04:16:25.869Z"
                }
            }
        ]
    }
]

export class FindRecipeResponseDto implements PaginationResult<Recipe> {
    @ApiProperty({ type: Recipe, isArray: true })
    data: Recipe[];

    @ApiProperty()
    pagination: Paginator;
}