import { Module } from '@nestjs/common';
import { SkillRepository } from '@core/infrastructure/database/repository/skill.repository';

@Module({
    imports: [],
    controllers: [],
    providers: [SkillRepository],
    exports: [SkillRepository]
})
export class SkillModule {}