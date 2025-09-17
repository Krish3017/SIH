import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body as {
      messages: { role: "user" | "assistant" | "system"; content: string }[];
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
    });

    const reply = completion.choices?.[0]?.message?.content ?? "";
    return res.json({ reply });
  } catch (error) {
    console.error("/api/chat error:", error);
    return res.status(500).json({ error: "OpenAI request failed" });
  }
});

const port = process.env.PORT || 8787;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});


