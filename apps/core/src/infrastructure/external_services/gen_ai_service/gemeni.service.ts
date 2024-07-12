import { Injectable } from "@nestjs/common";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEN_AI_MODEL } from "../../common/constants/gen_ai.constants";

@Injectable()

export class GeminiAIService {
    private readonly apiKey: string;

    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY;
    }
    async generateText(prompt: string): Promise<string> {
        // Call the Gemini API
        const genAI = new GoogleGenerativeAI(this.apiKey);
        const model = genAI.getGenerativeModel({ model: GEN_AI_MODEL});
        const result = await model.generateContent(prompt);
        const response = result.response;
        // text is converted to json
        const recipe = response.text();
        // const recipe = JSON.parse(response.text());
        console.log('recipe', recipe);
        return recipe;
    }
}