import React, { useState } from 'react';
import { ImageAnalysisResult } from '../types';

export const AdvancedImageAnalyzer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ImageAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setAnalysis(null);
    try {
      const base64Image = image.split(',')[1];
      const response = await fetch('/api/ai/image-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image })
      });
      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-slate-900 text-white rounded-lg border border-slate-700">
      <h2 className="text-2xl font-bold mb-4">Advanced Image Analyzer</h2>
      <input type="file" onChange={handleImageChange} className="mb-4 block" accept="image/*" />
      {image && <img src={image} alt="Preview" className="mb-4 max-h-64 rounded" />}
      <button 
        onClick={handleAnalyze} 
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors" 
        disabled={loading || !image}
      >
        {loading ? 'Analyzing...' : 'Analyze Image'}
      </button>
      {analysis && (
        <pre className="mt-4 bg-slate-800 p-4 rounded overflow-auto text-sm text-gray-300">
          {JSON.stringify(analysis, null, 2)}
        </pre>
      )}
    </div>
  );
};
