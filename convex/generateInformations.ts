import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { internal } from "./_generated/api"; // only needed if internal usage

export default async function generateInformations(prompt: string) {
    const apiKey = 'AIzaSyAjPTvHThrCHChnUpIp_G9KDm5gkG4hT_4';

    if (!apiKey) throw new Error("Missing Google Generative AI API key");

    const google = createGoogleGenerativeAI({ apiKey });

    const { text } = await generateText({
        temperature: 0.7,
        model: google("models/gemini-2.0-flash-exp"),
        prompt,
    });

    return text;
}

