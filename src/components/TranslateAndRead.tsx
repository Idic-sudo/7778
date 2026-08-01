import React, { useState, useEffect } from 'react';
import { Languages, Volume2, VolumeX, Loader2, Play, Square, Check, RefreshCw } from 'lucide-react';

interface TranslateAndReadProps {
  text: string;
  language: 'ar' | 'en';
  className?: string;
  size?: 'sm' | 'md';
}

export const TranslateAndRead: React.FC<TranslateAndReadProps> = ({
  text,
  language,
  className = '',
  size = 'sm'
}) => {
  const isAr = language === 'ar';
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [speechLang, setSpeechLang] = useState<'en' | 'ar'>('en');

  // Stop speaking if component unmounts
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleTranslate = async () => {
    if (translatedText) {
      setShowTranslation(!showTranslation);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!response.ok) throw new Error('Translation failed');
      const data = await response.json();
      setTranslatedText(data.translatedText);
      setShowTranslation(true);
      setSpeechLang('ar'); // Default speech to Arabic once translated
    } catch (err) {
      console.error('Failed to translate:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = () => {
    if (!window.speechSynthesis) {
      alert(isAr ? 'عذراً، متصفحك لا يدعم ميزة قراءة النصوص صوتياً.' : 'Sorry, your browser does not support text-to-speech.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = speechLang === 'ar' && translatedText ? translatedText : text;
    // Strip markdown formatting and XML tags for better TTS quality
    const cleanText = textToSpeak
      .replace(/<[^>]*>/g, '') // strip XML tags
      .replace(/[*#`_\-]/g, '') // strip common markdown
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = speechLang === 'ar' ? 'ar-SA' : 'en-US';
    
    // Choose voice based on language
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => 
      speechLang === 'ar' 
        ? v.lang.startsWith('ar') 
        : v.lang.startsWith('en')
    );
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`inline-flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-1 bg-[#07090E]/80 backdrop-blur-sm p-1 rounded-xl border border-zinc-800/60 shadow-sm w-fit">
        {/* Translate button */}
        <button
          onClick={handleTranslate}
          disabled={loading}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
            showTranslation
              ? 'bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/30'
              : 'text-[#94A3B8] hover:text-[#00D1FF] hover:bg-zinc-800/40'
          }`}
          title={isAr ? 'ترجمة النص إلى العربية' : 'Translate to Arabic'}
        >
          {loading ? (
            <Loader2 className="w-3 h-3 animate-spin text-[#00D1FF]" />
          ) : (
            <Languages className="w-3 h-3" />
          )}
          <span>{isAr ? (showTranslation ? 'إخفاء الترجمة' : 'ترجم للعربية') : (showTranslation ? 'Hide Arabic' : 'Translate')}</span>
        </button>

        {/* Separator line */}
        <span className="h-3 w-[1px] bg-zinc-800/60" />

        {/* Language selector for speech */}
        {translatedText && showTranslation && (
          <div className="flex items-center bg-[#0F1219] p-0.5 rounded-md border border-zinc-800/40">
            <button
              onClick={() => {
                setSpeechLang('en');
                if (isSpeaking) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
              }}
              className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all ${
                speechLang === 'en'
                  ? 'bg-zinc-800 text-[#00D1FF]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => {
                setSpeechLang('ar');
                if (isSpeaking) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
              }}
              className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all ${
                speechLang === 'ar'
                  ? 'bg-zinc-800 text-[#00D1FF]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              AR
            </button>
          </div>
        )}

        {/* Read aloud voice button */}
        <button
          onClick={handleSpeak}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
            isSpeaking
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 animate-pulse'
              : 'text-[#94A3B8] hover:text-emerald-400 hover:bg-zinc-800/40'
          }`}
          title={isAr ? 'قراءة النص بصوت مسموع' : 'Read text aloud'}
        >
          {isSpeaking ? (
            <>
              <Square className="w-3 h-3 text-red-400 fill-red-400" />
              <span>{isAr ? 'إيقاف' : 'Stop'}</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3 h-3" />
              <span>{isAr ? 'قراءة صوتية' : 'Speak'}</span>
            </>
          )}
        </button>
      </div>

      {/* Translation display card */}
      {showTranslation && translatedText && (
        <div className="p-3 bg-[#07090E] border border-[#00D1FF]/20 rounded-2xl animate-fadeIn space-y-2 text-right">
          <div className="flex items-center justify-between border-b border-zinc-800/40 pb-1.5">
            <span className="text-[9px] font-mono text-[#00D1FF] font-bold">✨ ترجمة فورية بالذكاء الاصطناعي</span>
            <span className="text-[8px] font-mono text-zinc-500">العربية</span>
          </div>
          <p className="text-xs text-[#E2E8F0] font-sans leading-relaxed whitespace-pre-wrap dir-rtl">
            {translatedText}
          </p>
        </div>
      )}
    </div>
  );
};
