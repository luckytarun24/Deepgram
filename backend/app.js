import express from "express";
import cors from "cors";
import multer from "multer";


import getTranscript from "./deepgram.js";

const app = express();
const PORT = 3000;

app.use(cors());

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });


app.post("/getTranscript",upload.single("file"), getTranscript);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
