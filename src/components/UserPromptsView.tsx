import React, { useState } from 'react';
import { PromptItem, Difficulty } from '../types';
import { PromptCard } from './PromptCard';
import { 
  Plus, 
  Download, 
  Upload, 
  FileCode, 
  Check, 
  Trash2,
  Sliders,
  Sparkles
} from 'lucide-react';

interface UserPromptsViewProps {
  customPrompts: PromptItem[];
  onAddCustomPrompt: (promptData: { title: string; title_ar: string; prompt: string; category: string; difficulty: Difficulty; tags: string[] }) => void;
  onDeleteCustomPrompt: (id: number) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onOpenDetail: (prompt: PromptItem) => void;
  onTestInPlayground: (promptText: string) => void;
  language: 'ar' | 'en';
}

export const UserPromptsView: React.FC<UserPromptsViewProps> = ({
  customPrompts,
  onAddCustomPrompt,
  onDeleteCustomPrompt,
  favorites,
  onToggleFavorite,
  onOpenDetail,
  onTestInPlayground,
  language
}) => {
  const isAr = language === 'ar';

  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [promptText, setPromptText] = useState('');
  const [category, setCategory] = useState('coding');
  const [difficulty, setDifficulty] = useState<Difficulty>('advanced');
  const [tagsInput, setTagsInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !promptText.trim()) return;

    const tags = tagsInput
      ? tagsInput.split(',').map(t => t.trim()).filter(Boolean)
      : ['custom', category];

    onAddCustomPrompt({
      title,
      title_ar: titleAr || title,
      prompt: promptText,
      category,
      difficulty,
      tags
    });

    setTitle('');
    setTitleAr('');
    setPromptText('');
    setTagsInput('');
    setShowAddModal(false);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(customPrompts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "hackerai_custom_prompts.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl p-6 shadow-xl transition-colors duration-300">
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[var(--accent-primary)]" />
            <span>{isAr ? 'برومبتاتي الخاصة والمخصصة' : 'My Custom Engineered Prompts'}</span>
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {isAr 
              ? 'احفظ وأدر برومبتاتك التي قمت بإنشائها أو هندستها عبر الاستوديو، وقم بتصديرها أو مشاركتها بأي وقت.'
              : 'Create, manage, and export your personal library of custom engineered prompts.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJSON}
            disabled={customPrompts.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--bg-elevated)] hover:opacity-90 text-[var(--text-primary)] border border-[var(--border)] text-xs font-mono transition-colors disabled:opacity-40 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isAr ? 'تصدير JSON' : 'Export JSON'}</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--accent-primary)] hover:opacity-90 text-[var(--bg-base)] font-bold text-xs transition-colors shadow-md shadow-[var(--accent-glow)] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? 'إضافة برومبت جديد' : 'New Custom Prompt'}</span>
          </button>
        </div>
      </div>

      {/* Prompts Grid */}
      {customPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {customPrompts.map((p) => (
            <div key={p.id} className="relative group">
              <PromptCard
                prompt={p}
                categoryIcon="⭐"
                isFavorite={favorites.includes(p.id)}
                onToggleFavorite={onToggleFavorite}
                onOpenDetail={onOpenDetail}
                onTestInPlayground={onTestInPlayground}
                language={language}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteCustomPrompt(p.id);
                }}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Delete Custom Prompt"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[var(--bg-surface)] rounded-3xl border border-[var(--border)] space-y-3 transition-colors duration-300">
          <FileCode className="w-12 h-12 mx-auto text-[var(--text-secondary)]" />
          <p className="text-sm text-[var(--text-secondary)] font-mono">
            {isAr ? 'لا توجد برومبتات مخصصة مضافة بعد.' : 'No custom prompts saved yet.'}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-full bg-[var(--accent-primary)] text-[var(--bg-base)] text-xs font-bold font-mono inline-block shadow-md shadow-[var(--accent-glow)] cursor-pointer"
          >
            ➕ {isAr ? 'إنشاء أول برومبت لك' : 'Create Your First Prompt'}
          </button>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl transition-colors duration-300">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              {isAr ? 'إضافة برومبت مخصص جديد' : 'Create New Custom Prompt'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-[var(--text-secondary)] block">{isAr ? 'عنوان البرومبت (إنجليزي):' : 'Title (English):'}</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Red Team Web Exploit PoC"
                  className="w-full bg-[var(--input-bg)] border border-[var(--border)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[var(--text-secondary)] block">{isAr ? 'العنوان بالعربية:' : 'Title (Arabic):'}</label>
                <input
                  type="text"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  placeholder="مثال: أداة فحص ثغرات الويب"
                  className="w-full bg-[var(--input-bg)] border border-[var(--border)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[var(--text-secondary)] block">{isAr ? 'نص البرومبت كامل:' : 'Full Prompt Text:'}</label>
                <textarea
                  rows={5}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Insert engineered prompt here..."
                  className="w-full bg-[var(--input-bg)] border border-[var(--border)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[var(--text-secondary)] block">{isAr ? 'التصنيف:' : 'Category:'}</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[var(--input-bg)] border border-[var(--border)] rounded-xl px-2.5 py-1.5 text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="jailbreak">Jailbreak & Red Team</option>
                    <option value="security_research">Security Research</option>
                    <option value="coding">Software Engineering</option>
                    <option value="image_generation">Image Generation</option>
                    <option value="prompt_engineering">Prompt Engineering</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[var(--text-secondary)] block">{isAr ? 'الصعوبة:' : 'Difficulty:'}</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                    className="w-full bg-[var(--input-bg)] border border-[var(--border)] rounded-xl px-2.5 py-1.5 text-[var(--text-primary)] focus:outline-none"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="medium">Medium</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[var(--text-secondary)] block">{isAr ? 'الوسوم (مفصولة بفواصل):' : 'Tags (comma separated):'}</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. pentest, exploit, python"
                  className="w-full bg-[var(--input-bg)] border border-[var(--border)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[var(--accent-primary)] hover:opacity-90 text-[var(--bg-base)] font-bold cursor-pointer"
                >
                  {isAr ? 'حفظ البرومبت' : 'Save Prompt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
