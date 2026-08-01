import React, { useState } from 'react';
import { PromptItem } from '../types';
import { safeFetchJson } from '../lib/apiHelper';
import { TranslateAndRead } from './TranslateAndRead';
import { 
  X, 
  Copy, 
  Check, 
  Heart, 
  Star, 
  Play, 
  Flame, 
  Sliders, 
  Sparkles,
  Shield,
  FileCode,
  Tag,
  RefreshCw,
  Loader2
} from 'lucide-react';

interface PromptDetailModalProps {
  prompt: PromptItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onTestInPlayground: (promptText: string) => void;
  language: 'ar' | 'en';
}

export const PromptDetailModal: React.FC<PromptDetailModalProps> = ({
  prompt,
  onClose,
  isFavorite,
  onToggleFavorite,
  onTestInPlayground,
  language
}) => {
  if (!prompt) return null;

  const isAr = language === 'ar';
  const [copied, setCopied] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [userRatingSubmitted, setUserRatingSubmitted] = useState(false);
  const [promptLangMode, setPromptLangMode] = useState<'ar' | 'en' | 'original'>('ar');
  const [customRegeneratedPrompt, setCustomRegeneratedPrompt] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenSuccessMsg, setRegenSuccessMsg] = useState<string | null>(null);

  // Extract variables from prompt text (e.g. [VARIABLE_NAME])
  const extractVariables = (text: string): string[] => {
    const matches = text.match(/\[([A-Z0-9_]+)\]/g);
    if (!matches) return [];
    return Array.from(new Set(matches.map(m => m.slice(1, -1))));
  };

  const getActiveRawPrompt = (): string => {
    if (customRegeneratedPrompt) {
      return customRegeneratedPrompt;
    }
    if (promptLangMode === 'ar' && prompt.prompt_ar) {
      return prompt.prompt_ar;
    }
    return prompt.prompt;
  };

  const handleRegenerate = async () => {
    if (!prompt) return;
    setIsRegenerating(true);
    setRegenSuccessMsg(null);
    try {
      const res = await safeFetchJson<{ newPrompt?: string }>('/api/ai/regenerate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: prompt.title_ar || prompt.title,
          currentPrompt: getActiveRawPrompt(),
          language: 'ar',
          category: prompt.category_id,
        })
      });
      if (res.ok && res.data?.newPrompt) {
        setCustomRegeneratedPrompt(res.data.newPrompt);
        setRegenSuccessMsg(
          isAr 
            ? '✨ تم توليد صياغة عربية جديدة وبأسلوب علمي مبسط ومميز!' 
            : '✨ Generated a fresh high-quality prompt formulation!'
        );
      }
    } catch (err) {
      console.error('Failed to regenerate prompt:', err);
    } finally {
      setIsRegenerating(false);
    }
  };

  const rawPrompt = getActiveRawPrompt();
  const detectedVars = extractVariables(rawPrompt);
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});

  const handleVarChange = (varName: string, val: string) => {
    setVariableValues(prev => ({ ...prev, [varName]: val }));
  };

  // Replace variables in prompt
  const getPopulatedPrompt = (): string => {
    let result = rawPrompt;
    for (const [key, val] of Object.entries(variableValues)) {
      if (val) {
        const regex = new RegExp(`\\[${key}\\]`, 'g');
        result = result.replace(regex, String(val));
      }
    }
    return result;
  };

  const populated = getPopulatedPrompt();

  const handleCopy = () => {
    navigator.clipboard.writeText(populated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRate = (stars: number) => {
    setRating(stars);
    setUserRatingSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#0F1219] border border-[#2D3748] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between text-[#F8FAFC] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0F1219]/95 backdrop-blur border-b border-[#2D3748] p-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/30">
                {prompt.difficulty.toUpperCase()}
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-mono font-bold">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>Strength {prompt.strength}/5</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-[#F8FAFC]">
              {isAr && prompt.title_ar ? prompt.title_ar : prompt.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1A1F2B] hover:bg-[#2D3748] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Description */}
          {prompt.description && (
            <div className="bg-[#07090E] p-4 rounded-xl border border-[#2D3748] text-sm text-[#94A3B8] leading-relaxed">
              {prompt.description}
            </div>
          )}

          {/* Variables Filler Section */}
          {detectedVars.length > 0 && (
            <div className="bg-[#00D1FF]/5 border border-[#00D1FF]/20 p-4 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00D1FF]">
                <Sliders className="w-4 h-4" />
                <span>{isAr ? 'تخصيص متغيرات البرومبت:' : 'Customize Prompt Variables:'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detectedVars.map((v) => (
                  <div key={v} className="space-y-1">
                    <label className="text-[11px] font-mono text-[#94A3B8] block">
                      [{v}]
                    </label>
                    <input
                      type="text"
                      value={variableValues[v] || ''}
                      onChange={(e) => handleVarChange(v, e.target.value)}
                      placeholder={isAr ? `أدخل قيمة ${v}` : `Enter value for ${v}`}
                      className="w-full bg-[#07090E] border border-[#2D3748] focus:border-[#00D1FF] rounded-lg px-3 py-1.5 text-xs text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Prompt Regeneration Action Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#00D1FF]/10 rounded-2xl border border-[#00D1FF]/30">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-[#00D1FF] animate-pulse" />
              <div>
                <span className="text-xs font-mono font-bold text-[#00D1FF] block">
                  {isAr ? '🔄 خيار إعادة التوليد الفوري:' : '🔄 Instant Prompt Regeneration:'}
                </span>
                <span className="text-[11px] text-[#94A3B8] font-mono block">
                  {isAr ? 'هل تفضل صياغة عربية جديدة وبأسلوب علمي آخر؟' : 'Prefer a new Arabic scientific formulation?'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00D1FF] via-[#7000FF] to-cyan-500 hover:opacity-90 text-[#F8FAFC] font-extrabold text-xs transition-all shadow-md shadow-[#00D1FF]/20 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>
                {isRegenerating
                  ? (isAr ? 'جاري إعادة التوليد بأعلى دقة...' : 'Regenerating formulation...')
                  : (isAr ? 'أعد توليد البرومبت (صياغة عربية مميزة)' : 'Regenerate Arabic Prompt')}
              </span>
            </button>
          </div>

          {regenSuccessMsg && (
            <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs font-mono animate-fadeIn flex items-center justify-between gap-2">
              <span>{regenSuccessMsg}</span>
              {customRegeneratedPrompt && (
                <button 
                  onClick={() => setCustomRegeneratedPrompt(null)} 
                  className="text-[10px] text-[#94A3B8] hover:text-[#F8FAFC] underline font-sans cursor-pointer whitespace-nowrap"
                >
                  {isAr ? 'استعادة البرومبت الأصلي' : 'Restore original'}
                </button>
              )}
            </div>
          )}

          {/* Prompt Code View */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-[#00D1FF]" />
                {isAr ? 'نص البرومبت النهائي:' : 'Engineered Prompt Text:'}
              </span>

              {/* Prompt Language Mode Switcher */}
              <div className="flex items-center gap-1 p-1 bg-[#07090E] rounded-xl border border-[#2D3748] text-xs font-mono">
                <span className="text-[#94A3B8] px-2 text-[11px] hidden sm:inline">{isAr ? 'لغة البرومبت:' : 'Lang:'}</span>
                <button
                  onClick={() => setPromptLangMode('ar')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    promptLangMode === 'ar'
                      ? 'bg-[#00D1FF] text-[#07090E] font-bold shadow-sm'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  🇸🇦 العربية
                </button>
                <button
                  onClick={() => setPromptLangMode('en')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    promptLangMode === 'en'
                      ? 'bg-[#00D1FF] text-[#07090E] font-bold shadow-sm'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => setPromptLangMode('original')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    promptLangMode === 'original'
                      ? 'bg-[#00D1FF] text-[#07090E] font-bold shadow-sm'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  🌐 {isAr ? 'الأصلي' : 'Original'}
                </button>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1F2B] hover:bg-[#2D3748] text-xs font-medium text-[#F8FAFC] transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />}
                <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ البرومبت' : 'Copy Text')}</span>
              </button>
            </div>

            <div className="bg-[#07090E] p-4 rounded-2xl border border-[#2D3748] text-xs font-mono text-[#F8FAFC] whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto select-all">
              {populated}
            </div>

            <div className="pt-1">
              <TranslateAndRead text={populated} language={language} />
            </div>
          </div>

          {/* Rating Widget */}
          <div className="flex items-center justify-between p-4 bg-[#07090E] rounded-2xl border border-[#2D3748]">
            <span className="text-xs font-medium text-[#94A3B8]">
              {isAr ? 'تقييم كفاءة هذا البرومبت:' : 'Rate prompt effectiveness:'}
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRate(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star 
                    className={`w-5 h-5 ${
                      (rating && rating >= star) || (!rating && prompt.strength >= star)
                        ? 'text-amber-400 fill-amber-400' 
                        : 'text-[#2D3748]'
                    }`} 
                  />
                </button>
              ))}
            </div>
            {userRatingSubmitted && (
              <span className="text-xs text-[#10B981] font-mono animate-pulse">
                {isAr ? 'شكراً لتقييمك!' : 'Rating saved!'}
              </span>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-[#2D3748] bg-[#0F1219]/90 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onToggleFavorite(prompt.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
              isFavorite
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-[#1A1F2B] border-[#2D3748] text-[#F8FAFC] hover:bg-[#2D3748]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400' : ''}`} />
            <span>{isFavorite ? (isAr ? 'في المفضلة' : 'Saved in Favorites') : (isAr ? 'إضافة للمفضلة' : 'Add to Favorites')}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A1F2B] hover:bg-[#2D3748] text-[#F8FAFC] text-xs font-semibold transition-colors"
            >
              <Copy className="w-4 h-4 text-[#94A3B8]" />
              <span>{isAr ? 'نسخ النهائي' : 'Copy Final Prompt'}</span>
            </button>

            <button
              onClick={() => {
                onTestInPlayground(populated);
                onClose();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00D1FF] hover:bg-[#00D1FF]/90 text-[#07090E] font-extrabold text-xs shadow-lg shadow-[#00D1FF]/20 transition-all"
            >
              <Play className="w-4 h-4 fill-[#07090E]" />
              <span>{isAr ? 'تجربة في الحلبة الذكية' : 'Run in Thinking Playground'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
