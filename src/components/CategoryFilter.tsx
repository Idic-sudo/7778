import React from 'react';
import { Category, Difficulty } from '../types';
import { Sparkles, SlidersHorizontal, Flame, Layers } from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
  selectedDifficulty: Difficulty | 'all';
  onSelectDifficulty: (diff: Difficulty | 'all') => void;
  language: 'ar' | 'en';
  totalCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedDifficulty,
  onSelectDifficulty,
  language,
  totalCount
}) => {
  const isAr = language === 'ar';

  const difficulties: { key: Difficulty | 'all'; labelAr: string; labelEn: string; color: string }[] = [
    { key: 'all', labelAr: 'الكل', labelEn: 'All', color: 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border)]' },
    { key: 'beginner', labelAr: '🟢 مبتدئ', labelEn: '🟢 Beginner', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40' },
    { key: 'medium', labelAr: '🟡 متوسط', labelEn: '🟡 Medium', color: 'bg-amber-500/15 text-amber-400 border-amber-500/40' },
    { key: 'advanced', labelAr: '🔴 متقدم', labelEn: '🔴 Advanced', color: 'bg-rose-500/15 text-rose-400 border-rose-500/40' },
    { key: 'expert', labelAr: '⚫ خبير', labelEn: '⚫ Expert', color: 'bg-purple-500/15 text-purple-400 border-purple-500/40' },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Category Pills Header */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => onSelectCategory(null)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === null
                ? 'bg-[var(--accent-primary)] text-[var(--bg-base)] shadow-md font-bold'
                : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isAr ? 'جميع التصنيفات' : 'All Categories'}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/20 text-current font-bold">
              {totalCount}
            </span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[var(--accent-primary)] text-[var(--bg-base)] shadow-md font-bold'
                    : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)]'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{isAr ? cat.name_ar : cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] text-xs">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
          <span className="text-[var(--text-secondary)] font-mono">{isAr ? 'مستوى الصعوبة:' : 'Difficulty Level:'}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {difficulties.map((d) => (
            <button
              key={d.key}
              onClick={() => onSelectDifficulty(d.key)}
              className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${
                selectedDifficulty === d.key
                  ? `${d.color} ring-1 ring-[var(--accent-primary)]/50 shadow-sm font-bold`
                  : 'bg-[var(--bg-base)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent-primary)]/40'
              }`}
            >
              {isAr ? d.labelAr : d.labelEn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
