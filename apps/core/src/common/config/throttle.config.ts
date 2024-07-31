import { ConfigService } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const throttlerConfig = (configService: ConfigService): ThrottlerModuleOptions => (
    [
        {
            limit: configService.get<number>('THROTTLE_LIMIT_GENERATE_RECIPE', 4),
            ttl: configService.get<number>('THROTTLE_TTL_GENERATE_RECIPE', 10000),
        },
    ]
);