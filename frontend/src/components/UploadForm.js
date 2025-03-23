import { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({ subject: "", year: "", department: "", semester: "" });
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file.");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    Object.keys(metadata).forEach(key => formData.append(key, metadata[key]));

    try {
      await axios.post("http://localhost:5000/api/upload", formData);
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Upload Question Paper</h2>
      
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input 
          type="file" 
          className="border p-2 rounded-md" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
        <input 
          type="text" placeholder="Subject" 
          className="border p-2 rounded-md" 
          onChange={(e) => setMetadata({...metadata, subject: e.target.value})} 
        />
        <input 
          type="text" placeholder="Year (e.g., 2024-2025)" 
          className="border p-2 rounded-md" 
          onChange={(e) => setMetadata({...metadata, year: e.target.value})} 
        />
        <input 
          type="text" placeholder="Department" 
          className="border p-2 rounded-md" 
          onChange={(e) => setMetadata({...metadata, department: e.target.value})} 
        />
        <input 
          type="text" placeholder="Semester" 
          className="border p-2 rounded-md" 
          onChange={(e) => setMetadata({...metadata, semester: e.target.value})} 
        />

        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
