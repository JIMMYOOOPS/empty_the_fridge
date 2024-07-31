import { Injectable } from "@nestjs/common";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEN_AI_MODEL, GEN_AI_SERVICE_NAME } from "../../common/constants/gen_ai.constants";

@Injectable()

export class GeminiAIService {
    private readonly apiKey: string;

    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY;
    }
    async generateText(prompt: string): Promise<string> {
        // Call the Gemini API
        const genAI = new GoogleGenerativeAI(this.apiKey);
        const genAImodel = genAI.getGenerativeModel({ model: GEN_AI_MODEL});
        const result = await genAImodel.generateContent(prompt);
        const response = result.response;
        // Check for token used
        // console.log(`the total tokens used for ${GEN_AI_SERVICE_NAME} is ${response.usageMetadata.totalTokenCount}`);
        const text = response.text();
        return text;
    }
}