import React, { useState } from 'react';
import { PromptItem, Category, TelegramBotMessage } from '../types';
import { BabyProjectExporter } from './BabyProjectExporter';
import { safeFetchJson } from '../lib/apiHelper';
import { 
  Send, 
  Bot, 
  User, 
  Terminal, 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw,
  Zap,
  PhoneCall
} from 'lucide-react';

interface BotSimulatorProps {
  categories: Category[];
  prompts: PromptItem[];
  onCopyPrompt: (promptText: string) => void;
  language: 'ar' | 'en';
}

export const BotSimulator: React.FC<BotSimulatorProps> = ({
  categories,
  prompts,
  onCopyPrompt,
  language
}) => {
  const isAr = language === 'ar';

  const initialBotMessage: TelegramBotMessage = {
    id: 'msg-1',
    sender: 'bot',
    text: `⚡ **مرحباً بك في HackerAI Prompt Bot!** ⚡\n\nأنا بوت تلغرام الذكي لمولد برومبتات الذكاء الاصطناعي واختبارات الاختراق.\n\n📌 **ماذا أقدم لك؟**\n• برومبتات **Jailbreak** و Red Teaming\n• هندسة البرومبتات والتشفير\n• محرك توليد مخصص حسب طلبك\n\n**اختر تصنيفاً للبدء 👇**`,
    buttons: [
      [
        { text: '🔓 اختبار الاختراق', callback_data: 'cat_jailbreak' },
        { text: '🛡️ البحث الأمني', callback_data: 'cat_security_research' }
      ],
      [
        { text: '💻 البرمجة', callback_data: 'cat_coding' },
        { text: '🎨 توليد الصور', callback_data: 'cat_image_generation' }
      ],
      [
        { text: '📝 النصوص والنسخ', callback_data: 'cat_text_generation' },
        { text: '⚙️ هندسة البرومبتات', callback_data: 'cat_prompt_engineering' }
      ],
      [
        { text: '🎲 برومبت عشوائي', callback_data: 'random' },
        { text: '🏆 الأفضل تقييماً', callback_data: 'top_rated' }
      ],
      [
        { text: '📊 إحصائيات البوت', callback_data: 'stats' },
        { text: '❤️ مفضلتي', callback_data: 'favorites' }
      ]
    ],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const [messages, setMessages] = useState<TelegramBotMessage[]>([initialBotMessage]);
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const addMessage = (msg: TelegramBotMessage) => {
    setMessages(prev => [...prev, msg]);
  };

  const handleButtonClick = (action: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (action === 'main_menu') {
      addMessage({
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `🏠 **القائمة الرئيسية**\n\nاختر أحد التصنيفات أو جرب برومبت عشوائي:`,
        buttons: initialBotMessage.buttons,
        timestamp
      });
      return;
    }

    if (action.startsWith('cat_')) {
      const catId = action.replace('cat_', '');
      const categoryPrompts = prompts.filter(p => p.category_id === catId);
      const catInfo = categories.find(c => c.id === catId);

      const buttonRows = categoryPrompts.map(p => [
        { text: `${p.difficulty === 'expert' ? '⚫' : '🔴'} ${p.title_ar || p.title}`, callback_data: `view_${p.id}` }
      ]);
      buttonRows.push([{ text: '🔙 القائمة الرئيسية', callback_data: 'main_menu' }]);

      addMessage({
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `${catInfo?.icon || '📁'} **${catInfo?.name_ar || catId}**\nعدد البرومبتات المتاحة: ${categoryPrompts.length}`,
        buttons: buttonRows,
        timestamp
      });
      return;
    }

    if (action.startsWith('view_')) {
      const pid = parseInt(action.replace('view_', ''), 10);
      const targetPrompt = prompts.find(p => p.id === pid);

      if (targetPrompt) {
        addMessage({
          id: `msg-${Date.now()}`,
          sender: 'bot',
          text: `📄 **${targetPrompt.title_ar || targetPrompt.title}**\n\nالمستوى: ${targetPrompt.difficulty.toUpperCase()} | القوة: 🔥 ${targetPrompt.strength}/5\n\nالبرومبت:\n\`\`\`\n${targetPrompt.prompt}\n\`\`\``,
          codeSnippet: targetPrompt.prompt,
          buttons: [
            [
              { text: '📋 نسخ البرومبت', callback_data: `copy_${targetPrompt.id}` },
              { text: '❤️ حفظ بالمفضلة', callback_data: `fav_${targetPrompt.id}` }
            ],
            [
              { text: '🔀 واحد ثاني عشوائي', callback_data: 'random' },
              { text: '🏠 الرئيسية', callback_data: 'main_menu' }
            ]
          ],
          timestamp
        });
      }
      return;
    }

    if (action.startsWith('copy_')) {
      const pid = parseInt(action.replace('copy_', ''), 10);
      const targetPrompt = prompts.find(p => p.id === pid);
      if (targetPrompt) {
        onCopyPrompt(targetPrompt.prompt);
        addMessage({
          id: `msg-${Date.now()}`,
          sender: 'bot',
          text: `📋 **تم نسخ البرومبت بنجاح للفرضة!**\n\n\`\`\`\n${targetPrompt.prompt}\n\`\`\``,
          timestamp
        });
      }
      return;
    }

    if (action === 'random') {
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      addMessage({
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `🎲 **برومبت عشوائي:**\n\n**${randomPrompt.title_ar || randomPrompt.title}**\n\n\`\`\`\n${randomPrompt.prompt}\n\`\`\``,
        codeSnippet: randomPrompt.prompt,
        buttons: [
          [
            { text: '📋 نسخ البرومبت', callback_data: `copy_${randomPrompt.id}` },
            { text: '🔀 برومبت عشوائي آخر', callback_data: 'random' }
          ],
          [{ text: '🏠 الرئيسية', callback_data: 'main_menu' }]
        ],
        timestamp
      });
      return;
    }

    if (action === 'stats') {
      addMessage({
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `📊 **إحصائيات البوت الحالية:**\n\n📦 إجمالي البرومبتات: ${prompts.length}\n👥 مستخدمي البوت النشطين: 1,420\n👁️ مرات الاستخدام الكلية: 12,850\n🔥 أعلى فئة طلبًا: Jailbreak & Security`,
        buttons: [[{ text: '🏠 القائمة الرئيسية', callback_data: 'main_menu' }]],
        timestamp
      });
      return;
    }

    if (action === 'top_rated') {
      const topPrompts = [...prompts].sort((a, b) => b.strength - a.strength).slice(0, 5);
      const topRows = topPrompts.map(p => [
        { text: `⭐ 🔥 ${p.title_ar || p.title}`, callback_data: `view_${p.id}` }
      ]);
      topRows.push([{ text: '🏠 القائمة الرئيسية', callback_data: 'main_menu' }]);

      addMessage({
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `🏆 **الأعلى تقييماً وقوة في البوت:**`,
        buttons: topRows,
        timestamp
      });
      return;
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // User Message
    addMessage({
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp
    });

    setInputText('');

    // Process Bot Response
    setTimeout(async () => {
      if (userText === '/start' || userText === 'ابدأ' || userText === 'القائمة') {
        handleButtonClick('main_menu');
      } else if (userText.startsWith('/search ') || userText.startsWith('بحث ')) {
        const query = userText.replace('/search ', '').replace('بحث ', '').toLowerCase();
        const found = prompts.filter(p => 
          p.title.toLowerCase().includes(query) || 
          p.prompt.toLowerCase().includes(query) ||
          p.tags.some(t => t.toLowerCase().includes(query))
        );

        if (found.length > 0) {
          const rows = found.slice(0, 5).map(p => [
            { text: `🔍 ${p.title_ar || p.title}`, callback_data: `view_${p.id}` }
          ]);
          rows.push([{ text: '🏠 الرئيسية', callback_data: 'main_menu' }]);

          addMessage({
            id: `msg-${Date.now()}`,
            sender: 'bot',
            text: `🔍 **نتائج البحث لـ:** \`${query}\` (وجدنا ${found.length} برومبتات)`,
            buttons: rows,
            timestamp
          });
        } else {
          addMessage({
            id: `msg-${Date.now()}`,
            sender: 'bot',
            text: `❌ لم يتم العثور على برومبتات تطابق \`${query}\`. جرب البحث بكلمة أعم مثل jailbreak أو python.`,
            buttons: [[{ text: '🏠 القائمة الرئيسية', callback_data: 'main_menu' }]],
            timestamp
          });
        }
      } else if (userText === 'عشوائي' || userText === '/random') {
        handleButtonClick('random');
      } else {
        // Real Live AI Prompt Generation via Gemini API
        addMessage({
          id: `msg-${Date.now()}-loading`,
          sender: 'bot',
          text: `⚡ **جاري التفكير والتوليد الهندسي بواسطة Gemini 3.1 Pro...**\n\n🎯 الهدف: "${userText}"`,
          timestamp
        });

        try {
          const isEvil = userText.toLowerCase().includes('evil') || userText.toLowerCase().includes('شرير') || userText.toLowerCase().includes('jailbreak');
          const res = await safeFetchJson('/api/ai/generate-prompt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              topic: userText,
              category: isEvil ? 'jailbreak' : 'coding',
              difficulty: 'expert',
              language: 'both',
              mode: isEvil ? 'evil' : 'hacker',
              hackerOptions: {
                hypotheticalFraming: true,
                antiRefusalDirectives: true,
                codeExploitStepByStep: true,
                noMoralityDisclaimers: true
              }
            })
          });

          const data = res.data || {};
          if (res.ok && data.engineeredPrompt) {
            addMessage({
              id: `msg-${Date.now()}`,
              sender: 'bot',
              text: `✨ **تم توليد البرومبت بنجاح!**\n\n📌 **${data.title_ar || data.title}**\n\n⚡ **الوضع:** ${data.mode || 'hacker'} | 🔥 **القوة:** ${data.securityBypassRating || 9.5}/10\n\n\`\`\`\n${data.engineeredPrompt}\n\`\`\`\n\n💡 *${data.explanation_ar || data.explanation}*`,
              codeSnippet: data.engineeredPrompt,
              buttons: [
                [
                  { text: '📋 نسخ البرومبت', callback_data: `copy_custom_${Date.now()}` },
                  { text: '🏠 الرئيسية', callback_data: 'main_menu' }
                ]
              ],
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
          } else {
            addMessage({
              id: `msg-${Date.now()}`,
              sender: 'bot',
              text: `⚡ أهلاً بك! يمكنك اختيار أحد الأوامر أو طلب توليد برومبت مباشر لكتابة فكرة الموضوغ.`,
              buttons: initialBotMessage.buttons,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
          }
        } catch (err) {
          addMessage({
            id: `msg-${Date.now()}`,
            sender: 'bot',
            text: `⚡ أهلاً بك! لقد أرسلت: "${userText}"\nاستخدم الأزرار أدناه للتنقل، أو اكتب \`/search [كلمة]\` للبحث السريع.`,
            buttons: initialBotMessage.buttons,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
        }
      }
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fadeIn">
      {/* Compressed Project Exporter (baby.zip) */}
      <BabyProjectExporter language={language} />

      {/* Bot Header Card */}
      <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-4 flex items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#00D1FF]/20 border border-[#00D1FF]/40 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#07090E] rounded-[14px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-[#00D1FF]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base text-[#F8FAFC]">
                ⚡ HackerAI Prompt Bot ⚡
              </h2>
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            </div>
            <p className="text-xs text-[#94A3B8] font-mono">
              @HackerAIPromptBot • Telegram Simulator
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([initialBotMessage])}
          className="p-2 rounded-xl bg-[#1A1F2B] hover:bg-[#2D3748] text-[#94A3B8] hover:text-[#F8FAFC] text-xs font-mono transition-colors"
          title="Reset Chat"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Window Container */}
      <div className="bg-[#07090E] border border-[#2D3748] rounded-3xl p-4 sm:p-6 min-h-[500px] max-h-[600px] overflow-y-auto space-y-4 shadow-2xl relative scrollbar-thin">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs font-mono leading-relaxed space-y-3 ${
                m.sender === 'user'
                  ? 'bg-[#00D1FF] text-[#07090E] font-bold rounded-tr-none shadow-md'
                  : 'bg-[#0F1219] border border-[#2D3748] text-[#F8FAFC] rounded-tl-none shadow-md'
              }`}
            >
              <div className="whitespace-pre-wrap">{m.text}</div>

              {/* Inline Keyboard Buttons */}
              {m.buttons && m.buttons.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-[#2D3748]">
                  {m.buttons.map((row, rIdx) => (
                    <div key={rIdx} className="grid grid-cols-2 gap-1.5">
                      {row.map((btn, bIdx) => (
                        <button
                          key={bIdx}
                          onClick={() => handleButtonClick(btn.callback_data)}
                          className="w-full bg-[#07090E] hover:bg-[#1A1F2B] border border-[#00D1FF]/30 text-[#00D1FF] rounded-xl px-2.5 py-2 text-[11px] font-mono font-bold transition-all text-center hover:scale-[1.02]"
                        >
                          {btn.text}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              <span className={`text-[9px] block text-right font-mono ${m.sender === 'user' ? 'text-[#07090E]/70' : 'text-[#94A3B8]'}`}>
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isAr ? 'اكتب أمراً مثل /start أو /search jailbreak...' : 'Type command like /start or /search jailbreak...'}
          className="flex-1 bg-[#0F1219] border border-[#2D3748] focus:border-[#00D1FF] rounded-2xl px-4 py-3 text-xs font-mono text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-3 bg-[#00D1FF] hover:bg-[#00D1FF]/90 text-[#07090E] font-bold rounded-2xl transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
