import OpenAI from "openai";
import { config } from "dotenv";

config();

const openai = new OpenAI({
  apiKey: process.env.CHAT_API_KEY,
});

async function chatapi(content) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helper who politely answers messages from the user",
      },
      { role: "user", content: content },
    ],
    model: "gpt-3.5-turbo-1106",
  });
  const result = completion.choices[0].message.content;
  const data = { message: result };
  return data;
}

export { chatapi };
