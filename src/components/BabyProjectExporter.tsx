import React, { useState } from 'react';
import { Download, Send, Check, AlertCircle, Package, Loader2 } from 'lucide-react';
import { safeFetchJson } from '../lib/apiHelper';

interface BabyProjectExporterProps {
  language: 'ar' | 'en';
}

export const BabyProjectExporter: React.FC<BabyProjectExporterProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [chatIdInput, setChatIdInput] = useState('');
  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const defaultToken = "8772782487:AAGd_l7OqlR9XbkpDBKUKAK_mNKv7es8tRM";

  const handleSendTelegram = async () => {
    setSending(true);
    setStatusMsg(null);

    try {
      const res = await safeFetchJson('/api/telegram/send-zip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botToken: defaultToken,
          chatId: chatIdInput.trim() || undefined
        })
      });

      const data = res.data || {};

      if (res.ok && data.success) {
        setStatusMsg({
          type: 'success',
          text: isAr
            ? '✅ تم إرسال ملف baby.zip بنجاح إلى التليجرام!'
            : '✅ baby.zip successfully sent to Telegram!'
        });
      } else {
        setStatusMsg({
          type: 'error',
          text: data.error || res.error || (isAr ? 'لم يتم العثور على محادثة. يرجى إرسال /start للبوت أولاً.' : 'Failed to send. Please send /start to bot first.')
        });
      }
    } catch (e: any) {
      setStatusMsg({
        type: 'error',
        text: e.message || (isAr ? 'حدث خطأ أثناء الاتصال بالنظام.' : 'Error sending file.')
      });
    } finally {
      setSending(false);
    }
  };

  const handleDirectDownload = () => {
    window.location.href = '/api/download/baby.zip';
  };

  return (
    <div className="bg-[var(--bg-surface)] border-2 border-[var(--accent-primary)]/40 rounded-3xl p-5 shadow-2xl space-y-4 animate-fadeIn my-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-glow)] rounded-full filter blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent-glow)] border border-[var(--accent-primary)]/40 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6 text-[var(--accent-primary)]" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
              📦 {isAr ? 'حزمة المشروع المضغوطة (baby.zip)' : 'Compressed Project Package (baby.zip)'}
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              {isAr
                ? 'تحتوي الحزمة على كامل أكواد المشروع وملفات المصدر جاهزة للتحميل أو الإرسال للتليجرام.'
                : 'Contains complete project codebase ready for instant download or Telegram delivery.'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleDirectDownload}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[var(--accent-primary)] text-[var(--bg-base)] hover:opacity-90 font-bold text-xs shadow-lg transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isAr ? 'تحميل baby.zip مباشرة' : 'Download baby.zip'}</span>
          </button>
        </div>
      </div>

      {/* Telegram Input & Action */}
      <div className="pt-3 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        <div className="sm:col-span-2 flex items-center gap-2">
          <input
            type="text"
            value={chatIdInput}
            onChange={(e) => setChatIdInput(e.target.value)}
            placeholder={isAr ? 'رقم Chat ID (اختياري - سيتم اكتشافه تلقائياً عند إرسال /start للبوت)' : 'Chat ID (Optional - auto-detected if you messaged bot)'}
            className="w-full bg-[var(--input-bg)] border border-[var(--border)] focus:border-[var(--accent-primary)] rounded-xl px-3.5 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 focus:outline-none font-mono"
          />
        </div>

        <button
          onClick={handleSendTelegram}
          disabled={sending}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--accent-glow)] border border-[var(--border)] hover:border-[var(--accent-primary)]/50 text-[var(--text-primary)] text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
        >
          {sending ? (
            <Loader2 className="w-4 h-4 animate-spin text-[var(--accent-primary)]" />
          ) : (
            <Send className="w-4 h-4 text-[var(--accent-primary)]" />
          )}
          <span>{isAr ? 'إرسال للبوت بالتليجرام' : 'Send to Telegram Bot'}</span>
        </button>
      </div>

      {statusMsg && (
        <div
          className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 ${
            statusMsg.type === 'success'
              ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400'
              : 'bg-rose-500/15 border border-rose-500/40 text-rose-400'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <Check className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}
    </div>
  );
};
