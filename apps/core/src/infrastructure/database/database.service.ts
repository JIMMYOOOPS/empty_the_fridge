import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  createExtendedPrismaClient,
  extendedPrismaClient,
} from './prisma.instance'

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: extendedPrismaClient
  constructor(readonly configService: ConfigService) {
    // Create the Prisma client
    const dbUrl = configService.getOrThrow<string>('DATABASE_URL')
    this.client = createExtendedPrismaClient({
      url: dbUrl,
    })
  }
  async onModuleInit() {
    // Connect to the database
    await this.client.$connect()
    const dbUrlWithoutCredentials = this.configService.getOrThrow<string>('DATABASE_URL').replace(/:\/\/.*@/, '://***@')
    console.log(`Connected to database at ${dbUrlWithoutCredentials} on ${new Date().toISOString()}`)
  }

  async onModuleDestroy() {
    await this.client.$disconnect()
    console.log(`Disconnected from database on ${new Date().toISOString()}`)
  }

  public get prisma() {
    return this.client
  }
}