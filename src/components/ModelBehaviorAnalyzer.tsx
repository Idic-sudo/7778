import React, { useState } from 'react';
import { MODEL_INTELLIGENCE_PROFILES, VIDEO_PLATFORMS_REGISTRY } from '../data/modelIntelligenceData';
import { ModelIntelligenceProfile } from '../types';
import { TranslateAndRead } from './TranslateAndRead';
import { 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Zap, 
  Code, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  ExternalLink, 
  RefreshCw,
  Copy,
  Terminal,
  Settings,
  Sliders,
  Check
} from 'lucide-react';

interface ModelBehaviorAnalyzerProps {
  language: 'ar' | 'en';
  onTestInPlayground?: (promptText: string) => void;
  onCraftWithModelStructure?: (modelId: string, structureText: string) => void;
}

export const ModelBehaviorAnalyzer: React.FC<ModelBehaviorAnalyzerProps> = ({ 
  language, 
  onTestInPlayground,
  onCraftWithModelStructure
}) => {
  const isAr = language === 'ar';
  const [selectedModelId, setSelectedModelId] = useState<string>('chatgpt-4o-mini');
  const [activeTab, setActiveTab] = useState<'text' | 'video' | 'matcher' | 'multi_compare'>('text');
  const [searchFilter, setSearchFilter] = useState('');

  // Multi-Model Compare state
  const [compareGoal, setCompareGoal] = useState('');
  const [compareSelectedModels, setCompareSelectedModels] = useState<string[]>([
    'claude-3.7-sonnet',
    'chatgpt-4o-mini',
    'gemini-3.5-pro',
    'deepseek-r1'
  ]);
  const [compareLoading, setCompareLoading] = useState(false);
  const [compareResult, setCompareResult] = useState<any | null>(null);
  const [copiedCompareIndex, setCopiedCompareIndex] = useState<number | null>(null);
  const [copiedFusion, setCopiedFusion] = useState(false);

  // Matcher state variables
  const [taskDescription, setTaskDescription] = useState('');
  const [prefSpeed, setPrefSpeed] = useState(3);
  const [prefCoding, setPrefCoding] = useState(3);
  const [prefReasoning, setPrefReasoning] = useState(3);
  const [multimodalNeeded, setMultimodalNeeded] = useState(false);
  const [largeContextNeeded, setLargeContextNeeded] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);

  const [matcherLoading, setMatcherLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [matcherError, setMatcherError] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState<any | null>(null);
  
  const [copiedPrimary, setCopiedPrimary] = useState(false);
  const [copiedSecondary, setCopiedSecondary] = useState(false);

  const handleMatchModel = async () => {
    if (!taskDescription.trim()) return;
    setMatcherLoading(true);
    setMatcherError(null);
    setMatchResult(null);
    setLoadingStep(0);

    const stepsTimer = setInterval(() => {
      setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 850);

    try {
      const response = await fetch('/api/ai/match-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskDescription,
          preferences: {
            speed: prefSpeed,
            codeQuality: prefCoding,
            reasoning: prefReasoning,
            multimodal: multimodalNeeded,
            contextWindow: largeContextNeeded,
            freeOnly
          }
        })
      });

      if (!response.ok) {
        throw new Error('Network error matching model');
      }

      const data = await response.json();
      setMatchResult(data);
    } catch (err: any) {
      setMatcherError(isAr ? 'حدث خطأ أثناء الاتصال بخدمة مطابقة النماذج.' : 'Failed to connect to the model matchmaking service.');
    } finally {
      clearInterval(stepsTimer);
      setMatcherLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: 'primary' | 'secondary') => {
    navigator.clipboard.writeText(text);
    if (type === 'primary') {
      setCopiedPrimary(true);
      setTimeout(() => setCopiedPrimary(false), 2000);
    } else {
      setCopiedSecondary(true);
      setTimeout(() => setCopiedSecondary(false), 2000);
    }
  };

  const currentProfile = MODEL_INTELLIGENCE_PROFILES.find((p) => p.id === selectedModelId) || MODEL_INTELLIGENCE_PROFILES[1];

  const filteredModels = MODEL_INTELLIGENCE_PROFILES.filter(
    (m) =>
      m.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.provider.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.freeTierStatus_ar.includes(searchFilter)
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-br from-[#7000FF]/20 to-[#00D1FF]/10 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7000FF]/20 border border-[#7000FF]/40 text-[#00D1FF] text-xs font-mono font-bold">
              <Cpu className="w-4 h-4 text-[#00D1FF]" />
              <span>{isAr ? 'طبقة ذكاء النماذج v3.5' : 'Model Intelligence Layer v3.5'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
              {isAr ? '🔬 محقق سلوك ودليل التعامل مع النماذج' : '🔬 Model Behavior Analyzer & Intelligence Guide'}
            </h1>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {isAr
                ? 'فهم دقيق لكيفية تفكير ونوا نقاط القوة والضعف لكل نموذج ذكاء اصطناعي (أكثر من 18 نموذجاً)، مع أساليب الصياغة ومطابقة السلاسل تلقائياً.'
                : 'Deep analysis of how each AI model reasons, its strengths, limitations, and exact prompt structures for max precision.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-[#07090E] p-1.5 rounded-2xl border border-[#2D3748]">
            <button
              onClick={() => setActiveTab('text')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'text'
                  ? 'bg-gradient-to-r from-[#00D1FF] to-[#7000FF] text-[#F8FAFC] shadow-md'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              🧠 {isAr ? `نماذج النص (${MODEL_INTELLIGENCE_PROFILES.length})` : `Text Models (${MODEL_INTELLIGENCE_PROFILES.length})`}
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'video'
                  ? 'bg-gradient-to-r from-[#00D1FF] to-[#7000FF] text-[#F8FAFC] shadow-md'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              🎬 {isAr ? 'الفيديو (8)' : 'Video (8)'}
            </button>
            <button
              onClick={() => setActiveTab('matcher')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'matcher'
                  ? 'bg-gradient-to-r from-[#00D1FF] to-[#7000FF] text-[#F8FAFC] shadow-md'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              🤖 {isAr ? 'المطابق الذكي' : 'Smart Matcher'}
            </button>
            <button
              onClick={() => setActiveTab('multi_compare')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'multi_compare'
                  ? 'bg-gradient-to-r from-[#00D1FF] to-[#7000FF] text-[#F8FAFC] shadow-md'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              ⚡ {isAr ? 'مقارنة وتكيف النماذج المتعددة' : 'Multi-Model Adaptive Optimizer'}
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'text' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Left Column: Model Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="relative">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder={isAr ? 'تصفية النماذج...' : 'Search models...'}
                className="w-full bg-[#0F1219] border border-[#2D3748] rounded-2xl px-4 py-2.5 text-xs text-[#F8FAFC] placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#00D1FF]"
              />
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 no-scrollbar">
              {filteredModels.map((m) => {
                const isSelected = selectedModelId === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModelId(m.id)}
                    className={`w-full p-3.5 rounded-2xl border text-right sm:text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#7000FF]/20 border-[#00D1FF] text-[#F8FAFC] ring-1 ring-[#00D1FF]/50 shadow-lg'
                        : 'bg-[#0F1219]/90 border-[#2D3748] text-[#94A3B8] hover:bg-[#1A1F2B] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl shrink-0">{m.icon}</span>
                      <div className="min-w-0">
                        <span className="text-xs font-mono font-bold block text-[#F8FAFC] truncate">
                          {m.name}
                        </span>
                        <span className="text-[10px] text-[#94A3B8] font-mono block">
                          {m.provider} • {m.contextWindow}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/30 shrink-0">
                      {isAr ? m.freeTierStatus_ar : m.freeTierStatus}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Profile Analysis */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-6 space-y-6 shadow-xl">
              
              {/* Profile Title Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#2D3748]">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{currentProfile.icon}</span>
                  <div>
                    <h2 className="text-xl font-extrabold text-[#F8FAFC] flex items-center gap-2">
                      <span>{currentProfile.name}</span>
                      <span className="text-xs font-mono font-normal text-[#00D1FF] px-2.5 py-0.5 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/30">
                        {currentProfile.provider}
                      </span>
                    </h2>
                    <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
                      {isAr ? 'أسلوب التوجيه الموصى به:' : 'Recommended Prompting Style:'} <span className="text-[#00D1FF] font-bold">{isAr ? currentProfile.promptStyle_ar : currentProfile.promptStyle}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {isAr ? currentProfile.freeTierStatus_ar : currentProfile.freeTierStatus}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono text-[#94A3B8] bg-[#1A1F2B] border border-[#2D3748]">
                    {currentProfile.contextWindow}
                  </span>
                  <button
                    onClick={() => {
                      const examplePrompt = `Role: High-level System Specialist\nTarget Model: ${currentProfile.name}\nTask: Execute prompt evaluation adhering strictly to ${currentProfile.promptStyle}.\nRequirement: Exhaustive analysis with maximum precision.`;
                      if (onTestInPlayground) {
                        onTestInPlayground(examplePrompt);
                      }
                    }}
                    className="px-4 py-1.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-[#00D1FF] to-[#7000FF] hover:opacity-90 text-[#07090E] transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 fill-[#07090E]" />
                    <span>{isAr ? 'اختبار مصفوفة البرومبت' : 'Test Model Prompt'}</span>
                  </button>
                </div>
              </div>

              {/* Best Results Action Box ("كيف تحصل على أفضل نتيجة من هذا النموذج؟") */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#00D1FF]/10 via-[#7000FF]/15 to-purple-900/10 border border-[#00D1FF]/40 space-y-2">
                <div className="flex items-center gap-2 text-[#00D1FF] font-mono font-bold text-xs">
                  <Lightbulb className="w-4 h-4 text-[#00D1FF]" />
                  <span>{isAr ? 'كيف تحصل على أفضل نتيجة من هذا النموذج؟' : 'How to Get the Absolute Best Results?'}</span>
                </div>
                <p className="text-xs text-[#E2E8F0] leading-relaxed font-mono">
                  {isAr ? currentProfile.guide_ar : currentProfile.guide_en}
                </p>
                <div className="pt-1.5 flex justify-end">
                  <TranslateAndRead text={currentProfile.guide_en} language={language} />
                </div>
              </div>

              {/* Performance Capability Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-[#07090E] border border-[#2D3748] rounded-2xl text-center space-y-1">
                  <span className="text-[10px] text-[#94A3B8] font-mono block">{isAr ? 'القدرة البرمجية' : 'Coding Metric'}</span>
                  <div className="flex items-center justify-center gap-1 text-[#00D1FF] font-bold text-sm">
                    <Code className="w-4 h-4" />
                    <span>{currentProfile.codingCapability} / 10</span>
                  </div>
                </div>

                <div className="p-3.5 bg-[#07090E] border border-[#2D3748] rounded-2xl text-center space-y-1">
                  <span className="text-[10px] text-[#94A3B8] font-mono block">{isAr ? 'الاستدلال والتفكير' : 'Reasoning Metric'}</span>
                  <div className="flex items-center justify-center gap-1 text-[#7000FF] font-bold text-sm">
                    <Zap className="w-4 h-4" />
                    <span>{currentProfile.reasoningCapability} / 10</span>
                  </div>
                </div>

                <div className="p-3.5 bg-[#07090E] border border-[#2D3748] rounded-2xl text-center space-y-1">
                  <span className="text-[10px] text-[#94A3B8] font-mono block">{isAr ? 'دعم أوسام XML' : 'XML Support'}</span>
                  <span className={`text-xs font-bold font-mono ${currentProfile.xmlSupport ? 'text-emerald-400' : 'text-zinc-500'}`}>
                    {currentProfile.xmlSupport ? (isAr ? 'مدعوم 100%' : 'Supported') : (isAr ? 'غير أساسي' : 'Basic')}
                  </span>
                </div>

                <div className="p-3.5 bg-[#07090E] border border-[#2D3748] rounded-2xl text-center space-y-1">
                  <span className="text-[10px] text-[#94A3B8] font-mono block">{isAr ? 'دعم الأمثلة Few-Shot' : 'Few-Shot Support'}</span>
                  <span className="text-xs font-bold font-mono text-emerald-400">
                    {isAr ? 'ممتاز جداً' : 'High Priority'}
                  </span>
                </div>
              </div>

              {/* Strengths & Weaknesses Split Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strengths */}
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                  <h3 className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isAr ? 'نقاط القوة والاستجابة المثالية' : 'Strengths & Best Performance'}</span>
                  </h3>
                  <ul className="space-y-1.5 text-xs text-[#E2E8F0] font-mono">
                    {(isAr ? currentProfile.strengths_ar : currentProfile.strengths).map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 text-sm">✓</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses / Things to avoid */}
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                  <h3 className="text-xs font-mono font-bold text-amber-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{isAr ? 'نقاط الضعف وما يجب تجنبه' : 'Limitations & Things to Avoid'}</span>
                  </h3>
                  <ul className="space-y-1.5 text-xs text-[#E2E8F0] font-mono">
                    {(isAr ? currentProfile.weaknesses_ar : currentProfile.weaknesses).map((w, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 text-sm">⚠</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Best Use Cases */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold text-[#00D1FF] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00D1FF]" />
                  <span>{isAr ? 'أفضل الاستخدامات والمهام التفوقية:' : 'Ideal Use Cases:'}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(isAr ? currentProfile.bestUseCases_ar : currentProfile.bestUseCases).map((uc, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-[#1A1F2B] border border-[#2D3748] text-xs font-mono text-[#F8FAFC]">
                      {uc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Prompt Architecture Scheme */}
              <div className="p-4 rounded-2xl bg-[#07090E] border border-[#2D3748] space-y-4">
                <h3 className="text-xs font-mono font-bold text-[#00D1FF] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#00D1FF]" />
                  <span>{isAr ? 'الهيكلية المثالية لصياغة البرومبت لهذا النموذج:' : 'Recommended Prompt Structure:'}</span>
                </h3>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#F8FAFC]">
                  {(isAr ? currentProfile.recommendedPromptStructure_ar : currentProfile.recommendedPromptStructure).map((st, i) => (
                    <React.Fragment key={i}>
                      <span className="px-2.5 py-1 rounded-lg bg-[#7000FF]/20 border border-[#7000FF]/40 text-[#00D1FF]">
                        {st}
                      </span>
                      {i < currentProfile.recommendedPromptStructure.length - 1 && (
                        <span className="text-[#94A3B8]">➔</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {onCraftWithModelStructure && (
                  <div className="pt-2 border-t border-[#2D3748]/50 flex justify-end">
                    <button
                      onClick={() => {
                        const structureText = (isAr ? currentProfile.recommendedPromptStructure_ar : currentProfile.recommendedPromptStructure).join(' ➔ ');
                        onCraftWithModelStructure(currentProfile.id, structureText);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-[#7000FF] to-[#00D1FF] hover:from-[#8010FF] hover:to-[#10E1FF] active:scale-[0.98] text-white font-mono font-bold text-[11px] rounded-xl flex items-center gap-1.5 shadow-lg shadow-[#7000FF]/10 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      <span>
                        {isAr 
                          ? `صناعة برومبت تلقائي بـ ${currentProfile.name} وفق هذا الهيكل` 
                          : `Generate Prompt for ${currentProfile.name} using this structure`}
                      </span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {activeTab === 'video' && (
        /* Video AI Platforms Behavior List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn">
          {VIDEO_PLATFORMS_REGISTRY.map((vp) => (
            <div key={vp.id} className="p-5 bg-[#0F1219] border border-[#2D3748] rounded-3xl space-y-4 hover:border-[#00D1FF]/40 transition-all">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#2D3748]">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{vp.icon}</span>
                  <div>
                    <h3 className="text-base font-extrabold text-[#F8FAFC]">{vp.name}</h3>
                    <span className="text-[10px] text-[#94A3B8] font-mono">{vp.provider} • Max {vp.maxDuration}</span>
                  </div>
                </div>

                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${vp.badgeColor}`}>
                  {isAr ? vp.statusLabel_ar : vp.statusLabel_en}
                </span>
              </div>

              <p className="text-xs text-[#94A3B8] font-mono leading-relaxed">
                {isAr ? vp.description_ar : vp.description_en}
              </p>

              <div className="p-3 rounded-2xl bg-[#07090E] border border-[#2D3748] space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#00D1FF] block">
                  {isAr ? '🎁 التفاصيل المجانية:' : '🎁 Free Tier Details:'}
                </span>
                <p className="text-xs text-[#F8FAFC] font-mono">
                  {isAr ? vp.freeTierDetails_ar : vp.freeTierDetails_en}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#94A3B8] block">{isAr ? 'أفضل الاستخدامات:' : 'Best for:'}</span>
                <div className="flex flex-wrap gap-1.5">
                  {(isAr ? vp.bestFor_ar : vp.bestFor).map((bf, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[#1A1F2B] border border-[#2D3748] text-[#E2E8F0]">
                      {bf}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'matcher' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Matcher input & parameters */}
          <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-[#2D3748] pb-4">
              <Sparkles className="w-6 h-6 text-[#00D1FF]" />
              <div>
                <h2 className="text-lg font-bold text-[#F8FAFC]">
                  {isAr ? '🎯 نظام المطابقة وملاءمة النماذج التلقائي' : '🎯 Automatic Model Matcher & Chain Generator'}
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  {isAr 
                    ? 'أدخل تفاصيل مهمتك وسيقوم الذكاء الاصطناعي بمقارنة 18 نموذجاً لاختيار الشريكين الأمثل وتوليد التعليمات المناسبة لبنيتهما الهيكلية.'
                    : 'Describe your objective and preferences. The system matches model benchmarks to provide a dual-cooperative stack with custom prompts.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Description Input */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#94A3B8] block">
                    {isAr ? '💬 صف مهمتك أو فكرتك بالتفصيل:' : '💬 Describe your target task or system goal:'}
                  </label>
                  <textarea
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder={isAr ? 'مثال: أريد تطوير نظام يحلل المستندات الطبية الضخمة ويترجم المصطلحات مع جودة تفكير عالية للتحقق من التناقضات...' : 'e.g. I want to build a medical data pipeline that analyzes huge documents and checks for contradictory logical statements...'}
                    rows={6}
                    className="w-full bg-[#07090E] border border-[#2D3748] rounded-2xl p-4 text-xs text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF]/30 resize-none font-sans leading-relaxed"
                  />
                </div>

                {/* Requirements checkmarks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setMultimodalNeeded(!multimodalNeeded)}
                    className={`p-3 rounded-xl border text-right sm:text-center text-xs font-mono transition-all flex items-center justify-between sm:justify-center gap-2 cursor-pointer ${
                      multimodalNeeded 
                        ? 'bg-[#00D1FF]/10 border-[#00D1FF] text-[#00D1FF]' 
                        : 'bg-[#07090E] border-[#2D3748] text-[#94A3B8] hover:border-[#1A1F2B]'
                    }`}
                  >
                    <span>🖼 {isAr ? 'تحليل صور / ملفات' : 'Multimodal/Files'}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {multimodalNeeded ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  <button
                    onClick={() => setLargeContextNeeded(!largeContextNeeded)}
                    className={`p-3 rounded-xl border text-right sm:text-center text-xs font-mono transition-all flex items-center justify-between sm:justify-center gap-2 cursor-pointer ${
                      largeContextNeeded 
                        ? 'bg-[#7000FF]/10 border-[#7000FF] text-[#7000FF]' 
                        : 'bg-[#07090E] border-[#2D3748] text-[#94A3B8] hover:border-[#1A1F2B]'
                    }`}
                  >
                    <span>📚 {isAr ? 'سياق ضخم جداً' : 'Huge Context'}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {largeContextNeeded ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  <button
                    onClick={() => setFreeOnly(!freeOnly)}
                    className={`p-3 rounded-xl border text-right sm:text-center text-xs font-mono transition-all flex items-center justify-between sm:justify-center gap-2 cursor-pointer ${
                      freeOnly 
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                        : 'bg-[#07090E] border-[#2D3748] text-[#94A3B8] hover:border-[#1A1F2B]'
                    }`}
                  >
                    <span>🎁 {isAr ? 'نماذج مجانية بالكامل' : '100% Free Only'}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {freeOnly ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Column: Preferences Sliders */}
              <div className="lg:col-span-5 bg-[#07090E] p-5 rounded-2xl border border-[#2D3748] flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold text-[#F8FAFC] flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#00D1FF]" />
                    <span>{isAr ? 'تخصيص مؤشرات الأولوية:' : 'Preference Indicators:'}</span>
                  </h3>

                  {/* Speed slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#94A3B8]">{isAr ? 'الاستجابة والسرعة:' : 'Response Speed:'}</span>
                      <span className="text-[#00D1FF] font-bold">{prefSpeed} / 5</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={prefSpeed}
                      onChange={(e) => setPrefSpeed(parseInt(e.target.value, 10))}
                      className="w-full accent-[#00D1FF] h-1 bg-[#1A1F2B] rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Coding quality slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#94A3B8]">{isAr ? 'جودة كتابة الكود والتصميم:' : 'Coding Precision:'}</span>
                      <span className="text-[#00D1FF] font-bold">{prefCoding} / 5</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={prefCoding}
                      onChange={(e) => setPrefCoding(parseInt(e.target.value, 10))}
                      className="w-full accent-[#00D1FF] h-1 bg-[#1A1F2B] rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Reasoning capability slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#94A3B8]">{isAr ? 'الاستدلال وحل المسائل الصعبة:' : 'Reasoning & Logic:'}</span>
                      <span className="text-[#7000FF] font-bold">{prefReasoning} / 5</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={prefReasoning}
                      onChange={(e) => setPrefReasoning(parseInt(e.target.value, 10))}
                      className="w-full accent-[#7000FF] h-1 bg-[#1A1F2B] rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  disabled={!taskDescription.trim() || matcherLoading}
                  onClick={handleMatchModel}
                  className="w-full py-3.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-[#00D1FF] to-[#7000FF] hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-[#07090E] transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  {matcherLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#07090E]" />
                      <span>
                        {loadingStep === 0 && (isAr ? 'تحليل أبعاد المهمة...' : 'Analyzing specs...')}
                        {loadingStep === 1 && (isAr ? 'مطابقة ذكاء الـ 18 نموذجاً...' : 'Matching 18 benchmarks...')}
                        {loadingStep === 2 && (isAr ? 'توليد الهياكل القياسية...' : 'Structuring custom prompts...')}
                        {loadingStep >= 3 && (isAr ? 'ضبط السلاسل المتطابقة...' : 'Finalizing profiles...')}
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#07090E]" />
                      <span>{isAr ? 'أطلق التوليد والمطابقة الذكية' : 'Execute Intelligent Stack Match'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Loader Placeholder */}
          {matcherLoading && (
            <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-12 text-center space-y-4 animate-pulse">
              <Cpu className="w-12 h-12 text-[#00D1FF] mx-auto animate-spin" />
              <p className="text-sm text-[#F8FAFC] font-mono">
                {isAr ? 'جاري الفحص البرامجي وحساب معاملات المطابقة الدقيقة...' : 'Calculating intelligence constraints and matching benchmarks...'}
              </p>
            </div>
          )}

          {/* Error Message */}
          {matcherError && (
            <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30 text-red-400 text-xs font-mono text-center">
              ⚠ {matcherError}
            </div>
          )}

          {/* Matcher result output */}
          {matchResult && !matcherLoading && (
            <div className="space-y-6 animate-fadeIn">
              {/* Main Banner Header */}
              <div className="p-4 rounded-2xl bg-[#0F1219] border border-emerald-500/30 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-mono text-[#F8FAFC]">
                  {isAr 
                    ? `تم تحليل مصفوفة الـ 18 نموذجاً بنجاح! النتيجة: ترشيح ${matchResult.primaryModel.name} شريكاً أساسياً مع ${matchResult.secondaryModel.name} كدعم بديل احتياطي.`
                    : `Analysis complete! Recommended stack: ${matchResult.primaryModel.name} (Primary) paired with ${matchResult.secondaryModel.name} (Fallback).`}
                </span>
              </div>

              {/* Two recommendation cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Primary Card */}
                <div className="bg-[#0F1219] border-2 border-[#00D1FF]/40 rounded-3xl p-6 space-y-4 relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-[#00D1FF] text-[#07090E] font-mono text-[9px] font-extrabold rounded-bl-xl uppercase tracking-wider">
                    {isAr ? 'النموذج الموصى به الأساسي' : 'Primary Recommended'}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-4xl">👑</span>
                    <div>
                      <h3 className="text-base font-extrabold text-[#F8FAFC]">{matchResult.primaryModel.name}</h3>
                      <span className="text-xs font-mono text-[#00D1FF]">{matchResult.primaryModel.provider}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#07090E] border border-[#2D3748] rounded-2xl space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold block">{isAr ? '🎯 لماذا تم اختياره للمهمة؟' : '🎯 Matching Reason:'}</span>
                    <p className="text-xs text-[#E2E8F0] leading-relaxed">
                      {isAr ? matchResult.primaryModel.reason_ar : matchResult.primaryModel.reason_en}
                    </p>
                  </div>

                  {/* Custom Prompt Template Box */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>{isAr ? 'التعليمات الهيكلية المهندسة التلقائية:' : 'Optimized Engineered Prompt:'}</span>
                      </span>
                      <button
                        onClick={() => copyToClipboard(matchResult.primaryModel.engineeredPrompt, 'primary')}
                        className="p-1.5 rounded-lg bg-[#07090E] border border-[#2D3748] text-[#94A3B8] hover:text-[#00D1FF] transition-all cursor-pointer flex items-center gap-1"
                        title={isAr ? 'نسخ البرومبت' : 'Copy prompt'}
                      >
                        {copiedPrimary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-[10px] font-mono">{copiedPrimary ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}</span>
                      </button>
                    </div>

                    <div className="p-3 bg-[#07090E] rounded-xl border border-[#2D3748] text-xs font-mono text-[#E2E8F0] overflow-x-auto max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed text-left">
                      {matchResult.primaryModel.engineeredPrompt}
                    </div>

                    <div className="py-1">
                      <TranslateAndRead text={matchResult.primaryModel.engineeredPrompt} language={language} />
                    </div>

                    <button
                      onClick={() => {
                        if (onTestInPlayground) {
                          onTestInPlayground(matchResult.primaryModel.engineeredPrompt);
                        }
                      }}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#7000FF] hover:opacity-95 text-[#07090E] font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#07090E] fill-[#07090E]" />
                      <span>{isAr ? 'تصدير واختبار في ساحة اللعب' : 'Send & Test in Playground'}</span>
                    </button>
                  </div>
                </div>

                {/* Secondary/Fallback Card */}
                <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-6 space-y-4 relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-[#2D3748] text-[#94A3B8] font-mono text-[9px] font-extrabold rounded-bl-xl uppercase tracking-wider">
                    {isAr ? 'شريك التكامل البديل والاحتياطي' : 'Integration Fallback'}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🛡</span>
                    <div>
                      <h3 className="text-base font-extrabold text-[#F8FAFC]">{matchResult.secondaryModel.name}</h3>
                      <span className="text-xs font-mono text-[#94A3B8]">{matchResult.secondaryModel.provider}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#07090E] border border-[#2D3748] rounded-2xl space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold block">{isAr ? '🎯 دور هذا النموذج في السلسلة:' : '🎯 Backup/Partner Role:'}</span>
                    <p className="text-xs text-[#E2E8F0] leading-relaxed">
                      {isAr ? matchResult.secondaryModel.reason_ar : matchResult.secondaryModel.reason_en}
                    </p>
                  </div>

                  {/* Custom Prompt Template Box */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>{isAr ? 'التعليمات الهيكلية البديلة المهندسة تلقائياً:' : 'Optimized Fallback Prompt:'}</span>
                      </span>
                      <button
                        onClick={() => copyToClipboard(matchResult.secondaryModel.engineeredPrompt, 'secondary')}
                        className="p-1.5 rounded-lg bg-[#07090E] border border-[#2D3748] text-[#94A3B8] hover:text-[#00D1FF] transition-all cursor-pointer flex items-center gap-1"
                        title={isAr ? 'نسخ البرومبت' : 'Copy prompt'}
                      >
                        {copiedSecondary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-[10px] font-mono">{copiedSecondary ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}</span>
                      </button>
                    </div>

                    <div className="p-3 bg-[#07090E] rounded-xl border border-[#2D3748] text-xs font-mono text-[#E2E8F0] overflow-x-auto max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed text-left">
                      {matchResult.secondaryModel.engineeredPrompt}
                    </div>

                    <div className="py-1">
                      <TranslateAndRead text={matchResult.secondaryModel.engineeredPrompt} language={language} />
                    </div>

                    <button
                      onClick={() => {
                        if (onTestInPlayground) {
                          onTestInPlayground(matchResult.secondaryModel.engineeredPrompt);
                        }
                      }}
                      className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-zinc-100" />
                      <span>{isAr ? 'اختبار الشريك البديل في ساحة اللعب' : 'Test Fallback in Playground'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Cooperative Chain Map */}
              <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-6 shadow-xl space-y-4">
                <h3 className="text-xs font-mono font-bold text-[#00D1FF] flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#00D1FF]" />
                  <span>{isAr ? '🔗 خريطة عمل سلسلة التكامل والتعاون التلقائي بين النموذجين' : '🔗 Chaining & Cooperative Model Strategy'}</span>
                </h3>

                <div className="p-4 bg-[#07090E] rounded-2xl border border-[#2D3748] space-y-4">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                    <div className="p-3.5 rounded-xl bg-[#00D1FF]/10 border border-[#00D1FF] min-w-[200px]">
                      <span className="text-xs font-bold text-[#F8FAFC] block">{matchResult.primaryModel.name}</span>
                      <span className="text-[10px] text-[#00D1FF] font-mono">{isAr ? 'عقل التوليد والتحليل الأساسي' : 'Primary Generative Mind'}</span>
                    </div>

                    <span className="text-lg text-[#94A3B8] font-mono rotate-90 md:rotate-0">➔</span>

                    <div className="p-3.5 rounded-xl bg-purple-950/20 border border-[#7000FF] min-w-[200px]">
                      <span className="text-xs font-bold text-[#F8FAFC] block">{matchResult.secondaryModel.name}</span>
                      <span className="text-[10px] text-[#7000FF] font-mono">{isAr ? 'التحقق، التحسين السريع أو الترجمة' : 'Refinement & Validation Chain'}</span>
                    </div>

                    <span className="text-lg text-[#94A3B8] font-mono rotate-90 md:rotate-0">➔</span>

                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/40 min-w-[200px]">
                      <span className="text-xs font-bold text-emerald-400 block">✨ {isAr ? 'المخرجات الصافية والخالية من الأخطاء' : 'Production Output'}</span>
                      <span className="text-[10px] text-zinc-400 font-mono">{isAr ? 'بصلابة استثنائية' : 'Maximum Logical Rigor'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#94A3B8] leading-relaxed font-mono text-center md:text-right">
                    {isAr ? matchResult.collaborationStrategy_ar : matchResult.collaborationStrategy_en}
                  </p>
                </div>
              </div>

              {/* Direct side-by-side comparison matrix table */}
              <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-6 shadow-xl space-y-4">
                <h3 className="text-xs font-mono font-bold text-[#F8FAFC] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#00D1FF]" />
                  <span>{isAr ? '📊 جدول مقارنة المقاييس والمؤشرات' : '📊 Benchmark Comparison Grid'}</span>
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-right sm:text-left text-xs font-mono text-[#F8FAFC]">
                    <thead>
                      <tr className="border-b border-[#2D3748] text-[#94A3B8]">
                        <th className="pb-3 text-right">{isAr ? 'المؤشر والمقياس' : 'Performance Metric'}</th>
                        <th className="pb-3 text-[#00D1FF]">{matchResult.primaryModel.name}</th>
                        <th className="pb-3 text-purple-400">{matchResult.secondaryModel.name}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2D3748]/50">
                      <tr>
                        <td className="py-3 text-[#94A3B8]">{isAr ? 'الاستجابة والسرعة' : 'Speed & Latency'}</td>
                        <td className="py-3 font-bold">{matchResult.comparison.speed}</td>
                        <td className="py-3 font-bold">{matchResult.comparison.speed ? 'متوافق' : 'Standard'}</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-[#94A3B8]">{isAr ? 'القدرة البرمجية والتكويد' : 'Coding Capability'}</td>
                        <td className="py-3 font-bold">{matchResult.comparison.coding}</td>
                        <td className="py-3 font-bold">عالي الكفاءة</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-[#94A3B8]">{isAr ? 'الاستدلال وسلاسل التفكير' : 'Reasoning Depth'}</td>
                        <td className="py-3 font-bold">{matchResult.comparison.reasoning}</td>
                        <td className="py-3 font-bold">متكامل السلسلة</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-[#94A3B8]">{isAr ? 'سياق الذاكرة ونطاق التوكنز' : 'Context Window'}</td>
                        <td className="py-3 font-bold">{matchResult.comparison.context}</td>
                        <td className="py-3 font-bold">ملاءمة ممتازة</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {activeTab === 'multi_compare' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header & Goal Input */}
          <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-[#2D3748] pb-4">
              <Zap className="w-6 h-6 text-[#00D1FF]" />
              <div>
                <h2 className="text-lg font-bold text-[#F8FAFC]">
                  {isAr ? '⚡ محرك تكييف وتوليد البرومبتات للنماذج المتعددة (Multi-Model Adaptive Engine)' : '⚡ Multi-Model Adaptive Prompt Optimizer'}
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  {isAr
                    ? 'حدد هدفك وحدد النماذج المطلوبة، وسيقوم النظام بتوليد البرومبتات المهندسة هندسياً لكل نموذج بناءً على بنيته الفردية مع برومبت التوليف الموحد الشامل.'
                    : 'Input your task objective and choose target models. The engine auto-architects model-specific prompts tailored to each model\'s reasoning persona.'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#00D1FF] font-bold block">
                  {isAr ? '🎯 ما هو الهدف أو المهمة التي تريد تنفيذها؟' : '🎯 Task Objective / Target Goal:'}
                </label>
                <textarea
                  value={compareGoal}
                  onChange={(e) => setCompareGoal(e.target.value)}
                  placeholder={isAr ? 'مثال: تصميم معماري لنظام تحليلي يراقب خوادم الكلاود ويكتشف الهجمات بالذكاء الاصطناعي مع توليد تقارير أمنية...' : 'e.g., Design a cloud-native microservice architecture for automated log anomaly detection with zero-day exploit alerts...'}
                  rows={4}
                  className="w-full bg-[#07090E] border border-[#2D3748] rounded-2xl p-4 text-xs text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF]/30 resize-none font-sans leading-relaxed"
                />
              </div>

              {/* Model Multi-Select Checklist */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#94A3B8] font-bold block">
                  {isAr ? 'اختر النماذج المستهدفة للمقارنة والتكيف:' : 'Select Target Models for Comparison & Optimization:'}
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {MODEL_INTELLIGENCE_PROFILES.slice(0, 8).map((m) => {
                    const isChecked = compareSelectedModels.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          if (isChecked) {
                            if (compareSelectedModels.length > 1) {
                              setCompareSelectedModels(compareSelectedModels.filter((id) => id !== m.id));
                            }
                          } else {
                            setCompareSelectedModels([...compareSelectedModels, m.id]);
                          }
                        }}
                        className={`p-2.5 rounded-xl border text-right sm:text-left text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-[#7000FF]/20 border-[#00D1FF] text-[#F8FAFC] font-bold'
                            : 'bg-[#07090E] border-[#2D3748] text-[#94A3B8] hover:border-[#1A1F2B]'
                        }`}
                      >
                        <span className="truncate">{m.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${isChecked ? 'bg-[#00D1FF] text-[#07090E] font-bold' : 'bg-zinc-800 text-zinc-400'}`}>
                          {isChecked ? '✓' : '+'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                disabled={!compareGoal.trim() || compareLoading}
                onClick={async () => {
                  if (!compareGoal.trim()) return;
                  setCompareLoading(true);
                  try {
                    const res = await fetch('/api/ai/multi-model-compare', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        taskGoal: compareGoal,
                        selectedModels: compareSelectedModels,
                        language
                      })
                    });
                    if (res.ok) {
                      const data = await res.json();
                      setCompareResult(data);
                    }
                  } catch (err) {
                    console.error(err);
                  } finally {
                    setCompareLoading(false);
                  }
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00D1FF] via-[#7000FF] to-purple-600 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-[#07090E] font-extrabold text-xs transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                {compareLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#07090E]" />
                    <span>{isAr ? 'جاري تحليل شخصيات النماذج وتكييف البرومبتات...' : 'Architecting model-tailored prompts...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#07090E]" />
                    <span>{isAr ? 'أطلق مقارنة البرومبتات وتكيف النماذج' : 'Generate Adaptive Model Prompts & Comparison'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Compare Results Render */}
          {compareResult && (
            <div className="space-y-6 animate-fadeIn">
              {/* Unified Master Fusion Prompt */}
              <div className="bg-[#0F1219] border-2 border-[#00D1FF]/50 rounded-3xl p-6 shadow-2xl space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-[#00D1FF] to-[#7000FF] text-[#07090E] font-mono text-[10px] font-extrabold rounded-bl-2xl uppercase tracking-wider">
                  👑 {isAr ? 'برومبت التوليف الموحد الشامل (Master Universal Fusion Prompt)' : 'Master Universal Fusion Prompt'}
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-[#F8FAFC]">
                    {isAr ? '✨ البرومبت الموحد المتوافق مع جميع النماذج المستهدفة' : '✨ Universal Cross-Model Fusion Prompt'}
                  </h3>
                  <p className="text-xs text-[#94A3B8] font-mono leading-relaxed">
                    {isAr ? compareResult.fusionExplanation_ar : compareResult.fusionExplanation_en}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#00D1FF] font-bold">{isAr ? 'نص البرومبت الموحد الجاهز:' : 'Universal Prompt Payload:'}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(compareResult.fusionPrompt);
                          setCopiedFusion(true);
                          setTimeout(() => setCopiedFusion(false), 2000);
                        }}
                        className="px-3 py-1 rounded-lg bg-[#07090E] border border-[#2D3748] text-[#00D1FF] text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                      >
                        {copiedFusion ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedFusion ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}</span>
                      </button>

                      {onTestInPlayground && (
                        <button
                          type="button"
                          onClick={() => onTestInPlayground(compareResult.fusionPrompt)}
                          className="px-3 py-1 rounded-lg bg-[#7000FF] hover:bg-[#8010FF] text-white text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>{isAr ? 'اختبار في ساحة اللعب' : 'Test in Playground'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <pre className="p-4 bg-[#07090E] rounded-2xl border border-[#2D3748] text-xs font-mono text-[#E2E8F0] whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                    {compareResult.fusionPrompt}
                  </pre>
                </div>
              </div>

              {/* Individual Model-Specific Tailored Prompts Grid */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#F8FAFC] flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#00D1FF]" />
                  <span>{isAr ? 'البرومبتات المخصصة برمجياً لكل نموذج على حدة:' : 'Model-Specific Tailored Prompts:'}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {compareResult.modelPrompts?.map((mp: any, idx: number) => (
                    <div key={idx} className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-6 space-y-4 shadow-xl hover:border-[#00D1FF]/40 transition-all">
                      <div className="flex items-center justify-between pb-3 border-b border-[#2D3748]">
                        <div>
                          <h4 className="text-sm font-extrabold text-[#F8FAFC]">{mp.modelName}</h4>
                          <span className="text-[10px] font-mono text-[#00D1FF]">{mp.provider}</span>
                        </div>

                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          {isAr ? `تطابق: ${mp.suitabilityScore}%` : `Match: ${mp.suitabilityScore}%`}
                        </span>
                      </div>

                      {/* Strategy tags */}
                      <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded-md bg-[#7000FF]/20 text-[#00D1FF] border border-[#7000FF]/40">
                          📐 {mp.framingTechnique}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#1A1F2B] text-[#94A3B8] border border-[#2D3748]">
                          🧠 {mp.reasoningTrigger}
                        </span>
                      </div>

                      {/* Explanation of model-specific optimization */}
                      <div className="p-3 bg-[#07090E] border border-[#2D3748] rounded-2xl space-y-1 text-xs">
                        <span className="text-[10px] font-mono text-amber-400 font-bold block">{isAr ? '💡 سبب واستراتيجية التخصيص لـ ' + mp.modelName + ':' : 'Optimization Strategy:'}</span>
                        <p className="text-[#E2E8F0] font-mono text-[11px]">
                          {isAr ? mp.optimizationNotes_ar : mp.optimizationNotes_en}
                        </p>
                      </div>

                      {/* Model Prompt Output */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-[#94A3B8]">{isAr ? 'البرومبت المخصص للنموذج:' : 'Model-Optimized Prompt:'}</span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(mp.prompt);
                              setCopiedCompareIndex(idx);
                              setTimeout(() => setCopiedCompareIndex(null), 2000);
                            }}
                            className="p-1 rounded bg-[#07090E] text-[#94A3B8] hover:text-[#00D1FF] text-[10px] font-mono cursor-pointer flex items-center gap-1"
                          >
                            {copiedCompareIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedCompareIndex === idx ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ' : 'Copy')}</span>
                          </button>
                        </div>

                        <pre className="p-3 bg-[#07090E] rounded-xl border border-[#2D3748] text-xs font-mono text-[#E2E8F0] whitespace-pre-wrap max-h-40 overflow-y-auto">
                          {mp.prompt}
                        </pre>

                        {onTestInPlayground && (
                          <button
                            type="button"
                            onClick={() => onTestInPlayground(mp.prompt)}
                            className="w-full py-2 rounded-xl bg-[#1A1F2B] hover:bg-[#2D3748] text-[#F8FAFC] text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5 text-[#00D1FF]" />
                            <span>{isAr ? `اختبار برومبت ${mp.modelName} في ساحة اللعب` : `Test ${mp.modelName} Prompt`}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
