/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { PromptItem, Category, Difficulty, TargetModel } from './types';
import { INITIAL_CATEGORIES, INITIAL_PROMPTS } from './data/promptsData';

import { Navbar, EyeTheme } from './components/Navbar';
import { BabyProjectExporter } from './components/BabyProjectExporter';
import { CategoryFilter } from './components/CategoryFilter';
import { PromptCard } from './components/PromptCard';
import { PromptDetailModal } from './components/PromptDetailModal';
import { AiPromptGenerator } from './components/AiPromptGenerator';
import { ModelBehaviorAnalyzer } from './components/ModelBehaviorAnalyzer';
import { AiVideoPromptStudio } from './components/AiVideoPromptStudio';
import { PromptQualityOptimizer } from './components/PromptQualityOptimizer';
import { PromptRemixExporter } from './components/PromptRemixExporter';
import { PlaygroundArena } from './components/PlaygroundArena';
import { BotSimulator } from './components/BotSimulator';
import { StatsView } from './components/StatsView';
import { UserPromptsView } from './components/UserPromptsView';
import { ElitePromptArchitect } from './components/ElitePromptArchitect';
import { MultimodalChainInjector } from './components/MultimodalChainInjector';
import { FileInjectionEngine } from './components/FileInjectionEngine';
import { SiteScraperHarvester } from './components/SiteScraperHarvester';
import { JailbreakEngine } from './components/JailbreakEngine';
import { AdvancedImageAnalyzer } from './components/AdvancedImageAnalyzer';
import { MultiModelComparator } from './components/MultiModelComparator';
import { HunterInjectionSystem } from './components/HunterInjectionSystem';
import { MetasploitConsole } from './components/MetasploitConsole';
import { PayloadForge } from './components/PayloadForge';
import { PromptOSDashboard } from './components/PromptOSDashboard';
import { GithubPatchStudio } from './components/GithubPatchStudio';
import { ErrorBoundary } from './components/ErrorBoundary';

