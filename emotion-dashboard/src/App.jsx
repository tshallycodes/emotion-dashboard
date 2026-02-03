import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./App.css";

const App = () => {

  const [fileImage, setFileImage] = useState(null);
  const [filePrediction, setFilePrediction] = useState(null);


  // File upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileImage(reader.result);
        setFilePrediction(null); // reset previous prediction   
      };
      reader.readAsDataURL(file);
    }
  };

  // Predict from file
  const predictFile = async () => {
    if (!fileImage) return;
    try {
      const response = await axios.post("http://localhost:8000/predict", {
        image: fileImage
      });
      setFilePrediction(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="the-container">
      <div className="app-header">
        <h1>Emotion Detector</h1>
      </div>

      <div className="controls-container">
        <div className="control-box">
          {/* File Prediction Output */}
          <div className="prediction-output">
            <h3>
              Detected Emotion: {filePrediction ? filePrediction.emotion : "--"}
            </h3>

            <p>
              Confidence: {filePrediction ? filePrediction.confidence.toFixed(2) : "0.00"}%
            </p>

            {fileImage && (
              <img
                src={fileImage}
                alt="Uploaded File"
                className="prediction-image"
              />
            )}

            <div className="prob-bars">
              {(filePrediction?.probabilities
                ? Object.entries(filePrediction.probabilities)
                : [
                  ["Angry", 0],
                  ["Disgust", 0],
                  ["Fear", 0],
                  ["Happy", 0],
                  ["Sad", 0],
                  ["Surprise", 0],
                  ["Neutral", 0],
                ]
              ).map(([emotion, prob]) => (
                <div key={emotion} className="prob-bar-container">
                  <span className="prob-label">{emotion}</span>
                  <div className="prob-bar">
                    <div
                      className="prob-bar-fill"
                      style={{ width: `${prob.toFixed(1)}%` }}
                    />
                  </div>
                  <span className="prob-value">{prob.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* File Upload Box */}
      <div className="control-box">
        <h2 className="control-box-header">Upload Image</h2>
        <input type="file" onChange={handleFileChange} accept="image/*" className="file-upload-input" />
        {/* {fileImage && <img src={fileImage} alt="Uploaded" width={250} />} */}
        <button onClick={predictFile} className="predict-btn">Predict</button>
      </div>
    </div>
  );
};

export default App;