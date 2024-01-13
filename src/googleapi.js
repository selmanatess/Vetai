import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const system =
  "sana bir soru soracağım.Soracağım soruyu sanki veterinermişsin gibi hayvanın hastlaığı hakkında tedavisini,belirtilerini,hastalığın tanımını ve tedavi için ne yapabilceğini anlatıcaksın işte sana soracağım soru=";
async function googleapi(prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // Use streaming with text-only input
  const result = await model.generateContentStream(system + prompt);
  const response = await result.response;
  const text = response.text();
  const data = { response: text };
  return data;
}
export { googleapi };
