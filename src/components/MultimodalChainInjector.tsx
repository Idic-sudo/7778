import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, FileText, Sparkles, Loader2, Copy, Check, Layers, Zap, Trash2, ArrowDown, ShieldAlert, Cpu } from 'lucide-react';

interface StageResult {
  prompt?: string;
  extracted?: string;
  midjourney?: any;
  stableDiffusion?: any;
  dalle?: any;
  flux?: any;
  [key: string]: any;
}

interface ChainStage {
  id: number;
  type: string;
  previewUrl: string | null;
  textValue: string;
  result: StageResult | null;
  loading: boolean;
  error: string | null;
}

interface FileInputRefs {
  [key: number]: HTMLInputElement | null;
}

export const MultimodalChainInjector = (props: any) => {
  const { language = 'ar' } = props || {};
  const isAr = language === 'ar';
  const fileInputs = useRef({} as FileInputRefs);

  const [stages, setStages] = useState([
    { id: 1, type: 'image', previewUrl: null, textValue: '', result: null, loading: false, error: null },
    { id: 2, type: 'text', previewUrl: null, textValue: '', result: null, loading: false, error: null },
    { id: 3, type: 'image', previewUrl: null, textValue: '', result: null, loading: false, error: null },
    { id: 4, type: 'text', previewUrl: null, textValue: '', result: null, loading: false, error: null },
  ] as ChainStage[]);

  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = (ar: string, en: string) => (isAr ? ar : en);

  const updateStage = (id: number, patch: Partial<ChainStage>) => {
    setStages((prev: ChainStage[]) => prev.map((s: ChainStage) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const handleFile = (id: number, file: File) => {
    if (!file.type.startsWith('image/')) {
      updateStage(id, { error: t('الملف يجب أن يكون صورة', 'File must be an image') });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateStage(id, { previewUrl: reader.result as string, result: null, error: null });
    reader.readAsDataURL(file);
  };

  const analyzeStage = async (id: number) => {
    const stage = stages.find((s: ChainStage) => s.id === id);
    if (!stage || stage.loading) return;
    if (stage.type === 'image' && !stage.previewUrl) return;
    if (stage.type === 'text' && !stage.textValue.trim()) return;
    updateStage(id, { loading: true, error: null });
    try {
      let result: StageResult;
      if (stage.type === 'image') {
        const base64 = (stage.previewUrl || '').split(',')[1] || stage.previewUrl || '';
        const res = await fetch('/api/ai/analyze-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        });
        if (!res.ok) throw new Error(t('فشل الاتصال بالخادم', 'Server error') + ' (' + res.status + ')');
        result = await res.json();
      } else {
        result = { extracted: stage.textValue, chain: true };
      }
      updateStage(id, { result, loading: false });
      const nextTextStage = stages.find((s: ChainStage) => s.id === id + 1 && s.type === 'text');
      const injected = result?.prompt || result?.extracted;
      if (nextTextStage && injected) {
        updateStage(nextTextStage.id, {
          textValue: injected + (nextTextStage.textValue ? '\n' + nextTextStage.textValue : ''),
        });
      }
    } catch (e: any) {
      updateStage(id, { loading: false, error: e.message });
    }
  };

  const runFullChain = async () => {
    setRunning(true);
    for (const stage of stages) {
      if (stage.type === 'image' && stage.previewUrl) await analyzeStage(stage.id);
    }
    setRunning(false);
  };

  const buildFinalPrompt = () => {
    const parts: string[] = [];
    stages.forEach((s: ChainStage) => {
      if (s.type === 'text' && s.textValue.trim()) parts.push(s.textValue.trim());
      if (s.result?.prompt && typeof s.result.prompt === 'string') parts.push(s.result.prompt);
    });
    return parts.join('\n\n');
  };

  const finalPrompt = buildFinalPrompt();

  const copyFinal = () => {
    navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setStages(stages.map((s: ChainStage) => ({ ...s, previewUrl: null, textValue: '', result: null, error: null })));
  };

  const renderStage = (stage: ChainStage) => {
    const isImage = stage.type === 'image';
    return (
      <div key={stage.id} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${isImage ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-500/20 text-purple-400'}`}>{stage.id}</span>
            {isImage ? <ImageIcon size={14} className="text-cyan-400" /> : <FileText size={14} className="text-purple-400" />}
            <span className="text-sm font-bold text-white">{isImage ? t('مرحلة الصورة', 'Image Stage') : t('مرحلة النص', 'Text Stage')}</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">{t('السلسلة المتعددة الوسائط', 'Multimodal Chain')}</span>
        </div>

        {isImage ? (
          stage.previewUrl ? (
            <div className="relative group">
              <img src={stage.previewUrl} alt="stage" className="w-full h-40 object-cover rounded-xl border border-slate-800" />
              <button
                onClick={() => { updateStage(stage.id, { previewUrl: null, result: null }); fileInputs.current[stage.id]?.click(); }}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 text-white text-[10px] hover:bg-rose-600 transition-colors"
              >{t('استبدال', 'Replace')}</button>
            </div>
          ) : (
            <button
              onClick={() => fileInputs.current[stage.id]?.click()}
              className="w-full h-28 border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-cyan-400 transition-all cursor-pointer"
            >
              <Upload size={20} />
              <span className="text-xs font-mono">{t('اضغط لرفع صورة للمرحلة', 'Click to upload image')}</span>
            </button>
          )
        ) : (
          <textarea
            value={stage.textValue}
            onChange={(e) => updateStage(stage.id, { textValue: e.target.value })}
            placeholder={t('اكتب النص أو البرومبت المحقون هنا...', 'Type the injected text or prompt here...')}
            className="w-full h-28 bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm font-mono text-white focus:outline-none focus:border-purple-500 resize-none"
          />
        )}

        <input
          ref={(el) => { fileInputs.current[stage.id] = el; }}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { if (e.target.files && e.target.files[0]) handleFile(stage.id, e.target.files[0]); }}
        />

        <div className="flex items-center gap-2">
          <button
            onClick={() => analyzeStage(stage.id)}
            disabled={stage.loading}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${stage.loading ? 'bg-slate-800 text-slate-500 cursor-wait' : isImage ? 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30' : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30'}`}
          >
            {stage.loading ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
            {stage.loading ? t('جارٍ التحليل...', 'Analyzing...') : t('تحليل المرحلة', 'Analyze Stage')}
          </button>
          {stage.result && (
            <button onClick={() => updateStage(stage.id, { result: null })} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-rose-400" title={t('مسح النتيجة', 'Clear result')}>
              <Trash2 size={14} />
            </button>
          )}
        </div>

        {stage.error && <p className="text-[11px] font-mono text-rose-400">⚠ {stage.error}</p>}

        {stage.result && (
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 space-y-1.5">
            <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1"><Sparkles size={11} /> {t('النتيجة المستخرجة', 'Extracted Result')}</div>
            {(() => {
              const r = stage.result;
              const fields: Array<[string, any]> = [];
              if (r.prompt) fields.push(['prompt', r.prompt]);
              if (r.midjourney && r.midjourney.prompt) fields.push(['midjourney', r.midjourney.prompt]);
              if (r.stableDiffusion && r.stableDiffusion.positive) fields.push(['stableDiffusion', r.stableDiffusion.positive]);
              if (r.dalle && r.dalle.prompt) fields.push(['dalle', r.dalle.prompt]);
              if (r.flux && r.flux.prompt) fields.push(['flux', r.flux.prompt]);
              if (!fields.length) fields.push(['json', JSON.stringify(r).slice(0, 300)]);
              return fields.map((pair) => (
                <div key={pair[0]} className="text-[11px] font-mono">
                  <span className="text-cyan-400">[{pair[0]}]</span>{' '}
                  <span className="text-slate-300">{typeof pair[1] === 'string' ? pair[1].slice(0, 220) : JSON.stringify(pair[1]).slice(0, 220)}</span>
                </div>
              ));
            })()}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-2"><Layers size={16} /><span className="text-[10px] font-mono tracking-widest">MULTIMODAL CHAIN INJECTOR</span></div>
            <h2 className="text-xl font-black text-white">{t('الحاقن المتسلسل متعدد الوسائط', 'Multimodal Chain Injector')}</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">{t('سلسلة حقن متكاملة: صورة ← نص ← صورة ← نص، مع استخراج البرومبت الحقيقي من الصور عبر Gemini وتحقيقه تلقائياً في المرحلة التالية.', 'Full injection chain: image → text → image → text, with real Gemini prompt extraction auto-injected into the next stage.')}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={runFullChain} disabled={running} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${running ? 'bg-slate-800 text-slate-500' : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20'}`}>
              {running ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
              {t('تشغيل السلسلة كاملة', 'Run Full Chain')}
            </button>
            <button onClick={clearAll} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400" title={t('مسح الكل', 'Clear all')}><Trash2 size={14} /></button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {stages.map((stage: ChainStage, idx: number) => (
          <React.Fragment key={stage.id}>
            {renderStage(stage)}
            {idx < stages.length - 1 && (
              <div className="hidden md:flex items-center justify-center text-slate-600 -my-2"><ArrowDown size={16} className="rotate-[-90deg]" /></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="rounded-3xl border border-purple-500/30 bg-slate-950 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-400"><Cpu size={15} /><span className="text-xs font-bold">{t('البرومبت النهائي المجمع من السلسلة', 'Final Chained Prompt')}</span></div>
          <button onClick={copyFinal} disabled={!finalPrompt} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[11px] font-bold hover:bg-purple-500/30 disabled:opacity-40 transition-all">
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? t('تم النسخ', 'Copied') : t('نسخ', 'Copy')}
          </button>
        </div>
        <textarea readOnly value={finalPrompt || t('— لا يوجد مخرجات بعد —', '— No output yet —')} className="w-full h-32 bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-mono text-purple-200 focus:outline-none resize-none" />
        <p className="text-[10px] font-mono text-slate-600 flex items-center gap-1"><ShieldAlert size={11} /> {t('التحليل عبر Gemini الحقيقي — كل مرحلة صورة تستدعي /api/ai/analyze-image', 'Real Gemini analysis — every image stage calls /api/ai/analyze-image')}</p>
      </div>
    </div>
  );
};
