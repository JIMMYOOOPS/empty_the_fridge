import { Injectable } from "@nestjs/common";
import { IGenAIService } from "@core/infrastructure/common/interface/gen_ai_service.interface";
import { AIServiceFactory } from "@core/infrastructure/common/factory/gen_ai_service.factory";
import { GEN_AI_SERVICE_NAME } from "@core/infrastructure/common/constants/gen_ai.constants";

@Injectable()
export class GenAIService implements IGenAIService {
    private genAI: any;

    constructor() {
        this.genAI= AIServiceFactory.createService(GEN_AI_SERVICE_NAME)
    }

    async generateText(prompt: string): Promise<string> {
        const text = await this.genAI.generateText(prompt);
        return text;
    }
}