import { GoogleGenerativeAI } from "@google/generative-ai";

export function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY tanımlı değil. Google AI Studio ücretsiz anahtar alın.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // gemini-2.0-flash 1 Haz 2026'da kapanıyor; ücretsiz kotada 2.5 Flash-Lite önerilir
  return genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash-lite"
  });
}
