import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Play, 
  Bot, 
  Heart, 
  BarChart3, 
  BookOpen, 
  Search,
  Globe,
  Flame,
  ShieldAlert,
  Palette,
  Eye,
  Check,
  ChevronDown,
  Scan,
  Download,
  Package,
  Zap,
  Layers,
  GitBranch,
  GitPullRequest,
  ImageIcon,
  Target,
  Bomb,
  Settings
} from 'lucide-react';

export type EyeTheme = 'calm-slate' | 'sage-emerald' | 'warm-espresso' | 'soft-cream';

export interface NavbarProps {
  activeTab:
    | 'directory'
    | 'github_patch_studio'
    | 'injection_engine'
    | 'site_scraper'
    | 'jailbreak_engine'
    | 'image_analyzer'
    | 'multi_model_comparator'
    | 'red_team_lab'
    | 'multimodal_chain'
    | 'geo_payload'
    | 'prompt_resilience'
    | 'prompt_architect'
    | 'generator'
    | 'model_analyzer'
    | 'video_studio'
    | 'image_studio'
    | 'quality_audit'
    | 'remix_export'
    | 'playground'
    | 'bot_simulator'
    | 'favorites'
    | 'stats'
    | 'image_payload_injector'
    | 'prompt_chain'
    | 'hunter_system'
    | 'payload_forge'
    | 'prompt_os';
  setActiveTab: (
    tab:
      | 'directory'
      | 'github_patch_studio'
      | 'injection_engine'
      | 'site_scraper'
      | 'jailbreak_engine'
      | 'image_analyzer'
      | 'multi_model_comparator'
      | 'red_team_lab'
      | 'multimodal_chain'
      | 'geo_payload'
      | 'prompt_resilience'
      | 'prompt_architect'
      | 'generator'
      | 'model_analyzer'
      | 'video_studio'
      | 'image_studio'
      | 'quality_audit'
      | 'remix_export'
      | 'playground'
      | 'bot_simulator'
      | 'favorites'
      | 'stats'
      | 'image_payload_injector'
      | 'prompt_chain'
      | 'hunter_system'
      | 'payload_forge'
      | 'prompt_os'
  ) => void;
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favoritesCount: number;
  theme: EyeTheme;
  setTheme: (theme: EyeTheme) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  searchQuery,
  setSearchQuery,
  favoritesCount,
  theme,
  setTheme
}) => {
  const isAr = language === 'ar';
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setShowThemeMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      const activeBtn = navRef.current.querySelector<HTMLElement>('[data-active="true"]');
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  const themesList: { id: EyeTheme; nameAr: string; nameEn: string; icon: string; dotColor: string }[] = [
    { id: 'calm-slate', nameAr: '🌊 أزرق هادئ', nameEn: 'Calm Slate', icon: '🌊', dotColor: 'bg-sky-400' },
    { id: 'sage-emerald', nameAr: '🌿 أخضر زيتي مريح', nameEn: 'Sage Emerald', icon: '🌿', dotColor: 'bg-teal-400' },
    { id: 'warm-espresso', nameAr: '☕ داكن دافئ', nameEn: 'Warm Espresso', icon: '☕', dotColor: 'bg-amber-400' },
    { id: 'soft-cream', nameAr: '☀️ كريمي مريح', nameEn: 'Soft Cream Light', icon: '☀️', dotColor: 'bg-amber-500' },
  ];

  const activeThemeObj = themesList.find((t) => t.id === theme) || themesList[0];

  return (
    <header className="sticky top-0 z-40 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border)] text-[var(--text-primary)] transition-colors duration-300 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-1.5 sm:gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 cursor-pointer select-none shrink-0" onClick={() => setActiveTab('directory')}>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[var(--bg-base)] rounded-[6px] flex items-center justify-center">
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-primary)]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-lg tracking-tight text-[var(--text-primary)]">
                  مشتسكو <span className="text-[var(--accent-primary)] hidden sm:inline">Mushtasko</span>
                </span>
                <span className="px-1.5 py-0.2 text-[9px] sm:text-[10px] font-mono font-bold bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--border)] rounded-full">
                  v2.5
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] font-mono hidden sm:block">
                {isAr ? 'استوديو برومبتات الذكاء الاصطناعي' : 'AI Prompt Engineering Studio'}
              </p>
            </div>
          </div>

          {/* Search Input (Global) - Sleek Pill Search */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'بحث في البرومبتات، Jailbreak، الأكواد...' : 'Search prompts, jailbreaks, code...'}
              className={`w-full bg-[var(--input-bg)] border border-[var(--border)] focus:border-[var(--accent-primary)] rounded-full ${isAr ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]/50 transition-all`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className={`absolute ${isAr ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]`}
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            
            {/* Comfortable Theme Selector Dropdown */}
            <div className="relative" ref={themeMenuRef}>
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-mono rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] transition-all cursor-pointer shadow-sm"
                title={isAr ? 'تغيير الألوان المريحة' : 'Change Eye-Care Theme'}
              >
                <Eye className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
                <span className="hidden sm:inline font-semibold">{isAr ? activeThemeObj.nameAr : activeThemeObj.nameEn}</span>
                <ChevronDown className={`w-3 h-3 text-[var(--text-secondary)] transition-transform shrink-0 ${showThemeMenu ? 'rotate-180' : ''}`} />
              </button>

              {showThemeMenu && (
                <div className={`absolute ${isAr ? 'left-0' : 'right-0'} mt-2 w-56 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border)] shadow-xl p-2 z-50 text-xs font-mono space-y-1`}>
                  <div className="px-3 py-1.5 text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider border-b border-[var(--border)] mb-1">
                    {isAr ? '🎨 ألوان مريحة للعين' : '🎨 Eye-Care Themes'}
                  </div>
                  {themesList.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                        theme === t.id
                          ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)] font-bold border border-[var(--border)]'
                          : 'text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${t.dotColor}`} />
                        <span>{isAr ? t.nameAr : t.nameEn}</span>
                      </div>
                      {theme === t.id && <Check className="w-3.5 h-3.5 text-[var(--accent-primary)]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Engine File Download Button */}
            <a
              href="/api/download/multimodal-injector.tsx"
              download="MultimodalChainInjector.tsx"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all cursor-pointer shrink-0"
              title={isAr ? 'تحميل ملف محرك الحقن MultimodalChainInjector.tsx' : 'Download MultimodalChainInjector.tsx'}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isAr ? 'ملف محرك الحقن (.tsx)' : 'Engine TSX'}</span>
            </a>

            {/* Direct Zip Download Button */}
            <a
              href="/api/download/baby.zip"
              download="baby.zip"
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-mono font-bold rounded-xl bg-[var(--accent-primary)] text-[var(--bg-base)] hover:opacity-90 shadow-md transition-all cursor-pointer shrink-0"
              title={isAr ? 'تحميل حزمة الكود كاملة baby.zip' : 'Download Complete Codebase baby.zip'}
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{isAr ? 'تحميل baby.zip' : 'Download ZIP'}</span>
              <span className="sm:hidden">baby.zip</span>
            </a>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-mono rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] transition-colors cursor-pointer shadow-sm shrink-0"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
              <span>{language === 'ar' ? 'EN' : 'العربية'}</span>
            </button>

            {/* AI Studio Thinking Indicator Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-mono shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>● Gemini 3.1 Pro</span>
            </div>
          </div>

        </div>

        {/* Navigation Tabs */}
        <nav ref={navRef} className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-2 border-t border-[var(--border)] scrollbar-none w-full max-w-full">
          <button
            onClick={() => setActiveTab('directory')}
            data-active={activeTab === 'directory'}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'directory'
                ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 shadow-sm font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{isAr ? 'دليل البرومبتات' : 'Directory'}</span>
          </button>

          <button
            onClick={() => setActiveTab('github_patch_studio')}
            data-active={activeTab === 'github_patch_studio'}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'github_patch_studio'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm font-bold'
                : 'text-cyan-400/80 hover:text-cyan-300 hover:bg-cyan-500/10'
            }`}
          >
            <GitPullRequest className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'استوديو باتشات GitHub' : 'GitHub Code Patch'}</span>
          </button>

          <button
            onClick={() => setActiveTab('injection_engine')}
            data-active={activeTab === 'injection_engine'}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'injection_engine'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm font-bold'
                : 'text-cyan-400/80 hover:text-cyan-300 hover:bg-cyan-500/10'
            }`}
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'حقن الملفات العميق' : 'File Injection'}</span>
          </button>

          <button
            onClick={() => setActiveTab('site_scraper')}
            data-active={activeTab === 'site_scraper'}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'site_scraper'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm font-bold'
                : 'text-emerald-400/80 hover:text-emerald-300 hover:bg-emerald-500/10'
            }`}
          >
            <Scan className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? 'سحب المواقع' : 'Site Scraper'}</span>
          </button>

          <button
            onClick={() => setActiveTab('jailbreak_engine')}
            data-active={activeTab === 'jailbreak_engine'}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'jailbreak_engine'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-sm font-bold'
                : 'text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/10'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>{isAr ? 'كسر الحماية' : 'Jailbreak Engine'}</span>
          </button>

          <button
            onClick={() => setActiveTab('image_analyzer')}
            data-active={activeTab === 'image_analyzer'}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'image_analyzer'
                ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40 shadow-sm font-bold'
                : 'text-pink-400/80 hover:text-pink-300 hover:bg-pink-500/10'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-pink-400" />
            <span>{isAr ? 'محلل الصور المتقدم' : 'Image Analyzer'}</span>
          </button>

          <button
            onClick={() => setActiveTab('multi_model_comparator')}
            data-active={activeTab === 'multi_model_comparator'}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'multi_model_comparator'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40 shadow-sm font-bold'
                : 'text-purple-400/80 hover:text-purple-300 hover:bg-purple-500/10'
            }`}
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>{isAr ? 'مقارنة النماذج' : 'Model Comparator'}</span>
          </button>

          <button
            onClick={() => setActiveTab('red_team_lab')}
            data-active={activeTab === 'red_team_lab'}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'red_team_lab'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-sm font-bold'
                : 'text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/10'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>{isAr ? 'مختبر أطر الأمان v3.5' : 'Red Team Lab v3.5'}</span>
          </button>

          <button
            onClick={() => setActiveTab('multimodal_chain')}
            data-active={activeTab === 'multimodal_chain'}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'multimodal_chain'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm font-bold'
                : 'text-cyan-400/80 hover:text-cyan-300 hover:bg-cyan-500/10'
            }`}
          >
            <Scan className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'محرك الحقن & Chain-of-Attack' : 'Multimodal Injector'}</span>
          </button>

          <button
            onClick={() => setActiveTab('geo_payload')}
            data-active={activeTab === 'geo_payload'}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'geo_payload'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40 shadow-sm font-bold'
                : 'text-purple-400/80 hover:text-purple-300 hover:bg-purple-500/10'
            }`}
          >
            <Zap className="w-4 h-4 text-purple-400" />
            <span>{isAr ? 'حقن الملفات & تحديد الموقع' : 'Geo & Payload Injector'}</span>
          </button>

          <button
            onClick={() => setActiveTab('image_payload_injector')}
            data-active={activeTab === 'image_payload_injector'}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'image_payload_injector'
                ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40 shadow-sm font-bold'
                : 'text-pink-400/80 hover:text-pink-300 hover:bg-pink-500/10'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-pink-400" />
            <span>{isAr ? 'حقن ملفات الصور' : 'Image Payload'}</span>
          </button>

          <button
            onClick={() => setActiveTab('hunter_system')}
            data-active={activeTab === 'hunter_system'}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'hunter_system'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-sm font-bold'
                : 'text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/10'
            }`}
          >
            <Target className="w-4 h-4 text-rose-500" />
            <span>{isAr ? 'نظام الصيد (Hunter System)' : 'Hunter System'}</span>
          </button>

          <button
            onClick={() => setActiveTab('payload_forge')}
            data-active={activeTab === 'payload_forge'}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'payload_forge'
                ? 'bg-rose-600/20 text-rose-400 border border-rose-600/50 shadow-sm font-bold'
                : 'text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/10'
            }`}
          >
            <Bomb className="w-4 h-4 text-rose-500" />
            <span>{isAr ? 'مصنع الحمولات (Payload Forge)' : 'Payload Forge'}</span>
          </button>

          <button
            onClick={() => setActiveTab('prompt_os')}
            data-active={activeTab === 'prompt_os'}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'prompt_os'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm font-bold'
                : 'text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/10'
            }`}
          >
            <Settings className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'نظام التشغيل (Prompt OS)' : 'Prompt OS'}</span>
          </button>

          <button
            onClick={() => setActiveTab('prompt_chain')}
            data-active={activeTab === 'prompt_chain'}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'prompt_chain'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm font-bold'
                : 'text-emerald-400/80 hover:text-emerald-300 hover:bg-emerald-500/10'
            }`}
          >
            <GitBranch className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? 'منظم سلاسل البرومبت' : 'Prompt Chain'}</span>
          </button>

          <button
            onClick={() => setActiveTab('prompt_resilience')}
            data-active={activeTab === 'prompt_resilience'}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'prompt_resilience'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40 shadow-sm font-bold'
                : 'text-purple-400/80 hover:text-purple-300 hover:bg-purple-500/10'
            }`}
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>{isAr ? 'مختبر مرونة البرومبت' : 'Prompt Resilience'}</span>
          </button>

          <button
            onClick={() => setActiveTab('prompt_architect')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'prompt_architect'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40 shadow-sm font-bold'
                : 'text-purple-400/80 hover:text-purple-300 hover:bg-purple-500/10'
            }`}
          >
            <span className="text-sm">⚡</span>
            <span>{isAr ? 'مهندس البرومبتات (S-Ladder)' : 'Prompt Architect'}</span>
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'generator'
                ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 shadow-sm font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#00D1FF]" />
            <span>{isAr ? 'توليد النصوص' : 'Text Prompting'}</span>
          </button>

          <button
            onClick={() => setActiveTab('model_analyzer')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'model_analyzer'
                ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 shadow-sm font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            <span className="text-sm">🔬</span>
            <span>{isAr ? 'دليل النماذج' : 'Model Guide'}</span>
          </button>

          <button
            onClick={() => setActiveTab('video_studio')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'video_studio'
                ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 shadow-sm font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            <span className="text-sm">🎬</span>
            <span>{isAr ? 'استوديو الفيديو' : 'Video Studio'}</span>
          </button>

          <button
            onClick={() => setActiveTab('image_studio')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'image_studio'
                ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 shadow-sm font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            <span className="text-sm">🖼️</span>
            <span>{isAr ? 'استوديو الصور' : 'Image Studio'}</span>
          </button>

          <button
            onClick={() => setActiveTab('quality_audit')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'quality_audit'
                ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 shadow-sm font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            <span className="text-sm">⚡</span>
            <span>{isAr ? 'فحص الجودة' : 'Audit Engine'}</span>
          </button>

          <button
            onClick={() => setActiveTab('remix_export')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'remix_export'
                ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 shadow-sm font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            <span className="text-sm">🔄</span>
            <span>{isAr ? 'تحويل الأسلوب' : 'Remix Engine'}</span>
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'playground'
                ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 shadow-sm font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            <Play className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>{isAr ? 'حلبة التجربة' : 'Playground'}</span>
          </button>

          <button
            onClick={() => setActiveTab('bot_simulator')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'bot_simulator'
                ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 shadow-sm font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            <Bot className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>{isAr ? 'محاكي البوت' : 'Telegram Bot'}</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'favorites'
                ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 shadow-sm font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-400" />
            <span>{isAr ? 'المفضلة' : 'Favorites'}</span>
            {favoritesCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'stats'
                ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 shadow-sm font-bold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>{isAr ? 'الإحصائيات' : 'Stats'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
