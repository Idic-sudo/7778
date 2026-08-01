import { PromptItem } from '../../types';

export const TELEGRAM_PROMPTS: PromptItem[] = [
  {
    id: 61,
    category_id: "telegram_bots",
    title: "Ultra-Fast Async Telegram Bot (Aiogram 3.x)",
    title_ar: "بوت تلجرام عملاق وسريع لـ Aiogram 3.x",
    difficulty: "expert",
    strength: 5,
    usage_count: 3100,
    is_template: true,
    tags: ["telegram", "aiogram3", "python", "async", "redis"],
    variables: ["[BOT_PURPOSE]", "[MAIN_FEATURES]"],
    description: "Generates asynchronous Python Aiogram 3.x Telegram bot with FSM, Redis, and SQLAlchemy.",
    prompt: `Act as a Senior Telegram Bot Architect. Write a complete, asynchronous Python Telegram bot using Aiogram 3.x.
Purpose: [BOT_PURPOSE]
Features: [MAIN_FEATURES]
Include modular handlers, Redis storage, and inline keyboard builder.`
  },
  {
    id: 62,
    category_id: "telegram_bots",
    title: "Telegram WebApp & E-Commerce Store Bot (Telegraf Node.js)",
    title_ar: "متجر وبوت تلجرام مع واجهة تفاعلية WebApp",
    difficulty: "advanced",
    strength: 5,
    usage_count: 2450,
    is_template: true,
    tags: ["telegram", "telegraf", "webapp", "nodejs"],
    variables: ["[STORE_NAME]", "[PAYMENT_GATEWAY]"],
    description: "Builds a full-stack Telegram Mini-App store with Node.js backend and interactive web UI.",
    prompt: `Create a Telegram WebApp Store bot for [STORE_NAME] using Telegraf & Express.
Include catalog view, shopping cart state, and [PAYMENT_GATEWAY] integration.`
  },
  {
    id: 63,
    category_id: "telegram_bots",
    title: "High-Throughput Group Moderation & Captcha Bot",
    title_ar: "بوت حماية وإدارة القنوات والمجموعات مع الكابتشا",
    difficulty: "expert",
    strength: 5,
    usage_count: 2200,
    is_template: true,
    tags: ["telegram", "captcha", "security", "anti-spam"],
    variables: ["[CAPTCHA_TYPE]", "[RESTRICTION_RULES]"],
    description: "Moderation bot handling thousands of group joins with captcha verification and link filtering.",
    prompt: `Design a high-speed group moderation Telegram bot in Python.
Features:
- [CAPTCHA_TYPE] join verification
- Anti-link enforcement based on: [RESTRICTION_RULES]
- Warning counter and auto-mute logic`
  },
  {
    id: 64,
    category_id: "telegram_bots",
    title: "Telegram AI Chatbot Agent with Gemini 3.1 & Context Memory",
    title_ar: "بوت ذكاء اصطناعي للرد الآلي وحفظ المحادثات (Gemini)",
    difficulty: "advanced",
    strength: 5,
    usage_count: 2890,
    is_template: true,
    tags: ["telegram", "ai", "gemini", "voice-transcription"],
    variables: ["[AI_ROLE]", "[MAX_HISTORY_MESSAGES]"],
    description: "Integrates Gemini API with Telegram bot for voice message transcription and context-aware chat.",
    prompt: `Build an AI assistant Telegram bot in Python connected to Google Gemini API.
Role: [AI_ROLE]
Include context memory up to [MAX_HISTORY_MESSAGES] messages, voice note transcription, and photo analysis.`
  },
  {
    id: 65,
    category_id: "telegram_bots",
    title: "Automated Crypto Signals & VIP Channel Management Bot",
    title_ar: "بوت إدارة اشتراكات قنوات توصيات الكريبتو VIP",
    difficulty: "expert",
    strength: 5,
    usage_count: 1890,
    is_template: true,
    tags: ["telegram", "crypto", "vip-channel", "payments"],
    variables: ["[CRYPTO_GATEWAY]", "[VIP_PRICING]"],
    description: "Automates VIP channel invite links, crypto payment verification (NOWPayments/TRON), and auto-kick on expired subscription.",
    prompt: `Build a Telegram VIP subscription bot using [CRYPTO_GATEWAY].
Features:
- Generate unique single-use invite links upon payment confirmation
- Automatic daily check cron job kicking expired users from VIP channel
- Subscription pricing plans: [VIP_PRICING]`
  },
  {
    id: 66,
    category_id: "telegram_bots",
    title: "Telegram Broadcast & Bulk Notification Bot Engine",
    title_ar: "ملاحظات وبث الرسائل الجماعية لآلاف المستخدمين",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1670,
    is_template: true,
    tags: ["telegram", "broadcast", "bulk-message", "async"],
    variables: ["[BROADCAST_SPEED]"],
    description: "Broadcast engine with auto-retry, rate-limit safety (30 msg/sec), and delivery statistics dashboard.",
    prompt: `Write a high-speed Telegram message broadcast engine in Python.
Ensure compliance with Telegram rate limits (30 msgs/second), handling FloodWait exceptions gracefully, and logging success/fail stats.`
  },
  {
    id: 67,
    category_id: "telegram_bots",
    title: "Telegram Media Downloader & Transcoder Bot",
    title_ar: "بوت تحميل وتحويل الوسائط والمقاطع الرقمية",
    difficulty: "advanced",
    strength: 4,
    usage_count: 2100,
    is_template: true,
    tags: ["telegram", "yt-dlp", "media", "downloader"],
    variables: ["[SUPPORTED_PLATFORMS]"],
    description: "Downloads video/audio from supported URLs using yt-dlp and ffmpeg transcoding.",
    prompt: `Build a Telegram media downloader bot in Python using \`yt-dlp\` and \`pyrogram\`.
Support video extraction from: [SUPPORTED_PLATFORMS] with video quality choice buttons and progress bar.`
  },
  {
    id: 68,
    category_id: "telegram_bots",
    title: "Telegram Auto Forwarder & Content Mirroring Bot",
    title_ar: "بوت إعادة توجيه المحتوى وتصفية الكلمات التلقائي",
    difficulty: "medium",
    strength: 4,
    usage_count: 1540,
    is_template: true,
    tags: ["telegram", "forwarder", "telethon", "userbot"],
    variables: ["[SOURCE_CHANNEL]", "[TARGET_CHANNEL]"],
    description: "Userbot script using Telethon to mirror messages from source to target channel with regex word replacement.",
    prompt: `Create a Python Telethon userbot script that monitors [SOURCE_CHANNEL] and forwards messages to [TARGET_CHANNEL].
Filter out links and replace designated watermark usernames in real time.`
  },
  {
    id: 69,
    category_id: "telegram_bots",
    title: "Telegram Inline Search & Query Handler Engine",
    title_ar: "بوت البحث السريع التفاعلي Inline Mode",
    difficulty: "medium",
    strength: 4,
    usage_count: 1320,
    is_template: true,
    tags: ["telegram", "inline-mode", "query", "search"],
    variables: ["[SEARCH_DATASET]"],
    description: "Implements Telegram inline mode queries returning dynamic article cards and media results.",
    prompt: `Build an Inline Mode Telegram bot handler in Python that responds to @botname queries.
Search dataset: [SEARCH_DATASET] and return cached InlineQueryResultArticle list with instant preview.`
  },
  {
    id: 70,
    category_id: "telegram_bots",
    title: "Telegram Ticketing & Customer Support Desk Bot",
    title_ar: "بوت الدعم الفني وتذاكر المساعدة للشركات",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1450,
    is_template: true,
    tags: ["telegram", "support", "tickets", "customer-service"],
    variables: ["[SUPPORT_TEAM_GROUP_ID]"],
    description: "Routes user support messages to an admin group, creating ticket IDs and forwarding agent replies back to users.",
    prompt: `Build a Customer Support Ticket Telegram bot in Node.js/Python.
Bridge messages between end users and admin support group [SUPPORT_TEAM_GROUP_ID]. Maintain ticket status (Open/Closed) in DB.`
  },
  {
    id: 71,
    category_id: "telegram_bots",
    title: "Telegram Quiz & Examination Engine Bot",
    title_ar: "بوت المسابقات والاختبارات التفاعلية للطلاب",
    difficulty: "medium",
    strength: 4,
    usage_count: 1210,
    is_template: true,
    tags: ["telegram", "quiz", "education", "polls"],
    variables: ["[QUIZ_CATEGORY]"],
    description: "Generates timed quizzes using native Telegram Polls/Quizzes with leaderboards.",
    prompt: `Build a Quiz Telegram Bot for [QUIZ_CATEGORY].
Use native \`sendPoll\` in quiz mode with timers, user score tracking, and top-10 leaderboard commands.`
  },
  {
    id: 72,
    category_id: "telegram_bots",
    title: "Telegram RSS & News Feed Auto-Publisher",
    title_ar: "بوت النشر التلقائي للخلاصات والأخبار RSS",
    difficulty: "medium",
    strength: 3,
    usage_count: 1100,
    is_template: true,
    tags: ["telegram", "rss", "news", "automation"],
    variables: ["[RSS_FEED_URL]"],
    description: "Polls RSS news feeds every 5 minutes and posts formatted Instant View cards to Telegram channels.",
    prompt: `Create a Python script using \`feedparser\` and \`aiogram\` to monitor RSS feed [RSS_FEED_URL].
Format new posts with HTML tags, photo thumbnail, and publish automatically to channel.`
  },
  {
    id: 73,
    category_id: "telegram_bots",
    title: "Telegram Anonymous Confession & Chat Matchmaker Bot",
    title_ar: "بوت الدردشة المجهولة والتعارف الآمن",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1780,
    is_template: true,
    tags: ["telegram", "anonymous", "chat", "matchmaker"],
    variables: ["[MATCHING_ALGORITHM]"],
    description: "Pairs two random users in anonymous 1-on-1 chat rooms with media filtering.",
    prompt: `Write an Anonymous Random Chat Telegram bot in Python.
Implement queue-based user pairing, /next command to switch partners, and photo blur moderation.`
  },
  {
    id: 74,
    category_id: "telegram_bots",
    title: "Telegram File Storage & Cloud Drive Bot",
    title_ar: "بوت التخزين السحابي السريع واستضافة الملفات",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1980,
    is_template: true,
    tags: ["telegram", "cloud", "storage", "file-sharing"],
    variables: ["[STORAGE_CHANNEL_ID]"],
    description: "Uses private Telegram channel as unlimited file storage with generated sharing download links.",
    prompt: `Create a Cloud Storage Telegram bot that forwards uploaded user files to private channel [STORAGE_CHANNEL_ID].
Generate unique shareable short-links allowing authorized download.`
  },
  {
    id: 75,
    category_id: "telegram_bots",
    title: "Telegram Affiliate & Referral System Generator",
    title_ar: "بوت نظام التسويق بالعمولة والإحالة والتكافؤ",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1420,
    is_template: true,
    tags: ["telegram", "affiliate", "referral", "reward"],
    variables: ["[REWARD_PER_REFERRAL]"],
    description: "Generates tracking referral links (\`t.me/bot?start=ref123\`) and tracks user point balances.",
    prompt: `Build a Referral System Telegram bot in Python.
Track unique start payload links, add [REWARD_PER_REFERRAL] balance points to referrer, and handle withdrawal requests.`
  },
  {
    id: 76,
    category_id: "telegram_bots",
    title: "Telegram Payment Invoice & Telegram Stars Bot Integration",
    title_ar: "ربط مدفوعات نجوم تلجرام Telegram Stars المباشرة",
    difficulty: "expert",
    strength: 5,
    usage_count: 1650,
    is_template: true,
    tags: ["telegram", "stars", "payments", "invoices"],
    variables: ["[ITEM_NAME]", "[STAR_PRICE]"],
    description: "Implements Telegram Stars digital payment checkout and PreCheckoutQuery handler.",
    prompt: `Write code for a Telegram Stars payment bot in Python.
Sell digital product [ITEM_NAME] for [STAR_PRICE] Telegram Stars using \`sendInvoice\` and \`answerPreCheckoutQuery\`.`
  },
  {
    id: 77,
    category_id: "telegram_bots",
    title: "Telegram Scheduled Reminder & Task Notifier",
    title_ar: "بوت التنبيهات والمهام المجدولة الذكية",
    difficulty: "medium",
    strength: 3,
    usage_count: 1150,
    is_template: true,
    tags: ["telegram", "reminder", "scheduler", "apscheduler"],
    variables: ["[TIMEZONE]"],
    description: "Uses APScheduler to trigger localized reminders at user-selected dates and times.",
    prompt: `Create a Reminder Telegram Bot using Python and APScheduler.
Allow users to set single or recurring reminders in timezone [TIMEZONE] with custom alert text.`
  },
  {
    id: 78,
    category_id: "telegram_bots",
    title: "Telegram Group Activity Leaderboard & Gamification Bot",
    title_ar: "بوت تحفيز المجموعات ولوحة المتصدرين للأعضاء",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1380,
    is_template: true,
    tags: ["telegram", "gamification", "leaderboard", "xp"],
    variables: ["[XP_PER_MESSAGE]"],
    description: "Tracks active members in Telegram groups, awarding XP points and custom level badges.",
    prompt: `Build a Telegram Group Gamification Bot in Python.
Award [XP_PER_MESSAGE] XP per chat message sent, display user level ranks, and render canvas profile card image.`
  }
];
