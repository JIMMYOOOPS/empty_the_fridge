import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { GenAIService } from './gen_ai_service/gen_ai.service';

@Module({
    imports: [
        ConfigModule,
    ],
    providers: [
        GenAIService
    ],
    exports: [],
})
export class ExternalServicesModule {}