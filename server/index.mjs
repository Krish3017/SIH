import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.warn("[API] OPENAI_API_KEY is not set. Requests will fail until you add it to .env");
}
const client = new OpenAI({ apiKey });

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body ?? {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const completion = await client.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
    });

    const reply = completion?.choices?.[0]?.message?.content ?? "";
    if (!reply) {
      return res.status(502).json({ error: "Empty response from OpenAI" });
    }
    return res.json({ reply });
  } catch (error) {
    console.error("/api/chat error:", error?.message || error);
    return res.status(500).json({ error: error?.message || "OpenAI request failed" });
  }
});

const port = process.env.PORT || 8787;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});


