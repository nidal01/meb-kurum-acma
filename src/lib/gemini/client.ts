import { GoogleGenerativeAI } from "@google/generative-ai";

export function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY tanımlı değil. Google AI Studio ücretsiz anahtar alın.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // Ücretsiz kotada yaygın model
  return genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL ?? "gemini-2.0-flash" });
}
