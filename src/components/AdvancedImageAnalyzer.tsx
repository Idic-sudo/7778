import React, { useState } from 'react';
import exifr from 'exifr';
import { ImageAnalysisResult } from '../types';

export const AdvancedImageAnalyzer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [exifData, setExifData] = useState<any>(null);
  const [analysis, setAnalysis] = useState<ImageAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      setImage(reader.result as string);
      try {
        const buffer = await file.arrayBuffer();
        const exif = await exifr.parse(buffer);
        setExifData(exif || null);
      } catch { setExifData(null); }
    };
    reader.readAsDataURL(file);
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
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const lat = exifData && typeof exifData.GPSLatitude === 'number' ? exifData.GPSLatitude : null;
  const lng = exifData && typeof exifData.GPSLongitude === 'number' ? exifData.GPSLongitude : null;
  const hasGps = lat !== null && lng !== null;

  const exifRows: Array<[string, any]> = [];
  if (exifData) {
    exifRows.push(['Make', exifData.Make]);
    exifRows.push(['Model', exifData.Model]);
    exifRows.push(['DateTimeOriginal', exifData.DateTimeOriginal]);
    exifRows.push(['FNumber', exifData.FNumber]);
    exifRows.push(['ISO', exifData.ISO]);
    exifRows.push(['ExposureTime', exifData.ExposureTime]);
    exifRows.push(['FocalLength', exifData.FocalLength]);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
        <h2 className="text-xl font-black text-white mb-4">Advanced Image Analyzer</h2>
        <div className="flex flex-wrap items-center gap-4">
          <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-slate-400" />
          {image && <img src={image} alt="Preview" className="h-32 rounded-xl border border-slate-800" />}
          <button onClick={handleAnalyze} disabled={!image || loading} className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-black disabled:opacity-40">
            {loading ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </div>
      </div>

      {exifData && (
        <div className="rounded-3xl border border-emerald-500/30 bg-slate-950 p-6">
          <h3 className="text-sm font-bold text-emerald-400 mb-3">EXIF Data</h3>
          <table className="w-full text-xs font-mono">
            <tbody>
              {exifRows.map(([k, v]) => (
                <tr key={k} className="border-b border-slate-800/50">
                  <td className="py-1.5 text-cyan-400">{k}</td>
                  <td className="py-1.5 text-slate-300">{v === undefined || v === null ? '—' : String(v)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {hasGps ? (
            <div className="mt-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3">
              <p className="text-xs font-mono text-emerald-300">الإحداثيات: {lat}, {lng}</p>
              <a href={`https://www.google.com/maps?q=${lat},${lng}`} target="_blank" rel="noreferrer"
                 className="mt-2 inline-block px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-[11px] font-black hover:bg-emerald-400">
                فتح في الخرائط
              </a>
            </div>
          ) : (
            <p className="mt-3 text-xs text-slate-500">لا توجد بيانات GPS في هذه الصورة (أُرسلت من تطبيق يمسحها أو بدون موقع).</p>
          )}
        </div>
      )}

      {analysis && (
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
          <h3 className="text-sm font-bold text-cyan-400 mb-3">AI Analysis</h3>
          <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap">{JSON.stringify(analysis, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
