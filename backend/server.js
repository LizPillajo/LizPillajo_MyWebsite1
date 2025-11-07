import express, { json } from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("Disney Characters Backend Server running");
});

app.get("/api/character", async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "The character is missing." });
  }

  try {
    const response = await fetch(
      `https://api.disneyapi.dev/character?name=${encodeURIComponent(name)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch from Disney API: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Error retrieving data." });
  }
});

export default app;