export interface PaginationResult<T> {
    data: T[]
    pagination: Paginator
}

export class Paginator {
  /**
   * total returned
   */
  readonly total: number
  /**
   * total per page
   */
  readonly size: number
  /**
   * current page
   */
  readonly currentPage: number
  /**
   * total page
   */
  readonly totalPage: number
  readonly hasNextPage: boolean
  readonly hasPrevPage: boolean
}