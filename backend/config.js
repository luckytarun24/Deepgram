import { createClient } from "@deepgram/sdk";
import dotenv from "dotenv";
dotenv.config();

const deepgramSDK = createClient(process.env.DEEPGRAM_API_KEY);

export { deepgramSDK };
