import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { PanginatorDto } from '@core/shared/interface/paginator.interface';

export class FindAllRecipeDto implements PanginatorDto{
    @ApiProperty({ required: false, default: 1 })
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(0)
    page: number;

    @ApiProperty({ required: false, default: 10 })
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(1)
    size: number;
  }