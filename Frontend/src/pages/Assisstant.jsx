import React, { useEffect, useState,useContext } from "react";
import { Card, CardContent } from "../components/Card.jsx";
import { Input } from "../components/input.jsx";
import { Button } from "../components/button.jsx";
import axios from "axios";
import { Camera, Search, History } from "lucide-react";
import { AppContext } from "../context/AppContext.jsx";
export default function PrescriptionScanner() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const{backendUrl } = useContext(AppContext)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  const analyzePrescription = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(backendUrl + '/api/analyze-prescription',formData)
      console.log(response.data)
      //const data = await response.json();
      //console.log("Analysis Result:", data);
      setAnalysisResult(response.data);
    } catch (error) {
      console.error("Error analyzing prescription:", error);
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-100 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6">
        👋 HI! I AM YOUR PHARM-ATE
      </h1>

      <Card className="w-full max-w-md p-6 shadow-xl rounded-lg bg-white">
        <CardContent className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-gray-700">
            📄 Scan Your Prescription
          </h2>

          <div className="flex flex-col items-center gap-3">
            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />

            {/* Upload Button */}
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex items-center gap-2 border p-2 rounded-lg text-sm w-full justify-center bg-gray-200 hover:bg-gray-300"
            >
              <Camera className="w-5 h-5" />{" "}
              {selectedImage ? "Image Selected" : "Upload Image"}
            </label>
          </div>

          {/* Analyze Prescription Button */}
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white transition-all py-2 rounded-lg flex items-center justify-center gap-2"
            onClick={analyzePrescription}
          >
            <Search className="w-5 h-5" /> Analyze Prescription
          </Button>
          {analysisResult && (
            <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded-md text-green-800 text-sm">
              <p>
                <strong>📝 Extracted Text:</strong>{" "}
                {analysisResult.extracted_text}
              </p>
              <p>
                <strong>👨‍⚕️ Recommended Specialist:</strong>{" "}
                {analysisResult.recommended_specialist}
              </p>
            </div>
          )}

          <hr className="border-gray-300" />
        </CardContent>
      </Card>
    </div>
  );
}
