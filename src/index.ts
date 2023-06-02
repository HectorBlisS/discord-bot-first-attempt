import express, { Request, Response } from "express";
import dotenv from "dotenv";
import blissmoParser, { BlissmoReq } from "./utils/blissmoParser";
import { verifyOrDeny } from "./lib/verifySignatures";
dotenv.config();

const app = express();
app.use(express.static("public"));
// raw body and able to parse it then
app.use(blissmoParser);

// discord handshake
app.post("/webhooks", (req: BlissmoReq, res: Response) => {
  console.log("before");
  verifyOrDeny(req, res);
  console.log("BODY: ", req.json);
  if (req.json?.type === 1) {
    res.json({ type: 1 });
    return;
  }
  res.status(401).json({ message: "no type" });
});
app.post("/prueba", (req: BlissmoReq, res: Response) => {
  console.log("PEURBEA", req.json);
  res.json(req.json);
});

app.get("/", (_, res: Response) => {
  res.json({
    madeBy: "@blissito",
    secretEmojiPhrase: "🤓🧠🍿💸🤖",
    uniqueCoupon: "CODEWITHBLISS",
    v: 0.1,
    website: "fixtergeek.com",
  });
});

app.listen(process.env.PORT);
console.log("Ready at http://localhost:" + process.env.PORT);
