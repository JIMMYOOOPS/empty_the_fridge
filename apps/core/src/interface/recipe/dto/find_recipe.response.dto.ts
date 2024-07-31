import { Paginator } from '@core/shared/interface/paginator.interface';
import { ApiProperty } from '@nestjs/swagger';
import { FindByIdRecipeResponseDto } from './find_by_Id_recipe.response.dto';

export class FindRecipeResponseDto {
    @ApiProperty({ type: FindByIdRecipeResponseDto, isArray: true })
    data: FindByIdRecipeResponseDto[];

    @ApiProperty()
    pagination: Paginator;
}