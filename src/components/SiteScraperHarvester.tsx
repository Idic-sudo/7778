import React, { useState } from 'react';
import { Globe, Download, Image as ImageIcon, ExternalLink, ShieldAlert, Sparkles, Check, Crosshair, Copy, Zap } from 'lucide-react';

interface SiteScraperHarvesterProps {
  language?: 'ar' | 'en';
}

export const SiteScraperHarvester: React.FC<SiteScraperHarvesterProps> = ({ language = 'ar' }) => {
  const isAr = language === 'ar';
  const [url, setUrl] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hunterLinks, setHunterLinks] = useState<Record<string, string>>({});
  const [loadingLinks, setLoadingLinks] = useState<Record<string, boolean>>({});
  const [copiedLinks, setCopiedLinks] = useState<Record<string, boolean>>({});

  const t = (ar: string, en: string) => (isAr ? ar : en);

  const handleScrape = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      if (data.images) {
        setImages(data.images);
      }
    } catch (err: any) {
      alert('Scraping error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConvertToHunter = async (imgUrl: string) => {
    setLoadingLinks(prev => ({ ...prev, [imgUrl]: true }));
    try {
      const res = await fetch('/api/hunter/image-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: imgUrl,
          hunterName: 'Scraped_' + Date.now()
        })
      });
      const data = await res.json();
      if (data.success && data.hunterUrl) {
        setHunterLinks(prev => ({ ...prev, [imgUrl]: data.hunterUrl }));
      } else {
        alert(data.error || 'Failed to create hunter link');
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setLoadingLinks(prev => ({ ...prev, [imgUrl]: false }));
    }
  };

  const handleCopy = (link: string, imgUrl: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLinks(prev => ({ ...prev, [imgUrl]: true }));
    setTimeout(() => {
      setCopiedLinks(prev => ({ ...prev, [imgUrl]: false }));
    }, 2000);
  };

  const convertedCount = Object.keys(hunterLinks).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <Globe className="w-8 h-8 text-emerald-400" />
          <div>
            <h2 className="text-xl font-bold text-white">
              {t('محلل المواقع وساحب الصور (Site Scraper & Harvester)', 'Site Scraper & Harvester')}
            </h2>
            <p className="text-sm text-slate-400">
              {t('استخراج الأصول البصرية والصور بدقة عالية من أي موقع إلكتروني مستهدف وتحويلها إلى روابط صيد', 'Extract visual assets and high-res images from any targeted website and convert them into hunting links')}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <input 
            type="url" 
            placeholder="https://example.com" 
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono text-sm"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <button 
            onClick={handleScrape} 
            disabled={loading || !url}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/40 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? t('جاري السحب...', 'Scraping...') : t('سحب الصور والمحتوى', 'Scrape Images')}
          </button>
        </div>

        {images.length > 0 && (
          <div className="space-y-4">
            {/* شريط الإحصاءات */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <ImageIcon size={14} className="text-emerald-400" />
                  {t('إجمالي الصور:', 'Total Images:')} <strong className="text-white">{images.length}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Crosshair size={14} className="text-pink-400" />
                  {t('روابط الصيد المُولّدة:', 'Hunter Links Generated:')} <strong className="text-pink-400">{convertedCount}</strong>
                </span>
              </div>
              <span className="text-slate-500 truncate max-w-xs">Target: {url}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2">
              {images.map((img, i) => {
                const hunterUrl = hunterLinks[img];
                const isConverted = Boolean(hunterUrl);
                const isLoadingLink = loadingLinks[img];
                const isCopied = copiedLinks[img];

                return (
                  <div key={i} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 group relative hover:border-emerald-500/50 transition-all space-y-3">
                    <div className="w-full h-40 bg-slate-900 rounded-xl overflow-hidden relative border border-slate-800">
                      <img src={img} alt={`Scraped ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-xs px-2 py-1 rounded-lg text-[10px] font-mono text-slate-300">
                        #{i + 1}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 truncate max-w-[180px] font-mono">{img.split('/').pop()}</span>
                      <a 
                        href={img} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono"
                      >
                        <ExternalLink size={12} /> View
                      </a>
                    </div>

                    {/* أزرار التحويل للصيد */}
                    <div className="pt-2 border-t border-slate-900 space-y-2">
                      {!isConverted ? (
                        <button
                          onClick={() => handleConvertToHunter(img)}
                          disabled={isLoadingLink}
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-400 text-xs font-bold transition-all shadow-sm"
                        >
                          <Crosshair size={14} className={isLoadingLink ? 'animate-spin' : ''} />
                          {isLoadingLink ? t('جاري التوليد...', 'Generating...') : t('تحويل لرابط صيد', 'Convert to Hunter Link')}
                        </button>
                      ) : (
                        <div className="space-y-2 bg-slate-900/80 border border-pink-500/30 rounded-xl p-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                              <Sparkles size={11} /> {t('جاهز للصيد — أرسله لأي شخص', 'Ready to hunt — send to anyone')}
                            </span>
                            <button
                              onClick={() => handleCopy(hunterUrl, img)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-500 text-slate-950 font-bold text-[11px] hover:bg-pink-400 transition-all shadow-sm"
                            >
                              {isCopied ? <Check size={12} /> : <Copy size={12} />}
                              {isCopied ? t('تم النسخ', 'Copied') : t('نسخ رابط الصيد', 'Copy Hunter Link')}
                            </button>
                          </div>
                          <input
                            type="text"
                            readOnly
                            value={hunterUrl}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-[10px] font-mono text-cyan-300 focus:outline-none"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
