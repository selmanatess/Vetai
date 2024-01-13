// import { log } from "console";
// import fs from "fs";
// import natural from "natural";

// const tfidf = new natural.TfIdf();
// async function getData(prompt) {
//   try {
//     fs.readFile("data/diases.json", (err, data) => {
//       const veri = JSON.parse(data);

//       const result = main(veri, prompt);
//       console.log(result);
//     });
//   } catch (err) {
//     console.error("Dosya okuma hatası:", err);
//     return;
//   }
// }

// function main(veri, prompt) {
//   let maxSimilarity = -1;
//   let mostSimilarIndex = -1;

//   const qaPairs = veri.qa_pairs;

//   const questions = qaPairs.map((pair) => tfidf.addDocument(pair.question));
//   const answers = qaPairs.map((pair) => pair.answer);

//   tfidf.tfidfs(prompt, function (i, measure) {
//     if (measure > maxSimilarity) {
//       maxSimilarity = measure;
//       mostSimilarIndex = i;
//     }
//   });
//   console.log(qaPairs[mostSimilarIndex].answer);
//   return [qaPairs[mostSimilarIndex].answer];
// }
// export { getData };
