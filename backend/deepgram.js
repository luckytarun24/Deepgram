import { deepgramSDK } from "./config.js"; // Import your Deepgram SDK

const getTranscript = async (request, response) => {
  try {
    const fileData = request.file.buffer; // Retrieve the 'file' from FormData

    const options = {
      language: "sv",
      modal: "enhanced",
      replace: "",
      keyword: "",
    }; // Replace with your desired transcription options

    // Transcribe the file using the Deepgram SDK
    const transcript = await deepgramSDK.listen.prerecorded.transcribeFile(
      fileData, 
      options
    );

    // Send the transcript back as the response
    response.status(200).json({ transcript });
  } catch (error) {
    console.error("Error:", error.message);
    response
      .status(500)
      .json({ error: "An error occurred while transcribing the file." });
  }
};

export default getTranscript;
