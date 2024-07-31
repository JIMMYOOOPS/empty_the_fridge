import { ApiProperty } from '@nestjs/swagger';

export class FindByIdIngredientDto {
    @ApiProperty(
        {
            description: 'The ID of the ingredient',
            example: 'clys6gfl20002bgtfhnx7tctv',
            type: String
        }
    )
    id: string;

    @ApiProperty(
        {
            description: 'The name of the ingredient',
            example: 'Tomato',
            type: String
        }
    )
    name: string;

    @ApiProperty(
        {
            description: 'The type of the ingredient',
            example: 'Vegetable',
            type: String
        }
    )
    type: string;

    @ApiProperty(
        {
            description: 'The created time of the ingredient',
            example: '2024-07-19T04:05:42.759Z',
            type: Date
        }
    )
    createdAt: Date;

    @ApiProperty(
        {
            description: 'The updated time of the ingredient',
            example: '2024-07-19T04:05:42.759Z',
            type: Date
        }
    )
    updatedAt: Date;
}