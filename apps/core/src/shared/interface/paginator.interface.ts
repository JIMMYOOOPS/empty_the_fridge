import { ApiProperty } from '@nestjs/swagger';

export interface PaginationResult<T> {
    data: T[]
    pagination: Paginator
}

export class Paginator {
  /**
   * total returned
   */
  @ApiProperty()
  readonly total: number
  /**
   * total per page
   */
  @ApiProperty()
  readonly size: number
  /**
   * current page
   */
  @ApiProperty()
  readonly currentPage: number
  /**
   * total page
   */
  @ApiProperty()
  readonly totalPage: number

  @ApiProperty()
  readonly hasNextPage: boolean

  @ApiProperty()
  readonly hasPrevPage: boolean
}

export interface IPaginatorDto {
    page?: number
    size?: number
}