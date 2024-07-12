import { IGenAIService } from '../interface/gen_ai_service.interface';
import { GeminiAIService } from '../../external_services/gen_ai_service/gemeni.service';
import { GEN_AI_SERVICE_NAME } from '../constants/gen_ai.constants';

export class AIServiceFactory {
  static createService(serviceType: string): IGenAIService {
    switch (serviceType) {
      case GEN_AI_SERVICE_NAME:
        return new GeminiAIService();
      default:
        throw new Error('Unsupported AI service type');
    }
  }
}