import { Sparkles, Terminal, BookOpen, Heart, Flame, ShieldAlert, Plus, WifiOff, Scan, Zap } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  const [theme, setTheme] = useState<EyeTheme>(() => {
    try {
      const saved = localStorage.getItem('hackerai_theme');
      return (saved as EyeTheme) || 'calm-slate';
    } catch {
      return 'calm-slate';
    }
  });

  const [activeTab, setActiveTab] = useState<
    | 'directory'
    | 'github_patch_studio'
    | 'injection_engine'
    | 'site_scraper'
    | 'jailbreak_engine'
    | 'image_analyzer'
    | 'multi_model_comparator'
    | 'generator'
    | 'playground'
    | 'bot_simulator'
    | 'favorites'
    | 'stats'
    | 'red_team_lab'
    | 'multimodal_chain'
    | 'geo_payload'
    | 'image_payload_injector'
    | 'prompt_chain'
    | 'prompt_resilience'
    | 'prompt_architect'
    | 'model_analyzer'
    | 'video_studio'
    | 'image_studio'
    | 'quality_audit'
    | 'remix_export'
    | 'hunter_system'
    | 'payload_forge'
    | 'prompt_os'
  >('directory');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');

  // Apply Theme Attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('hackerai_theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  // Load Favorites from LocalStorage
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('hackerai_favorites');
      return saved ? JSON.parse(saved) : [1, 6, 7]; // Default favorites
    } catch {
      return [1, 6, 7];
    }
  });

  // Load Custom Prompts from LocalStorage
  const [customPrompts, setCustomPrompts] = useState<PromptItem[]>(() => {
    try {
      const saved = localStorage.getItem('hackerai_custom_prompts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedDetailPrompt, setSelectedDetailPrompt] = useState<PromptItem | null>(null);
  const [playgroundInitialPrompt, setPlaygroundInitialPrompt] = useState('');
  const [generatorInitialModel, setGeneratorInitialModel] = useState<TargetModel | undefined>(undefined);
  const [generatorInitialInstructions, setGeneratorInitialInstructions] = useState<string | undefined>(undefined);

  const handleCraftWithModelStructure = (modelId: string, structureText: string) => {
    setGeneratorInitialModel(modelId as TargetModel);
    setGeneratorInitialInstructions(
      language === 'ar'
        ? `يرجى تصميم البرومبت وهندسته بدقة متناهية ليلتزم تماماً بالهيكل المقترح التالي لهذا النموذج:\n${structureText}\nمع دمج وتأطير التعليمات لتبني دور نظام قوي ومقاومة للرفض.`
        : `Please design and engineer the prompt with extreme precision, adhering completely to the following recommended structure for this model:\n${structureText}\nFrame the instructions properly to adopt a robust system role and resist false-positive refusals.`
    );
    setActiveTab('generator');
  };

  // Persist Favorites
  useEffect(() => {
    try {
      localStorage.setItem('hackerai_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Persist Custom Prompts
  useEffect(() => {
    try {
      localStorage.setItem('hackerai_custom_prompts', JSON.stringify(customPrompts));
    } catch (e) {
      console.error(e);
    }
  }, [customPrompts]);

  const isAr = language === 'ar';

  // All Prompts combined
  const allPrompts = useMemo(() => {
    return [...INITIAL_PROMPTS, ...customPrompts];
  }, [customPrompts]);

  // Filtered Directory Prompts
  const filteredPrompts = useMemo(() => {
    return allPrompts.filter((p) => {
      // Category Filter
      if (selectedCategory && p.category_id !== selectedCategory) {
        return false;
      }
      // Difficulty Filter
      if (selectedDifficulty !== 'all' && p.difficulty !== selectedDifficulty) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(q) || (p.title_ar && p.title_ar.toLowerCase().includes(q));
        const matchesPrompt = p.prompt.toLowerCase().includes(q);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesPrompt && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [allPrompts, selectedCategory, selectedDifficulty, searchQuery]);

  // Favorites List
  const favoritePromptsList = useMemo(() => {
    return allPrompts.filter((p) => favorites.includes(p.id));
  }, [allPrompts, favorites]);

  // Actions
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]));
  };

  const handleTestInPlayground = (promptText: string) => {
    setPlaygroundInitialPrompt(promptText);
    setActiveTab('playground');
  };

  const handleAddCustomPrompt = (promptData: {
    title: string;
    title_ar: string;
    prompt: string;
    category: string;
    difficulty: Difficulty;
    tags: string[];
  }) => {
    const newPrompt: PromptItem = {
      id: Date.now(),
      category_id: promptData.category,
      title: promptData.title,
      title_ar: promptData.title_ar,
      prompt: promptData.prompt,
      tags: promptData.tags,
      difficulty: promptData.difficulty,
      strength: 5,
      usage_count: 1,
      is_template: true,
      description: 'Custom user engineered prompt.'
    };
    setCustomPrompts((prev) => [newPrompt, ...prev]);
  };

  const handleDeleteCustomPrompt = (id: number) => {
    setCustomPrompts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className={`min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] font-sans relative transition-colors duration-300 ${isAr ? 'rtl' : 'ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Sleek Radial Glow Background Overlay */}
      <div className="sleek-glow-overlay" />

      {/* Offline Status Banner */}
      {!isOnline && (
        <div className="bg-red-500/90 text-white font-bold text-xs sm:text-sm py-2 px-4 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-lg backdrop-blur-md border-b border-red-600">
          <WifiOff className="w-4 h-4 animate-pulse" />
          <span>
            {isAr
              ? 'أنت غير متصل بالإنترنت حالياً. قد تتوقف عمليات توليد البرومبت واختبار النماذج حتى إعادة الاتصال.'
              : 'You are currently offline. AI generation and model testing may pause until connection is restored.'}
          </span>
        </div>
      )}

      {/* Top Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.length}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 relative z-10 w-full overflow-x-hidden">
        
        {/* GITHUB CODE PATCH STUDIO TAB */}
        {activeTab === 'github_patch_studio' && (
          <ErrorBoundary moduleName="GitHub Code Patch Studio" language={language}>
            <GithubPatchStudio language={language} />
          </ErrorBoundary>
        )}
        {activeTab === 'directory' && (
          <div className="space-y-4 sm:space-y-6 animate-fadeIn">
            
            {/* Hero Header Banner */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl sm:rounded-3xl p-4 sm:p-8 relative overflow-hidden shadow-xl transition-colors duration-300">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-glow)] to-transparent rounded-full filter blur-3xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-glow)] border border-[var(--border)] text-[var(--accent-primary)] text-xs font-mono font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>HackerAI Prompt Repository v2.5</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                    {isAr ? 'مستودع برومبتات الذكاء الاصطناعي واختبار الأمان' : 'AI Prompt Engineering & Red Team Repository'}
                  </h1>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {isAr
                      ? 'أكبر مكتبة برومبتات تفاعلية لهندسة الذكاء الاصطناعي، Jailbreak، البحث الأمني، وتطوير الأنظمة مع تجربة واختبار فوري عبر Gemini 3.1 Pro.'
                      : 'Comprehensive collection of production-grade prompts, security research jailbreaks, and software architecture templates.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveTab('multimodal_chain')}
                    className="px-5 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                  >
                    <Scan className="w-4 h-4 stroke-[2.5]" />
                    <span>{isAr ? 'محرك الحقن متعدد الوسائط' : 'Multimodal Injector'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('generator')}
                    className="px-5 py-3 rounded-full bg-[var(--accent-primary)] hover:opacity-90 text-[var(--bg-base)] font-bold text-xs flex items-center gap-2 shadow-lg shadow-[var(--accent-glow)] transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>{isAr ? 'توليد برومبت ذكي' : 'AI Prompt Studio'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Compressed Project Exporter (baby.zip) */}
            <BabyProjectExporter language={language} />

            {/* Category & Difficulty Filters */}
            <CategoryFilter
              categories={INITIAL_CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedDifficulty={selectedDifficulty}
              onSelectDifficulty={setSelectedDifficulty}
              language={language}
              totalCount={filteredPrompts.length}
            />

            {/* Prompt Cards Grid */}
            {filteredPrompts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPrompts.map((p) => {
                  const categoryInfo = INITIAL_CATEGORIES.find((c) => c.id === p.category_id);
                  return (
                    <PromptCard
                      key={p.id}
                      prompt={p}
                      categoryIcon={categoryInfo?.icon}
                      categoryName={isAr ? categoryInfo?.name_ar : categoryInfo?.name}
                      isFavorite={favorites.includes(p.id)}
                      onToggleFavorite={toggleFavorite}
                      onOpenDetail={setSelectedDetailPrompt}
                      onTestInPlayground={handleTestInPlayground}
                      language={language}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-24 bg-zinc-900/50 rounded-3xl border border-zinc-800 space-y-3">
                <BookOpen className="w-12 h-12 mx-auto text-zinc-600" />
                <p className="text-sm font-mono text-zinc-400">
                  {isAr ? 'لم نجد برومبتات تطابق نتائج البحث والفلترة.' : 'No prompts found matching your search and filter criteria.'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                    setSelectedDifficulty('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200"
                >
                  {isAr ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* INJECTION ENGINE TAB */}
        {activeTab === 'injection_engine' && (
          <ErrorBoundary moduleName="Injection Engine" language={language}>
            <FileInjectionEngine />
          </ErrorBoundary>
        )}

        {/* SITE SCRAPER TAB */}
        {activeTab === 'site_scraper' && (
          <ErrorBoundary moduleName="Site Scraper" language={language}>
            <SiteScraperHarvester />
          </ErrorBoundary>
        )}

        {/* JAILBREAK ENGINE TAB */}
        {activeTab === 'jailbreak_engine' && (
          <ErrorBoundary moduleName="Jailbreak Engine" language={language}>
            <JailbreakEngine />
          </ErrorBoundary>
        )}

        {/* IMAGE ANALYZER TAB */}
        {activeTab === 'image_analyzer' && (
          <ErrorBoundary moduleName="Image Analyzer" language={language}>
            <AdvancedImageAnalyzer />
          </ErrorBoundary>
        )}

        {/* HUNTER SYSTEM TAB */}
        {activeTab === 'hunter_system' && (
          <ErrorBoundary moduleName="Hunter System" language={language}>
            <HunterInjectionSystem />
          </ErrorBoundary>
        )}

        {/* PAYLOAD FORGE TAB */}
        {activeTab === 'msf_console' && (
          <ErrorBoundary moduleName="Metasploit Console" language={language}>
            <MetasploitConsole />
          </ErrorBoundary>
        )}
        {activeTab === 'payload_forge' && (
          <ErrorBoundary moduleName="Payload Forge" language={language}>
            <PayloadForge language={language} />
          </ErrorBoundary>
        )}

        {/* PROMPT OS TAB */}
        {activeTab === 'prompt_os' && (
          <ErrorBoundary moduleName="Prompt OS Dashboard" language={language}>
            <PromptOSDashboard />
          </ErrorBoundary>
        )}

        {/* MULTI-MODEL COMPARATOR TAB */}
        {activeTab === 'multi_model_comparator' && (
          <ErrorBoundary moduleName="Multi-Model Comparator" language={language}>
            <MultiModelComparator />
          </ErrorBoundary>
        )}

        {/* AI GENERATOR TAB */}
        {activeTab === 'generator' && (
          <ErrorBoundary moduleName="AI Prompt Generator" language={language}>
            <AiPromptGenerator
              onTestInPlayground={handleTestInPlayground}
              onSaveCustomPrompt={handleAddCustomPrompt}
              language={language}
              initialTargetModel={generatorInitialModel}
              initialCustomInstructions={generatorInitialInstructions}
            />
          </ErrorBoundary>
        )}

        {/* MODEL BEHAVIOR ANALYZER TAB */}
        {activeTab === 'model_analyzer' && (
          <ErrorBoundary moduleName="Model Behavior Analyzer" language={language}>
            <ModelBehaviorAnalyzer 
              language={language} 
              onCraftWithModelStructure={handleCraftWithModelStructure}
            />
          </ErrorBoundary>
        )}

        {/* AI VIDEO PROMPT STUDIO TAB */}
        {activeTab === 'video_studio' && (
          <ErrorBoundary moduleName="AI Video Prompt Studio" language={language}>
            <AiVideoPromptStudio
              language={language}
              onTestInPlayground={handleTestInPlayground}
            />
          </ErrorBoundary>
        )}

        {/* AI IMAGE PROMPT STUDIO TAB */}
        {activeTab === 'image_studio' && (
          <ErrorBoundary moduleName="Advanced Image Analyzer" language={language}>
            <AdvancedImageAnalyzer />
          </ErrorBoundary>
        )}

        {/* QUALITY AUDIT ENGINE TAB */}
        {activeTab === 'quality_audit' && (
          <ErrorBoundary moduleName="Prompt Quality Optimizer" language={language}>
            <PromptQualityOptimizer
              language={language}
              onTestInPlayground={handleTestInPlayground}
            />
          </ErrorBoundary>
        )}

        {/* REMIX EXPORT ENGINE TAB */}
        {activeTab === 'remix_export' && (
          <ErrorBoundary moduleName="Prompt Remix Exporter" language={language}>
            <PromptRemixExporter
              language={language}
              onTestInPlayground={handleTestInPlayground}
            />
          </ErrorBoundary>
        )}

        {/* THINKING PLAYGROUND TAB */}
        {activeTab === 'playground' && (
          <ErrorBoundary moduleName="Playground Arena" language={language}>
            <PlaygroundArena
              initialPrompt={playgroundInitialPrompt}
              language={language}
            />
          </ErrorBoundary>
        )}

        {/* BOT SIMULATOR TAB */}
        {activeTab === 'bot_simulator' && (
          <BotSimulator
            categories={INITIAL_CATEGORIES}
            prompts={allPrompts}
            onCopyPrompt={(text) => navigator.clipboard.writeText(text)}
            language={language}
          />
        )}

        {/* FAVORITES TAB */}
        {activeTab === 'favorites' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between p-6 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-lg">
              <div>
                <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <span>{isAr ? 'المفضلة المحفوظة' : 'My Saved Favorite Prompts'}</span>
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  {isAr ? 'جميع البرومبتات المحفوظة التي قمت بتفضيلها للوصول السريع.' : 'Quick access to your saved favorite prompts.'}
                </p>
              </div>
            </div>

            {favoritePromptsList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {favoritePromptsList.map((p) => {
                  const categoryInfo = INITIAL_CATEGORIES.find((c) => c.id === p.category_id);
                  return (
                    <PromptCard
                      key={p.id}
                      prompt={p}
                      categoryIcon={categoryInfo?.icon}
                      categoryName={isAr ? categoryInfo?.name_ar : categoryInfo?.name}
                      isFavorite={true}
                      onToggleFavorite={toggleFavorite}
                      onOpenDetail={setSelectedDetailPrompt}
                      onTestInPlayground={handleTestInPlayground}
                      language={language}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-zinc-900/50 rounded-3xl border border-zinc-800 space-y-3">
                <Heart className="w-12 h-12 mx-auto text-zinc-600" />
                <p className="text-sm font-mono text-zinc-400">
                  {isAr ? 'مفضلتك فارغة حالياً. أضف بعض البرومبتات للمفضلة لحفظها هنا.' : 'Your favorites list is currently empty.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* STATS TAB */}
        {activeTab === 'stats' && (
          <StatsView
            prompts={allPrompts}
            categories={INITIAL_CATEGORIES}
            favoritesCount={favorites.length}
            language={language}
          />
        )}

      </main>

      {/* Prompt Detail Modal */}
      <PromptDetailModal
        prompt={selectedDetailPrompt}
        onClose={() => setSelectedDetailPrompt(null)}
        isFavorite={selectedDetailPrompt ? favorites.includes(selectedDetailPrompt.id) : false}
        onToggleFavorite={toggleFavorite}
        onTestInPlayground={handleTestInPlayground}
        language={language}
      />
    </div>
  );
}
