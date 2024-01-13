import express from "express";
import bodyParser from "body-parser";

import cors from "cors";
import { googleapi } from "./googleapi.js";
import OpenAI from "openai";
import { config } from "dotenv";

import natural from "natural";
import fs from "fs";

const tfidf = new natural.TfIdf();

config();

const openai = new OpenAI({
  apiKey: process.env.CHAT_API_KEY,
});

const app = express();
app.use(cors());
app.use(bodyParser.json()); // JSON verileri için
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.post("/chatapi", async (req, res) => {
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Selman ATEŞ tarafından geliştirilen akıllı bir veterinersin.Kullancının kendi hayvanı sorduğu hastalık belirtileri ile bir hastalık tanısı koyup o anda neler yapabileceği hakkında basit tavsiyeler verip ek olarak ise kullanması gereken ilaç vs gibi ürünleride söylüyorsun.Kullanıcıdan gelen soruların sadece veterinerlikle ilgili olan soruları cevaplayacaksın",
      },
      {
        role: "user",
        content: req.body.message,
      },
    ],
    stream: true,
  });
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || "";

    res.write(content);
  }
  res.end();
});
app.post("/googleapi", async (req, res) => {
  const result = await googleapi(req.body.message);

  res.status(200).send(result);
});

app.post("/local", async (req, res) => {
  try {
    fs.readFile("data/diases.json", (err, data) => {
      const userInput = req.body.message;
      const veri = JSON.parse(data);
      let maxSimilarity = -1;
      let mostSimilarIndex = -1;

      const qaPairs = veri.qa_pairs;

      qaPairs.map((pair) => tfidf.addDocument(pair.question));
      tfidf.tfidfs(userInput, function (i, measure) {
        if (measure > maxSimilarity) {
          maxSimilarity = measure;
          mostSimilarIndex = i;
        }
      });

      const result = {
        response: qaPairs[mostSimilarIndex].answer,
      };

      res.status(200).send(result);
    });
  } catch (err) {
    console.error("Dosya okuma hatası:", err);
    res.status(404).send("Error can not read file");
  }
});

app.listen(port, () => {
  console.log(`Proje ${port} portundan dinleniyor`);
});
