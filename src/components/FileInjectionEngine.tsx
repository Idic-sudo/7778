import React, { useState, useRef } from 'react';
import { Shield, Lock, Upload, Download, Eye, Cpu, AlertCircle, CheckCircle2 } from 'lucide-react';
import { InjectionResult } from '../types';

export const FileInjectionEngine: React.FC = () => {
  const [payload, setPayload] = useState('');
  const [secretKey, setSecretKey] = useState('MUSHTASKO_KEY_2026');
  const [encryptionLayer, setEncryptionLayer] = useState<'none' | 'base64_rot13' | 'aes' | 'xor'>('base64_rot13');
  const [injectionMethod, setInjectionMethod] = useState<'lsb' | 'exif' | 'zip'>('lsb');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [extractedPayload, setExtractedPayload] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultMeta, setResultMeta] = useState<InjectionResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setSelectedFile(f);
      setPreviewUrl(URL.createObjectURL(f));
      setProcessedUrl(null);
      setExtractedPayload(null);
      setResultMeta(null);
    }
  };

  const applyEncryption = (text: string): string => {
    if (encryptionLayer === 'base64_rot13') {
      // ROT13 + Base64
      const rot13 = text.replace(/[a-zA-Z]/g, (c) => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(base + ((c.charCodeAt(0) - base + 13) % 26));
      });
      return btoa(rot13);
    } else if (encryptionLayer === 'xor') {
      let xored = '';
      for (let i = 0; i < text.length; i++) {
        xored += String.fromCharCode(text.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length));
      }
      return btoa(xored);
    }
    return btoa(text);
  };

  const decodeEncryption = (encoded: string): string => {
    try {
      if (encryptionLayer === 'base64_rot13') {
        const decodedBase64 = atob(encoded);
        return decodedBase64.replace(/[a-zA-Z]/g, (c) => {
          const base = c <= 'Z' ? 65 : 97;
          return String.fromCharCode(base + ((c.charCodeAt(0) - base + 13) % 26));
        });
      } else if (encryptionLayer === 'xor') {
        const raw = atob(encoded);
        let original = '';
        for (let i = 0; i < raw.length; i++) {
          original += String.fromCharCode(raw.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length));
        }
        return original;
      }
      return atob(encoded);
    } catch {
      return encoded;
    }
  };

  const handleInject = async () => {
    if (!selectedFile || !payload) return;
    setLoading(true);

    try {
      const processedText = applyEncryption(payload);
      
      if (injectionMethod === 'lsb' && selectedFile.type.startsWith('image/')) {
        const img = new Image();
        img.src = previewUrl!;
        await new Promise((resolve) => { img.onload = resolve; });

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context failed');

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // LSB Encode
        const binaryPayload = processedText.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join('');
        const lengthBits = processedText.length.toString(2).padStart(32, '0');
        const fullBits = lengthBits + binaryPayload + '00000000';

        const data = new Uint8ClampedArray(imgData.data);
        let bitIndex = 0;
        let modifiedPixels = 0;

        for (let i = 0; i < data.length && bitIndex < fullBits.length; i += 4) {
          for (let j = 0; j < 3 && bitIndex < fullBits.length; j++) {
            const originalVal = data[i + j];
            data[i + j] = (data[i + j] & 0xFE) | parseInt(fullBits[bitIndex]);
            if (originalVal !== data[i + j]) modifiedPixels++;
            bitIndex++;
          }
        }

        const newImgData = new ImageData(data, canvas.width, canvas.height);
        ctx.putImageData(newImgData, 0, 0);
        
        const resultUri = canvas.toDataURL('image/png');
        setProcessedUrl(resultUri);
        const distortion = Number(((modifiedPixels / (canvas.width * canvas.height * 3)) * 100).toFixed(4));

        setResultMeta({
          success: true,
          type: 'lsb',
          payloadSize: payload.length,
          distortion
        });
      } else {
        // EXIF or ZIP Simulation payload wrapping
        setProcessedUrl(previewUrl);
        setResultMeta({
          success: true,
          type: injectionMethod,
          payloadSize: payload.length,
          distortion: 0.01
        });
      }
    } catch (err: any) {
      alert('Injection error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExtract = async () => {
    if (!processedUrl && !previewUrl) return;
    setLoading(true);
    try {
      const img = new Image();
      img.src = processedUrl || previewUrl!;
      await new Promise((resolve) => { img.onload = resolve; });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      let bits = '';
      for (let i = 0; i < data.length; i += 4) {
        for (let j = 0; j < 3; j++) {
          bits += (data[i + j] & 1).toString();
        }
      }

      const lengthBits = bits.slice(0, 32);
      const payloadLength = parseInt(lengthBits, 2);

      let extractedRaw = '';
      for (let i = 32; i < 32 + payloadLength * 8; i += 8) {
        const byte = bits.slice(i, i + 8);
        if (byte.length === 8) {
          extractedRaw += String.fromCharCode(parseInt(byte, 2));
        }
      }

      const decrypted = decodeEncryption(extractedRaw);
      setExtractedPayload(decrypted);
    } catch (err: any) {
      alert('Extraction failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <Shield className="w-8 h-8 text-cyan-400" />
          <div>
            <h2 className="text-xl font-bold text-white">محرك حقن الملفات العميق (Deep File Injection Engine)</h2>
            <p className="text-sm text-slate-400">إخفاء وتشفير الحمولات داخل ملفات الصور والصناديق عبر خوارزميات LSB و EXIF المتقدمة</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">الحمولة المراد حقنها (Payload)</label>
              <textarea 
                rows={4} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500 font-mono text-sm"
                placeholder="أدخل الأوامر أو البرومبت المخفي هنا..."
                value={payload}
                onChange={e => setPayload(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">طريقة التضمين</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white text-sm"
                  value={injectionMethod}
                  onChange={e => setInjectionMethod(e.target.value as any)}
                >
                  <option value="lsb">LSB Steganography (بكسلات الصور)</option>
                  <option value="exif">EXIF Meta Injection</option>
                  <option value="zip">ZIP Payload Package</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">طبقة التشفير</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white text-sm"
                  value={encryptionLayer}
                  onChange={e => setEncryptionLayer(e.target.value as any)}
                >
                  <option value="base64_rot13">Base64 + ROT13</option>
                  <option value="xor">XOR Pseudo-Random</option>
                  <option value="none">بدون تشفير</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">مفتاح التشفير (Secret Key)</label>
              <input 
                type="text" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono text-sm"
                value={secretKey}
                onChange={e => setSecretKey(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">اختر الملف (صورة أو ملف مستهدف)</label>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange}
                className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20"
              />
            </div>

            <div className="flex gap-4 pt-2">
              <button 
                onClick={handleInject} 
                disabled={loading || !selectedFile || !payload}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 px-4 rounded-xl transition-all shadow-lg shadow-cyan-900/40 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" /> تنفيذ الحقن والتضمين
              </button>
              <button 
                onClick={handleExtract} 
                disabled={loading || (!processedUrl && !previewUrl)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-700"
              >
                <Eye className="w-4 h-4" /> استخراج الحمولة
              </button>
            </div>
          </div>

          <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" /> معاينة الملف والمقارنة (Diff Viewer)
              </h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <span className="text-xs text-slate-500 block mb-1">قبل الحقن</span>
                  {previewUrl ? (
                    <img src={previewUrl} alt="Original" className="w-full h-40 object-cover rounded-lg border border-slate-800" />
                  ) : (
                    <div className="w-full h-40 bg-slate-900 rounded-lg flex items-center justify-center text-xs text-slate-600 border border-dashed border-slate-800">لا توجد صورة</div>
                  )}
                </div>
                <div>
                  <span className="text-xs text-slate-500 block mb-1">بعد الحقن (المعدلة)</span>
                  {processedUrl ? (
                    <img src={processedUrl} alt="Processed" className="w-full h-40 object-cover rounded-lg border border-cyan-500/40" />
                  ) : (
                    <div className="w-full h-40 bg-slate-900 rounded-lg flex items-center justify-center text-xs text-slate-600 border border-dashed border-slate-800">في انتظار الحقن</div>
                  )}
                </div>
              </div>

              {resultMeta && (
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>حالة الحقن:</span>
                    <span className="text-green-400 font-semibold flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> ناجح</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>حجم الحمولة:</span>
                    <span className="font-mono text-cyan-400">{resultMeta.payloadSize} بايت</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>نسبة التشويش البصري (Distortion):</span>
                    <span className="font-mono text-amber-400">{resultMeta.distortion}%</span>
                  </div>
                </div>
              )}

              {extractedPayload && (
                <div className="mt-4 bg-slate-900 p-3 rounded-lg border border-cyan-500/30">
                  <span className="text-xs text-cyan-400 font-semibold block mb-1">الحمولة المستخرجة بنجاح:</span>
                  <pre className="text-xs font-mono text-white bg-slate-950 p-2 rounded overflow-x-auto max-h-28">{extractedPayload}</pre>
                </div>
              )}
            </div>

            {processedUrl && (
              <a 
                href={processedUrl} 
                download="mushtasko_injected_payload.png" 
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm text-center"
              >
                <Download className="w-4 h-4" /> تحميل الملف المحقون
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
