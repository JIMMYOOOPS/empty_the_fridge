import { Paginator } from '@core/shared/interface/paginator.interface';
import { FindByIdIngredientDto } from './find_ingredient_by_id.response.dto';
import { ApiProperty } from '@nestjs/swagger';
export class FindIngredientResponseDto {
    @ApiProperty({ type: FindByIdIngredientDto, isArray: true })
    data: FindByIdIngredientDto[];

    @ApiProperty()
    pagination: Paginator;
}

