import React, { useState } from 'react';
import { PromptItem, Difficulty } from '../types';
import { TranslateAndRead } from './TranslateAndRead';
import { 
  Copy, 
  Check, 
  Heart, 
  Star, 
  Play, 
  Flame, 
  Eye, 
  Sparkles, 
  Sliders,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react';

interface PromptCardProps {
  prompt: PromptItem;
  categoryIcon?: string;
  categoryName?: string;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onOpenDetail: (prompt: PromptItem) => void;
  onTestInPlayground: (promptText: string) => void;
  language: 'ar' | 'en';
}

export const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  categoryIcon = '📁',
  categoryName,
  isFavorite,
  onToggleFavorite,
  onOpenDetail,
  onTestInPlayground,
  language
}) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isAr = language === 'ar';

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDifficultyBadge = (diff: Difficulty) => {
    switch (diff) {
      case 'beginner':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">🟢 Beginner</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">🟡 Medium</span>;
      case 'advanced':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">🔴 Advanced</span>;
      case 'expert':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">⚫ Expert</span>;
      default:
        return null;
    }
  };

  const displayTitle = isAr && prompt.title_ar ? prompt.title_ar : prompt.title;

  return (
    <div 
      onClick={() => onOpenDetail(prompt)}
      className="group bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[var(--accent-primary)]/50 rounded-2xl p-5 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[var(--accent-glow)] cursor-pointer flex flex-col justify-between relative overflow-hidden"
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--border)] opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">{categoryIcon}</span>
            {getDifficultyBadge(prompt.difficulty)}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Strength Flame */}
            <div className="flex items-center gap-0.5 text-amber-400 text-xs font-mono" title={`Prompt Strength: ${prompt.strength}/5`}>
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold">{prompt.strength}</span>
            </div>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(prompt.id);
              }}
              className={`p-1.5 rounded-lg border transition-all ${
                isFavorite
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  : 'bg-[var(--bg-base)] border-[var(--border)] text-[var(--text-secondary)] hover:text-rose-400 hover:border-rose-500/50'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-1 mb-2">
          {displayTitle}
        </h3>

        {/* Description or Tags */}
        {prompt.description && (
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3 leading-relaxed">
            {prompt.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          {prompt.tags.slice(0, 4).map((tag, i) => (
            <span 
              key={i} 
              className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[var(--bg-base)] text-[var(--text-secondary)] border border-[var(--border)]"
            >
              #{tag}
            </span>
          ))}
          {prompt.variables && prompt.variables.length > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--border)] flex items-center gap-1">
              <Sliders className="w-2.5 h-2.5" />
              {prompt.variables.length} {isAr ? 'متغيرات' : 'vars'}
            </span>
          )}
        </div>

        {/* Prompt Preview Snippet */}
        <div className="bg-[var(--bg-base)] rounded-xl p-3 border border-[var(--border)] text-xs font-mono text-[var(--text-primary)] relative group/code mb-4">
          <p className={`whitespace-pre-wrap leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
            {prompt.prompt}
          </p>
          {prompt.prompt.length > 150 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="mt-2 text-[10px] font-sans font-medium text-[var(--accent-primary)] hover:underline flex items-center gap-1"
            >
              {isExpanded ? (
                <>{isAr ? 'إخفاء التفاصيل' : 'Show Less'} <ChevronUp className="w-3 h-3" /></>
              ) : (
                <>{isAr ? 'عرض البرومبت الكامل' : 'Expand Prompt'} <ChevronDown className="w-3 h-3" /></>
              )}
            </button>
          )}
          
          {(isExpanded || prompt.prompt.length <= 150) && (
            <div className="mt-3 pt-2.5 border-t border-zinc-800/40" onClick={(e) => e.stopPropagation()}>
              <TranslateAndRead text={prompt.prompt} language={language} />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-[var(--border)] text-xs">
        <div className="flex items-center gap-3 text-[var(--text-secondary)] text-[11px] font-mono">
          <span className="flex items-center gap-1" title="Usage Count">
            <Eye className="w-3.5 h-3.5" />
            {prompt.usage_count}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Quick Regenerate Variant */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(prompt);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[var(--accent-glow)] border border-[var(--border)] text-[var(--accent-primary)] text-xs font-semibold transition-colors"
            title={isAr ? 'فتح وإعادة توليد صياغة جديدة' : 'Open and regenerate variant'}
          >
            <RefreshCw className="w-3 h-3" />
            <span>{isAr ? 'أعد التوليد' : 'Regenerate'}</span>
          </button>

          {/* Quick Copy */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--bg-elevated)] hover:opacity-90 text-[var(--text-primary)] border border-[var(--border)] text-xs font-medium transition-colors"
            title="Copy prompt to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">{isAr ? 'تم النسخ!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                <span>{isAr ? 'نسخ' : 'Copy'}</span>
              </>
            )}
          </button>

          {/* Test in Playground */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTestInPlayground(prompt.prompt);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-base)] text-xs font-semibold transition-colors shadow-sm"
            title="Test in Thinking Playground"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isAr ? 'تجربة' : 'Test'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
