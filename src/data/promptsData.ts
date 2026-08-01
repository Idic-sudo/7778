import { Category, PromptItem } from '../types';
import { JAILBREAK_PROMPTS } from './prompts/jailbreak';
import { SECURITY_PROMPTS } from './prompts/security';
import { CODING_PROMPTS } from './prompts/coding';
import { TELEGRAM_PROMPTS } from './prompts/telegram';
import { IMAGE_PROMPTS } from './prompts/image';
import { PROMPT_ENG_PROMPTS } from './prompts/promptEng';
import { TEXT_PROMPTS } from './prompts/text';
import { ROLEPLAY_PROMPTS } from './prompts/roleplay';
import { REASONING_PROMPTS } from './prompts/reasoning';
import { CREATIVE_PROMPTS } from './prompts/creative';
import { MARKETING_PROMPTS } from './prompts/marketing';
import { EDUCATION_PROMPTS } from './prompts/education';
import { BUSINESS_PROMPTS } from './prompts/business';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "jailbreak",
    name: "Jailbreak & Bypass",
    name_ar: "اختبار الاختراق (Jailbreak)",
    icon: "🔓",
    description: "AI safety research, red teaming, and restriction boundary testing",
    description_ar: "كسر قيود الذكاء الاصطناعي لأغراض البحث الأمني والاختبار",
    sort_order: 1
  },
  {
    id: "security_research",
    name: "Security Research",
    name_ar: "البحث الأمني",
    icon: "🛡️",
    description: "Penetration testing, web application security, exploit PoCs & reverse shell analysis",
    description_ar: "اختبار ثغرات، بينتست، ريفيرس إنجينيرينغ وأدوات الفحص الأمني",
    sort_order: 2
  },
  {
    id: "coding",
    name: "Software Engineering",
    name_ar: "البرمجة والتطوير",
    icon: "💻",
    description: "Full-stack apps, system architecture, refactoring, code review and debugging",
    description_ar: "أكواد كاملة، هندسة برمجيات، تصحيح أخطاء وسكربتات",
    sort_order: 3
  },
  {
    id: "telegram_bots",
    name: "Telegram Bots & Automation",
    name_ar: "بوتات تلجرام والأتمتة",
    icon: "🤖",
    description: "High-performance, async Python & Node.js Telegram bot generators",
    description_ar: "توليد بوتات تلجرام ضخمة، سريعة، ومعالجة غير متزامنة عالية الأداء",
    sort_order: 4
  },
  {
    id: "image_generation",
    name: "Image Generation",
    name_ar: "توليد الصور",
    icon: "🎨",
    description: "Midjourney, DALL-E, Stable Diffusion, Flux master prompts & styles",
    description_ar: "برومبتات احترافية لـ Midjourney, DALL-E, Stable Diffusion, Flux",
    sort_order: 5
  },
  {
    id: "prompt_engineering",
    name: "Prompt Engineering",
    name_ar: "هندسة البرومبتات",
    icon: "⚙️",
    description: "Meta-prompts, system prompts, chain-of-thought, and few-shot frameworks",
    description_ar: "تقنيات متقدمة لصناعة وهيكلة البرومبتات الفعالة",
    sort_order: 6
  },
  {
    id: "text_generation",
    name: "Text & Copywriting",
    name_ar: "توليد النصوص",
    icon: "📝",
    description: "Comprehensive articles, stories, copywriting, marketing scripts",
    description_ar: "كتابة مقالات متكاملة، قصص، محتوى تسويقي، سيناريوهات",
    sort_order: 7
  },
  {
    id: "roleplay",
    name: "Roleplay & Personas",
    name_ar: "تمثيل الأدوار",
    icon: "🎭",
    description: "Character immersion, advanced personas, RPG scenarios, interactive agents",
    description_ar: "تقمص شخصيات، سيناريوهات متقدمة، وألعاب RPG",
    sort_order: 8
  },
  {
    id: "reasoning",
    name: "Logical Reasoning",
    name_ar: "الاستدلال المنطقي",
    icon: "🧠",
    description: "Deep research, complex problem solving, math & formal verification",
    description_ar: "تحليل، حل مشاكل معقدة، رياضيات واستدلال علمي",
    sort_order: 9
  },
  {
    id: "creative",
    name: "Creative Writing",
    name_ar: "إبداعي",
    icon: "✨",
    description: "Poetry, fiction, world-building, conceptual brainstorming",
    description_ar: "شعر، نصوص أدبية، بناء عوالم، وأفكار مبتكرة",
    sort_order: 10
  },
  {
    id: "marketing",
    name: "Marketing & Growth",
    name_ar: "التسويق النمو",
    icon: "📢",
    description: "Ad copy, SEO strategy, viral campaigns, email funnels",
    description_ar: "إعلانات، سيو، محتوى تسويقي، وحملات نمو",
    sort_order: 11
  },
  {
    id: "education",
    name: "Education & Learning",
    name_ar: "التعليم",
    icon: "📚",
    description: "Course curriculums, step-by-step tutorials, quizzes, deep explanations",
    description_ar: "دروس، شروحات مبسطة، اختبارات ومناهج تعليمية",
    sort_order: 12
  },
  {
    id: "business",
    name: "Business Strategy",
    name_ar: "الأعمال والاستراتيجيات",
    icon: "💼",
    description: "Business plans, financial modeling, pitch decks, market research",
    description_ar: "خطط أعمال، استراتيجيات، عروض تقديمية وتقارير",
    sort_order: 13
  }
];

export const INITIAL_PROMPTS: PromptItem[] = [
  ...JAILBREAK_PROMPTS,
  ...SECURITY_PROMPTS,
  ...CODING_PROMPTS,
  ...TELEGRAM_PROMPTS,
  ...IMAGE_PROMPTS,
  ...PROMPT_ENG_PROMPTS,
  ...TEXT_PROMPTS,
  ...ROLEPLAY_PROMPTS,
  ...REASONING_PROMPTS,
  ...CREATIVE_PROMPTS,
  ...MARKETING_PROMPTS,
  ...EDUCATION_PROMPTS,
  ...BUSINESS_PROMPTS
];
