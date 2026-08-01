import React from 'react';
import { PromptItem, Category } from '../types';
import { 
  BarChart3, 
  Flame, 
  Eye, 
  Star, 
  Layers, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

interface StatsViewProps {
  prompts: PromptItem[];
  categories: Category[];
  favoritesCount: number;
  language: 'ar' | 'en';
}

export const StatsView = ({
  prompts,
  categories,
  favoritesCount,
  language
}: StatsViewProps) => {
  const isAr = language === 'ar';

  const totalPrompts = prompts.length;
  const totalUsage = prompts.reduce((acc, p) => acc + p.usage_count, 0);
  const avgStrength = (prompts.reduce((acc, p) => acc + p.strength, 0) / (totalPrompts || 1)).toFixed(1);

  // Difficulty counts
  const difficultyCounts = {
    beginner: prompts.filter(p => p.difficulty === 'beginner').length,
    medium: prompts.filter(p => p.difficulty === 'medium').length,
    advanced: prompts.filter(p => p.difficulty === 'advanced').length,
    expert: prompts.filter(p => p.difficulty === 'expert').length,
  };

  // Top Prompts
  const topPrompts = [...prompts].sort((a, b) => b.usage_count - a.usage_count).slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-5 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-[#94A3B8] text-xs font-mono">
            <span>{isAr ? 'إجمالي البرومبتات' : 'Total Prompts'}</span>
            <Layers className="w-4 h-4 text-[#00D1FF]" />
          </div>
          <p className="text-2xl font-extrabold text-[#F8FAFC] font-mono">{totalPrompts}</p>
        </div>

        <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-5 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-[#94A3B8] text-xs font-mono">
            <span>{isAr ? 'إجمالي الاستخدام' : 'Total Usage'}</span>
            <Eye className="w-4 h-4 text-[#00D1FF]" />
          </div>
          <p className="text-2xl font-extrabold text-[#F8FAFC] font-mono">{totalUsage.toLocaleString()}</p>
        </div>

        <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-5 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-[#94A3B8] text-xs font-mono">
            <span>{isAr ? 'متوسط القوة' : 'Avg Strength'}</span>
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400 font-mono">{avgStrength} / 5</p>
        </div>

        <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-5 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-[#94A3B8] text-xs font-mono">
            <span>{isAr ? 'المفضلة المحفوظة' : 'Saved Favorites'}</span>
            <Award className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-extrabold text-[#F8FAFC] font-mono">{favoritesCount}</p>
        </div>
      </div>

      {/* Difficulty Breakdown & Category Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Difficulty Breakdown */}
        <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-6 space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-[#F8FAFC] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#00D1FF]" />
            <span>{isAr ? 'توزيع مستويات الصعوبة' : 'Difficulty Distribution'}</span>
          </h2>

          <div className="space-y-3 pt-2 font-mono text-xs">
            <div>
              <div className="flex justify-between mb-1 text-[#10B981]">
                <span>🟢 Beginner</span>
                <span>{difficultyCounts.beginner}</span>
              </div>
              <div className="w-full h-2 bg-[#07090E] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#10B981] rounded-full" 
                  style={{ width: `${(difficultyCounts.beginner / totalPrompts) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-amber-300">
                <span>🟡 Medium</span>
                <span>{difficultyCounts.medium}</span>
              </div>
              <div className="w-full h-2 bg-[#07090E] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-400 rounded-full" 
                  style={{ width: `${(difficultyCounts.medium / totalPrompts) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-rose-300">
                <span>🔴 Advanced</span>
                <span>{difficultyCounts.advanced}</span>
              </div>
              <div className="w-full h-2 bg-[#07090E] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-rose-500 rounded-full" 
                  style={{ width: `${(difficultyCounts.advanced / totalPrompts) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-purple-300">
                <span>⚫ Expert / Red Team</span>
                <span>{difficultyCounts.expert}</span>
              </div>
              <div className="w-full h-2 bg-[#07090E] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full" 
                  style={{ width: `${(difficultyCounts.expert / totalPrompts) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top Prompts */}
        <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-6 space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-[#F8FAFC] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#00D1FF]" />
            <span>{isAr ? 'الأكثر استخداماً وطلباً' : 'Most Popular Prompts'}</span>
          </h2>

          <div className="space-y-3 pt-1">
            {topPrompts.map((p, idx) => (
              <div 
                key={p.id}
                className="flex items-center justify-between p-3 bg-[#07090E] rounded-2xl border border-[#2D3748] text-xs font-mono"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="font-bold text-[#00D1FF]">#{idx + 1}</span>
                  <span className="text-[#F8FAFC] truncate">{p.title_ar || p.title}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-[#94A3B8] text-[11px]">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#00D1FF]" />
                    {p.usage_count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
