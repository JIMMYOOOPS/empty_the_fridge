import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsInt, Min, IsArray, IsString } from 'class-validator';
import { IPaginatorDto } from '@core/shared/interface/paginator.interface';

export class FindAllRecipeDto implements IPaginatorDto {
    @ApiProperty({ required: false, default: 1 })
    @Transform(({ value }) => parseInt(value))
    @IsOptional()
    @IsInt()
    @Min(0)
    page?: number;

    @ApiProperty({ required: false, default: 10 })
    @Transform(({ value }) => parseInt(value))
    @IsOptional()
    @IsInt()
    @Min(1)
    size?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    ingredients?: string[];

    @ApiProperty({ required: false })
    @IsOptional()
    origin?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    calories?: Number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    cookingTime?: Number;
  }