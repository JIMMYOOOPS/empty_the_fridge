import { Injectable, OnModuleDestroy, OnModuleInit, Logger, HttpException, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  createExtendedPrismaClient,
  extendedPrismaClient,
  ConnectorManager
} from './prisma.instance'
import {
  ErrorType,
  ErrorMessages
} from '@core/common/constants/error_messages'

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: extendedPrismaClient
  private readonly logger = new Logger(DatabaseService.name);
  private connector: ConnectorManager = new ConnectorManager();
  constructor(
    readonly configService: ConfigService,
  ) {
        // Add process event listeners
        process.on('SIGINT', async () => {
          this.logger.log('SIGINT received');
          await this.onModuleDestroy();
          process.exit(0);
        });
    
        process.on('SIGTERM', async () => {
          this.logger.log('SIGTERM received');
          await this.onModuleDestroy();
          process.exit(0);
        });
  }
  async onModuleInit() {
    try {
      // Attempt to connect to the database
      const databaseURL = await this.connector.createConnectorServer();
      this.logger.log('databaseURL', databaseURL);
      this.client = createExtendedPrismaClient({ url: databaseURL });
      this.client.$connect();
      this.logger.log(`Connected to database on ${new Date().toISOString()}`);
    } catch (error) {
      this.logger.error(`Failed to connect to the database: ${error}`);
      throw new HttpException(ErrorMessages[ErrorType.Database.ConnectionError], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async onModuleDestroy() {
    try {
      // Attempt to disconnect from the database
      await this.client.$disconnect();
      await this.connector.closeConnectorServer();
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