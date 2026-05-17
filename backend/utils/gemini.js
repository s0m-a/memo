import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeImageFromUrl = async (imageUrl) => {
  // 1. Download image from Cloudinary and convert to base64
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const base64Data = Buffer.from(arrayBuffer).toString("base64");

  // 2. Detect image type from URL
  const mimeType = imageUrl.includes(".png")
    ? "image/png"
    : imageUrl.includes(".webp")
      ? "image/webp"
      : "image/jpeg";

  // 3. Call Gemini
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType,
        data: base64Data,
      },
    },
    `Analyze this image and provide a creative, short title (max 5 words) and a warm, emotional 1-2 sentence description.
     IMPORTANT: Write the description in the FIRST PERSON (use "I", "my", "me"). Imagine this is your own personal memory.
     Respond with a SINGLE JSON object only, no markdown, no extra text:
     { "title": "...", "description": "..." }`,
  ]);

  // 4. Parse and return
  const text = result.response.text().trim();
  const clean = text.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(clean);
  } catch (error) {
    console.error("Failed to parse Gemini response:", text);
    throw new Error("Invalid response from AI");
  }
};
