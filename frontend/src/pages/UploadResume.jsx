import React, { useState } from "react";
import axios from "axios";
import MainLayout from "../components/layout/MainLayout";
import UploadDropzone from "../components/upload/UploadDropzone";
import UploadCard from "../components/upload/UploadCard";
import AnalysisCard from "../components/upload/AnalysisCard";
import ATSCard from "../components/upload/ATSCard";
import SuggestionCard from "../components/upload/SuggestionCard";
import Alert from "../components/common/Alert";
import Button from "../components/common/Button";
import { FaRedo } from "react-icons/fa";

function UploadResume() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  // Handle File Selection from Dropzone
  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setPredictionResult(null);
    setAlert(null);
    setUploadProgress(0);
  };

  // Handle File Removal
  const handleFileRemove = () => {
    setSelectedFile(null);
    setPredictionResult(null);
    setUploadProgress(0);
    setAlert(null);
  };

  // Handle File Error (e.g. non-PDF or file > 10MB)
  const handleFileError = (errorMessage) => {
    setAlert({
      type: "error",
      title: "File Validation Error",
      message: errorMessage,
    });
  };

  // Section 5 & 6: Axios POST Request to http://127.0.0.1:8000/predict/resume
  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setAlert(null);
    setUploadProgress(15);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict/resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percent);
            }
          },
        }
      );

      // Backend response: { "predicted_category": "Testing" } or APIResponse object
      const data = response.data;
      const categoryName =
        data?.predicted_category ||
        data?.data?.predicted_category ||
        "Testing";

      setPredictionResult({
        predicted_category: categoryName,
      });

      setAlert({
        type: "success",
        title: "Resume Analyzed Successfully!",
        message: `HireSmart AI classified resume under category: '${categoryName}'.`,
      });
    } catch (error) {
      console.error("Prediction API Error:", error);

      // Fallback response if local backend is offline during frontend testing
      setPredictionResult({
        predicted_category: "Testing",
      });

      const detailMsg =
        error.response?.data?.detail ||
        error.message ||
        "Backend server at http://127.0.0.1:8000/predict/resume unreachable.";

      setAlert({
        type: "error",
        title: "Backend Connection Notice",
        message: `${detailMsg} Displaying output results for category: 'Testing'.`,
      });
    } finally {
      setIsLoading(false);
      setUploadProgress(100);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* SECTION 1: Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Upload Resume
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Upload a candidate's resume and let HireSmart AI analyze it instantly.
            </p>
          </div>

          {predictionResult && (
            <Button
              variant="outline"
              size="sm"
              icon={FaRedo}
              onClick={handleFileRemove}
            >
              Analyze Another Resume
            </Button>
          )}
        </div>

        {/* Modern Alert Notifications */}
        {alert && (
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* SECTION 2, 3, 4: Upload Area & File Card */}
        {!predictionResult && (
          <div className="space-y-6">
            {!selectedFile ? (
              <UploadDropzone
                onFileSelect={handleFileSelect}
                onError={handleFileError}
              />
            ) : (
              <UploadCard
                file={selectedFile}
                onRemove={handleFileRemove}
                onReplace={handleFileSelect}
                onAnalyze={handleAnalyze}
                uploadProgress={uploadProgress}
                isLoading={isLoading}
              />
            )}
          </div>
        )}

        {/* SECTION 7, 8, 9, 10: Analysis Results & Metrics Cards */}
        {predictionResult && (
          <div className="space-y-6">
            {/* SECTION 7 & 8: Category Analysis & Skill Badges Card */}
            <AnalysisCard prediction={predictionResult} />

            {/* SECTION 9 & 10: ATS Score & Suggestions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5">
                <ATSCard score={86} quality="Excellent" />
              </div>
              <div className="md:col-span-7">
                <SuggestionCard />
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default UploadResume;