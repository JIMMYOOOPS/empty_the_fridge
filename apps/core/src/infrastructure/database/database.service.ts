import { Injectable, OnModuleDestroy, OnModuleInit, Logger, HttpException, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  createExtendedPrismaClient,
  extendedPrismaClient,
} from './prisma.instance'
import {
  ErrorType,
  ErrorMessages
} from '@core/common/constants/error_messages'

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: extendedPrismaClient
  private readonly logger = new Logger(DatabaseService.name);

  constructor(readonly configService: ConfigService) {
    // Create the Prisma client
    const dbUrl = configService.getOrThrow<string>('DATABASE_URL')
    this.client = createExtendedPrismaClient({
      url: dbUrl,
    })
  }
  async onModuleInit() {
    try {
      // Attempt to connect to the database
      await this.client.$connect();
      const dbUrlWithoutCredentials = this.configService.getOrThrow<string>('DATABASE_URL').replace(/:\/\/.*@/, '://***@');
      this.logger.log(`Connected to database at ${dbUrlWithoutCredentials} on ${new Date().toISOString()}`);
    } catch (error) {
      this.logger.error(`Failed to connect to the database: ${error}`);
      throw new HttpException(ErrorMessages[ErrorType.Database.ConnectionError], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async onModuleDestroy() {
    try {
      // Attempt to disconnect from the database
      await this.client.$disconnect();
      this.logger.log(`Disconnected from database on ${new Date().toISOString()}`);
    } catch (error) {
      this.logger.error(`Failed to disconnect from the database: ${error}`);
      throw new HttpException(ErrorMessages[ErrorType.Database.ConnectionError], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public get prisma() {
    return this.client
  }
}