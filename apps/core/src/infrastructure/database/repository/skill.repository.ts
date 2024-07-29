import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { Skill } from '@core/domain/models/skill.model'
import { GetBatchResult } from '@prisma/client/runtime/library';

@Injectable()
export class SkillRepository {
    private readonly logger = new Logger(SkillRepository.name);
    constructor(
        private readonly databaseService: DatabaseService,
    ) {}

    async findMany(skills: string[]): Promise<Skill[]> {
        try {
            return await this.databaseService.prisma.skill.findMany({
                where: {
                    name: {
                        in: skills,
                    },
                },
            });
        } catch (error) {
            this.logger.error(`Failed to find skills: ${error}`);
            throw error;
        }
    }

    async createMany(skills: string[]): Promise<GetBatchResult> {
        try {
            const result = await this.databaseService.prisma.skill.createMany({
                data: skills.map((skill) => ({
                    name: skill,
                })),
            });
            return result;
        } catch (error) {
            this.logger.error(`Failed to create skills: ${error}`);
            throw error;
        }
    }
}