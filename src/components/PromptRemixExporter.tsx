import React, { useState } from 'react';
import { RemixStyle } from '../types';
import { RefreshCw, Share2, Sparkles, Copy, Check, Layers, Sliders, Play, Wand2, ArrowRight, Download, FileJson } from 'lucide-react';

interface PromptRemixExporterProps {
  language: 'ar' | 'en';
  onTestInPlayground?: (prompt: string) => void;
}

export const PromptRemixExporter: React.FC<PromptRemixExporterProps> = ({ language, onTestInPlayground }) => {
  const isAr = language === 'ar';
  const [copied, setCopied] = useState(false);

  const [inputPrompt, setInputPrompt] = useState<string>(
    'اكتب مقالاً مفصلاً عن أهمية الذكاء الاصطناعي في التعليم وتطوير المهارات المستقبلية'
  );

  const [selectedStyle, setSelectedStyle] = useState<RemixStyle>('cinematic');
  const [remixedPrompt, setRemixedPrompt] = useState<string>('');
  const [isRemixing, setIsRemixing] = useState<boolean>(false);

  const remixStyles: { id: RemixStyle; label_ar: string; label_en: string; icon: string; desc_ar: string }[] = [
    { id: 'cinematic', label_ar: '🎬 أسلوب سينمائي فاخر', label_en: 'Cinematic Style', icon: '🎬', desc_ar: 'تصوير بصري ودرامي عالي الدقة' },
    { id: 'viral', label_ar: '🚀 انتشاري للسوشيال ميديا', label_en: 'Viral Social Media', icon: '🚀', desc_ar: 'خطاف قوي وتفاعل عالي على TikTok وReels' },
    { id: 'professional', label_ar: '💼 تنفيذي ومهني', label_en: 'Executive Professional', icon: '💼', desc_ar: 'أسلوب إداري ورصين عالي الجودة' },
    { id: 'technical', label_ar: '⚙️ تقني ودقيق', label_en: 'Technical Specification', icon: '⚙️', desc_ar: 'هيكلية برمجة ومعايير هندسية صارمة' },
    { id: 'luxury', label_ar: '💎 فاخر ومصمم ماركات', label_en: 'Luxury Brand Style', icon: '💎', desc_ar: 'هوية بصريّة راقية لماركات عالمية' },
    { id: 'minimal', label_ar: '🍃 بسيط ومباشر', label_en: 'Minimal Direct', icon: '🍃', desc_ar: 'تركيز على الجوهر دون إطالة' },
    { id: 'creative', label_ar: '🎨 إبداعي وابتكاري', label_en: 'Creative & Imaginative', icon: '🎨', desc_ar: 'أفكار خارج الصندوق وتأمل عميق' },
    { id: 'experimental', label_ar: '🧪 تجريبي متقدم', label_en: 'Experimental Mode', icon: '🧪', desc_ar: 'تأطير متقدم غير تقليدي' }
  ];

  const handleRemixPrompt = () => {
    if (!inputPrompt.trim()) return;
    setIsRemixing(true);

    setTimeout(() => {
      let result = '';
      if (selectedStyle === 'cinematic') {
        result = `[🎬 CINEMATIC REMIX - HIGH DRAMATIC VISUALS]
PROMPT CONCEPT: ${inputPrompt}

[CINEMATIC DIRECTIVE]
Reframe the subject with 35mm lens camera movement, volumetric moody lighting, and deep storytelling narrative. Focus on atmospheric resonance, rich metaphors, and emotional depth. Ensure flawless structure and dramatic tension.`;
      } else if (selectedStyle === 'viral') {
        result = `[🚀 VIRAL SOCIAL MEDIA REMIX - HIGH ENGAGEMENT HOOK]
CORE CONTENT: ${inputPrompt}

[HOOK & VIRAL STRUCTURE]
1. HOOK (0-3s): "This 1 single secret will change everything about ${inputPrompt}!"
2. DYNAMIC POINTS: Fast bulleted breakdowns with active verbs.
3. CALL TO ACTION: "Comment 'SCALE' to get the full blueprint instantly!"`;
      } else if (selectedStyle === 'technical') {
        result = `<system_prompt>
You are a Principal Software Architect and Technical Specifier.
</system_prompt>

<task>
Execute a rigorous technical implementation of: ${inputPrompt}
</task>

<constraints>
- Include strict type definitions, clean modular architecture, and zero placeholder comments.
- Adhere to PEP 8 / TypeScript standard conventions.
</constraints>`;
      } else {
        result = `[${selectedStyle.toUpperCase()} REMIX STYLE]
CONCEPT: ${inputPrompt}

[STYLE INSTRUCTIONS]
Transform the concept into a ${selectedStyle} aesthetic. Emphasize clarity, high impact wording, and pristine formatting tailored for maximum response accuracy.`;
      }

      setRemixedPrompt(result);
      setIsRemixing(false);
    }, 400);
  };

  const copyToClipboard = () => {
    if (!remixedPrompt) return;
    navigator.clipboard.writeText(remixedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportToJson = () => {
    if (!remixedPrompt) return;
    const payload = {
      original_prompt: inputPrompt,
      remix_style: selectedStyle,
      remixed_prompt: remixedPrompt,
      created_at: new Date().toISOString()
    };
    const jsonString = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `engineered-prompt-${selectedStyle}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-[#7000FF]/20 to-[#00D1FF]/10 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7000FF]/20 border border-[#7000FF]/40 text-[#00D1FF] text-xs font-mono font-bold">
              <Share2 className="w-4 h-4 text-[#00D1FF]" />
              <span>{isAr ? 'محرك تحويل وإعادة صياغة البرومبتات v3.0' : 'Prompt Remix & Export Engine'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
              🔄 {isAr ? 'محرك تحويل وتصاميم أساليب البرومبت (Remix & Export)' : 'Prompt Remixing & Multi-Platform Exporter'}
            </h1>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {isAr
                ? 'إعادة صياغة أي برومبت وتحويله بين 8 أساليب إبداعية مختلفة (سينمائي، انتشاري، تنفيذي، تقني) مع التصدير المباشر لكافة المنصات.'
                : 'Remix any prompt into 8 distinct stylistic flavors (Cinematic, Viral, Technical, Luxury) and export across models.'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Input & Style Selector */}
        <div className="lg:col-span-6 space-y-4 bg-[#0F1219] border border-[#2D3748] rounded-3xl p-6 shadow-xl">
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-[#00D1FF] flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-[#00D1FF]" />
              <span>{isAr ? 'أدخل النص أو البرومبت المُراد تحويله:' : 'Input Prompt to Remix:'}</span>
            </label>

            <textarea
              rows={4}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={isAr ? 'أدخل أي فكرة أو برومبت تحبه...' : 'Enter prompt or idea to remix...'}
              className="w-full bg-[#07090E] border border-[#2D3748] focus:border-[#00D1FF] rounded-2xl p-3.5 text-xs font-mono text-[#F8FAFC] focus:outline-none"
            />
          </div>

          {/* Style Selector Grid */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-[#00D1FF] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#00D1FF]" />
              <span>{isAr ? 'اختر أسلوب التحويل المطلوب (Remix Style):' : 'Select Remix Style:'}</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              {remixStyles.map((st) => {
                const isSelected = selectedStyle === st.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStyle(st.id)}
                    className={`p-3 rounded-2xl border text-right sm:text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#7000FF]/25 border-[#00D1FF] text-[#F8FAFC] font-bold shadow-md'
                        : 'bg-[#07090E] border-[#2D3748] text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <span className="text-xs font-mono block text-[#F8FAFC]">{st.icon} {isAr ? st.label_ar : st.label_en}</span>
                    <span className="text-[10px] text-[#94A3B8] font-mono block truncate mt-0.5">{st.desc_ar}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemixPrompt}
            disabled={isRemixing || !inputPrompt.trim()}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00D1FF] to-[#7000FF] hover:opacity-90 text-[#F8FAFC] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#00D1FF]/20 cursor-pointer disabled:opacity-50 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#F8FAFC]" />
            <span>{isRemixing ? (isAr ? 'جاري التحويل وتغيير الأسلوب...' : 'Remixing Prompt...') : (isAr ? 'إعادة صياغة البرومبت بالأسلوب الجديد' : 'Remix Prompt Now')}</span>
          </button>
        </div>

        {/* Right Remixed Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-6 space-y-4 shadow-xl min-h-[420px] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[#2D3748] pb-3">
              <span className="text-xs font-mono font-bold text-[#F8FAFC] flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#00D1FF]" />
                <span>{isAr ? 'البرومبت المُعاد صياغته بالأسلوب الجديد:' : 'Remixed Prompt Result:'}</span>
              </span>

              {remixedPrompt && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="px-3 py-1 rounded-xl bg-[#00D1FF]/10 hover:bg-[#00D1FF]/20 text-[#00D1FF] text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-[#00D1FF]/30"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ البرومبت' : 'Copy')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={exportToJson}
                    className="px-3 py-1 rounded-xl bg-[#00D1FF]/10 hover:bg-[#00D1FF]/20 text-[#00D1FF] text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-[#00D1FF]/30"
                    title={isAr ? 'تحميل البرومبت بصيغة JSON' : 'Export prompt to JSON'}
                  >
                    <FileJson className="w-3.5 h-3.5 text-[#00D1FF]" />
                    <span>{isAr ? 'تصدير JSON' : 'Export JSON'}</span>
                  </button>

                  {onTestInPlayground && (
                    <button
                      type="button"
                      onClick={() => onTestInPlayground(remixedPrompt)}
                      className="px-3 py-1 rounded-xl bg-[#7000FF]/20 hover:bg-[#7000FF]/30 text-[#F8FAFC] text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-[#7000FF]/40"
                    >
                      <Play className="w-3.5 h-3.5 text-[#00D1FF]" />
                      <span>{isAr ? 'تجربة' : 'Test'}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {remixedPrompt ? (
              <textarea
                readOnly
                rows={12}
                value={remixedPrompt}
                className="w-full bg-[#07090E] border border-[#2D3748] rounded-2xl p-4 text-xs font-mono text-[#E2E8F0] leading-relaxed resize-none focus:outline-none"
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center space-y-3">
                <RefreshCw className="w-12 h-12 text-[#2D3748]" />
                <p className="text-xs font-mono text-[#94A3B8]">
                  {isAr ? 'اختر الأسلوب واضغط تحويل لمشاهدة البرومبت المصاغ مجدداً.' : 'Choose a style and click remix to generate.'}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
