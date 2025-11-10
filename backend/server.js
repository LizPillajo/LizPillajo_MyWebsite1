import path from "path";
import { fileURLToPath } from "url";
import express, { json } from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use(express.static(path.join(__dirname, "../")));

app.get("/", (req, res) => {
    res.send("Disney Characters Backend Server running")
});

app.get("/api/character", async (req, res) =>{
    const {name} = req.query;

    if(!name){
        return res.status(400),json({error: "The character is missing."});
    }

    try{
        const response = await fetch(`https://api.disneyapi.dev/character?name=${encodeURIComponent(name)}`);
        const data = await response.json();
        res.json(data);
        
    }catch(error){
        console.error("Error retrieving data.", error);
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`)
});