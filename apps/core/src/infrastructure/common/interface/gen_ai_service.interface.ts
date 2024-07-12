export interface IGenAIService {
    generateText(prompt: string): Promise<string>;
  }