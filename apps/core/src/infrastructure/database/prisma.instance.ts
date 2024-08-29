import { PaginationResult } from '@core/shared/interface/paginator.interface'
import { Prisma, PrismaClient } from '@prisma/client'
import { Connector } from '@google-cloud/cloud-sql-connector';

export class ConnectorManager {
  private connector: Connector | null = null;

  public async createConnectorServer(): Promise<string> {
    try {
      this.connector = new Connector();
      await this.connector.startLocalProxy({
        instanceConnectionName: 'empty-the-fridge-433909:asia-east1:empty-the-fridge',
        listenOptions: { path: '.s.PGSQL.5432' },
      });
      const hostPath = process.cwd();
      const dataSourceUrl =
        `postgresql://postgres:fridgeempty@localhost/emptythefridge?host=${hostPath}`;
      return dataSourceUrl;
    } catch (error) {
      console.error('Failed to connect to the database: ', error);
      throw error;
    }
  }

  public async closeConnectorServer(): Promise<void> {
    if (this.connector) {
      try {
        this.connector.close();
        console.log('Connector server stopped successfully.');
      } catch (error) {
        console.error('Failed to stop the connector server: ', error);
        throw error;
      } finally {
        this.connector = null;
      }
    } else {
      console.warn('No connector server to stop.');
    }
  }
}


export const createExtendedPrismaClient = ({ url }: { url?: string } = {}) => {
  const prismaClient = new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  })

  const extendedPrismaClient = prismaClient.$extends({
    model: {
      $allModels: {
        async paginate<T, A>(
          this: T,
          x: Prisma.Exact<
            A,
            Pick<
              Prisma.Args<T, 'findFirst'>,
              'where' | 'select' | 'include' | 'orderBy'
            >
          >,
          options: {
            page: number
            size: number
          },
        ): Promise<PaginationResult<Prisma.Result<T, A, 'findFirst'>>> {
          if (typeof x !== 'object') {
            return {
              data: [],
              pagination: {
                total: 0,
                size: 0,
                totalPage: 0,
                currentPage: 0,

                hasNextPage: false,
                hasPrevPage: false,
              },
            }
          }

          const { page, size: perPage } = options
          const skip = page > 0 ? perPage * (page - 1) : 0
          const countArgs = 'where' in x ? { where: x.where } : {}
          const [total, data] = await Promise.all([
            (this as any).count(countArgs),
            (this as any).findMany({
              ...x,
              take: perPage,
              skip,

              // @ts-ignore
              orderBy: x.orderBy,
              // @ts-ignore
              include: x.include,
            }),
          ])

          const lastPage = Math.ceil(total / perPage)

          return {
            data,
            pagination: {
              total,
              size: perPage,
              totalPage: lastPage,
              currentPage: page,
              hasNextPage: page < lastPage,
              hasPrevPage: page > 1,
            },
          } as PaginationResult<any>
        },
        async exists<T, A>(
          this: T,
          x: Prisma.Exact<A, Pick<Prisma.Args<T, 'findFirst'>, 'where'>>,
        ): Promise<boolean> {
          if (typeof x !== 'object') {
            return false
          }
          if (!('where' in x)) {
            return false
          }
          const count = await (this as any).count({ where: x.where })

          return count > 0
        },
      },
    },
  })

  return extendedPrismaClient
}
export type extendedPrismaClient = ReturnType<typeof createExtendedPrismaClient>