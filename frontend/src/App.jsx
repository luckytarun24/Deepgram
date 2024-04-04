import { useState } from "react";
import axios from "axios";
import "./index.css";
const UploadButton = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [transcript, setTranscript] = useState("");

  // Function to handle file upload
  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle API call after upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await axios.post(
        "http://localhost:3000/getTranscript",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Include any necessary headers for authorization or other requirements
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );

      console.log("API Response:", response.data);
      // Set the transcript state with the received response
      setTranscript(
        response.data.transcript.result.results.channels[0].alternatives[0]
          .transcript
      );
    } catch (error) {
      console.error("Error:", error.message);
      // Handle errors here
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-input">
        <input type="file" onChange={handleFileUpload} />
        <span>
          <i className="fas fa-upload"></i> Choose File
        </span>
      </div>
      <button className="upload-btn" onClick={handleUpload}>
        Upload & Hit API
      </button>
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
      {transcript && (
        <div className="transcript-box">
          <h3>Transcript:</h3>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default UploadButton;
