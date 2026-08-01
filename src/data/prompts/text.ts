import { PromptItem } from '../../types';

export const TEXT_PROMPTS: PromptItem[] = [
  {
    id: 117,
    category_id: "text_generation",
    title: "Long-Form Exhaustive Article Architecture (3000 Words)",
    title_ar: "المقال الشامل والمعمق (3000 كلمة)",
    difficulty: "expert",
    strength: 5,
    usage_count: 2900,
    is_template: true,
    tags: ["article", "seo", "comprehensive", "research"],
    variables: ["[TOPIC]", "[KEYWORDS]"],
    description: "Structures exhaustive 3000+ word articles with historical background, statistics, and FAQ.",
    prompt: `Write a comprehensive, in-depth 3000-word master guide on [TOPIC].
Include:
1. Compelling hook and problem statement
2. Historical background and core pillars
3. Industry stats and case studies
4. FAQ section answering top 5 common questions
Keywords to embed naturally: [KEYWORDS]`
  },
  {
    id: 118,
    category_id: "text_generation",
    title: "High-Converting PAS Copywriting Framework",
    title_ar: "المحتوى التسويقي المغناطيسي بإطار PAS",
    difficulty: "advanced",
    strength: 5,
    usage_count: 2400,
    is_template: true,
    tags: ["copywriting", "pas", "sales", "conversion"],
    variables: ["[PRODUCT]", "[TARGET_AUDIENCE]"],
    description: "Generates high-converting sales copy using Problem-Agitate-Solve framework.",
    prompt: `Write high-converting sales copy for [PRODUCT] targeting [TARGET_AUDIENCE].
Structure using PAS (Problem -> Agitate -> Solution) with 5 punchy headlines and call-to-action.`
  },
  {
    id: 119,
    category_id: "text_generation",
    title: "Viral LinkedIn Thought Leadership Post Set",
    title_ar: "منشورات لينكد إن الفيروسية وصناعة الهوية",
    difficulty: "medium",
    strength: 4,
    usage_count: 3100,
    is_template: true,
    tags: ["linkedin", "viral", "social-media", "growth"],
    variables: ["[INDUSTRY_INSIGHT]"],
    description: "Formats engaging LinkedIn posts with bold hooks, short paragraphs, and engagement questions.",
    prompt: `Write a viral LinkedIn thought leadership post based on this insight: [INDUSTRY_INSIGHT].
Use hook line, short single-sentence paragraphs, bullet points, and closing question.`
  },
  {
    id: 120,
    category_id: "text_generation",
    title: "Cold Email Outreach Sequence with 40%+ Open Rate",
    title_ar: "سلسلة الإيميلات الباردة وجذب العملاء المحتملين",
    difficulty: "advanced",
    strength: 4,
    usage_count: 2600,
    is_template: true,
    tags: ["email", "outreach", "b2b", "sales"],
    variables: ["[PROSPECT_TITLE]", "[VALUE_PROP]"],
    description: "4-step B2B email sequence (Initial pitch, Value add, Soft nudge, Break-up email).",
    prompt: `Create a 4-touchpoint cold email outreach sequence for [PROSPECT_TITLE].
Value proposition: [VALUE_PROP]. Keep initial email under 100 words with zero fluff.`
  },
  {
    id: 121,
    category_id: "text_generation",
    title: "SEO Pillar Page Content Strategy Outline",
    title_ar: "مخطط صفحة الركيزة السيو Pillar Page",
    difficulty: "advanced",
    strength: 5,
    usage_count: 1890,
    is_template: true,
    tags: ["seo", "pillar-page", "content-strategy"],
    variables: ["[CORE_TOPIC]"],
    description: "Designs SEO pillar content clusters with H1-H4 heading hierarchy and internal linking strategy.",
    prompt: `Design a complete SEO Pillar Page content strategy for [CORE_TOPIC].
Provide 10 topic cluster sub-articles, keyword intent mapping, and schema markup structure.`
  },
  {
    id: 122,
    category_id: "text_generation",
    title: "E-Commerce Product Description Generator (SEO + Sales)",
    title_ar: "وصف المنتجات المتاجر الإلكترونية الجذاب",
    difficulty: "medium",
    strength: 4,
    usage_count: 2150,
    is_template: true,
    tags: ["ecommerce", "product-description", "shopify"],
    variables: ["[PRODUCT_NAME]", "[KEY_FEATURES]"],
    description: "Transforms product specs into sensory benefits and bullet points for Shopify stores.",
    prompt: `Write product page copy for [PRODUCT_NAME].
Features: [KEY_FEATURES].
Include: Sensory hook, feature-to-benefit transformation bullet points, and specs bullet list.`
  },
  {
    id: 123,
    category_id: "text_generation",
    title: "YouTube Video Script with Retention Hooks",
    title_ar: "سيناريو فيديوهات اليوتيوب وتصدر الاقتراحات",
    difficulty: "advanced",
    strength: 5,
    usage_count: 2800,
    is_template: true,
    tags: ["youtube", "script", "video", "retention"],
    variables: ["[VIDEO_TOPIC]"],
    description: "Script structure featuring 5-second visual hook, pattern interrupts, and CTA.",
    prompt: `Write a 10-minute YouTube script about [VIDEO_TOPIC].
Include visual B-roll cues, 5-second curiosity hook, pattern interrupts every 60 seconds, and subscribe CTA.`
  },
  {
    id: 124,
    category_id: "text_generation",
    title: "Press Release Official Corporate Announcement",
    title_ar: "البيان الصحفي الرسمي والإعلانات المؤسسية",
    difficulty: "medium",
    strength: 3,
    usage_count: 1420,
    is_template: true,
    tags: ["press-release", "pr", "corporate", "media"],
    variables: ["[COMPANY_NAME]", "[ANNOUNCEMENT_NEWS]"],
    description: "Standard AP style corporate press release format with boilerplate and quotes.",
    prompt: `Draft an AP-style press release for [COMPANY_NAME] announcing [ANNOUNCEMENT_NEWS].
Include headline, dateline, CEO quote, key highlights, and company boilerplate.`
  },
  {
    id: 125,
    category_id: "text_generation",
    title: "Technical Whitepaper & Research Brief",
    title_ar: "الورقة البيضاء الفنية والتقرير التقني الشامل",
    difficulty: "expert",
    strength: 5,
    usage_count: 1650,
    is_template: true,
    tags: ["whitepaper", "technical", "b2b", "research"],
    variables: ["[TECHNOLOGY_NAME]"],
    description: "Executive technical whitepaper explaining system architecture and ROI.",
    prompt: `Write an executive technical whitepaper on [TECHNOLOGY_NAME].
Include Executive Summary, Market Problem, Architectural Innovation, Benchmark Data, and Business ROI.`
  },
  {
    id: 126,
    category_id: "text_generation",
    title: "Podcast Episode Outline & Interview Question Matrix",
    title_ar: "مخطط حلقة البودكاست وأسئلة المقابلة",
    difficulty: "medium",
    strength: 4,
    usage_count: 1320,
    is_template: true,
    tags: ["podcast", "interview", "audio", "script"],
    variables: ["[GUEST_NAME]", "[EPISODE_TOPIC]"],
    description: "Podcast preparation doc with intro narrative, 10 deep interview questions, and closing segment.",
    prompt: `Create a 45-minute podcast episode plan interviewing [GUEST_NAME] about [EPISODE_TOPIC].
Provide episode summary, 10 probing non-generic questions, and rapid-fire closing segment.`
  },
  {
    id: 127,
    category_id: "text_generation",
    title: "Comprehensive E-Book Chapter Generator",
    title_ar: "كتابة فصول الكتب الإلكترونية الشاملة",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1980,
    is_template: true,
    tags: ["ebook", "chapter", "book", "writing"],
    variables: ["[CHAPTER_TITLE]", "[BOOK_SUBJECT]"],
    description: "Generates 2000-word e-book chapters with storytelling, diagrams, and key takeaways.",
    prompt: `Write Chapter 3 titled "[CHAPTER_TITLE]" for an e-book on [BOOK_SUBJECT].
Include real-world examples, actionable exercises, summary box, and transition to next chapter.`
  },
  {
    id: 128,
    category_id: "text_generation",
    title: "X / Twitter Viral Thread Architect (10 Tweets)",
    title_ar: "ث ريد منشوري فيروسي لـ Twitter / X",
    difficulty: "medium",
    strength: 4,
    usage_count: 3400,
    is_template: true,
    tags: ["twitter", "thread", "viral", "x"],
    variables: ["[THREAD_TOPIC]"],
    description: "10-tweet viral thread with hook tweet, digestible breakdown, and bookmark CTA.",
    prompt: `Write a viral 10-tweet thread explaining [THREAD_TOPIC].
Tweet 1: High-curiosity hook.
Tweets 2-9: Bullet points and concise lessons.
Tweet 10: Summary and call-to-action to retweet.`
  },
  {
    id: 129,
    category_id: "text_generation",
    title: "Speech & Keynote Address Writer",
    title_ar: "كتابة الخطابات والمؤتمرات الرئيسية Keynote",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1210,
    is_template: true,
    tags: ["speech", "keynote", "public-speaking"],
    variables: ["[EVENT_THEME]", "[AUDIENCE]"],
    description: "Inspiring 10-minute keynote speech with rhetorical devices and pause markers.",
    prompt: `Write a compelling 10-minute keynote speech for an event themed [EVENT_THEME] addressing [AUDIENCE].
Include stage pause cues [PAUSE], personal story arc, and memorable closing takeaway.`
  },
  {
    id: 130,
    category_id: "text_generation",
    title: "Crisis Communication & Brand Public Statement",
    title_ar: "إدارة الأزمات والبيانات الإعلامية للعلامات التجارية",
    difficulty: "expert",
    strength: 5,
    usage_count: 1090,
    is_template: true,
    tags: ["crisis", "pr", "brand", "communication"],
    variables: ["[INCIDENT_DESCRIPTION]"],
    description: "Empathic, transparent brand crisis statement taking ownership and detailing action steps.",
    prompt: `Draft an official public statement regarding [INCIDENT_DESCRIPTION].
Maintain empathetic, transparent tone, take immediate responsibility, and outline 4 concrete preventive measures.`
  },
  {
    id: 131,
    category_id: "text_generation",
    title: "Newsletter Editorial & Curator Email Digest",
    title_ar: "النشرة البريدية والأخبار المنسقة للجمهور",
    difficulty: "medium",
    strength: 4,
    usage_count: 2200,
    is_template: true,
    tags: ["newsletter", "substack", "email", "curation"],
    variables: ["[NEWSLETTER_NAME]", "[WEEKLY_TOPICS]"],
    description: "Weekly Substack-style newsletter with personal editor note, 3 curated links, and thought of the week.",
    prompt: `Write the weekly edition for [NEWSLETTER_NAME] covering [WEEKLY_TOPICS].
Include editor intro note, 3 main takeaway breakdowns, link curation commentary, and reader poll.`
  },
  {
    id: 132,
    category_id: "text_generation",
    title: "Case Study & Success Story Writer (STAR Method)",
    title_ar: "دراسة الحالة وقصص النجاح إطار STAR",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1750,
    is_template: true,
    tags: ["case-study", "star-method", "b2b", "metrics"],
    variables: ["[CLIENT_NAME]", "[RESULTS_METRICS]"],
    description: "Customer case study using Situation, Task, Action, Result framework with quote callouts.",
    prompt: `Write a B2B customer success case study for [CLIENT_NAME] highlighting [RESULTS_METRICS].
Structure: Situation -> Task -> Action -> Results (STAR) with pull quotes.`
  },
  {
    id: 133,
    category_id: "text_generation",
    title: "Creative Story & Screenplay Scene Generator",
    title_ar: "كتابة السيناريو والحوارات السينمائية",
    difficulty: "medium",
    strength: 4,
    usage_count: 1620,
    is_template: true,
    tags: ["screenplay", "story", "dialogue", "script"],
    variables: ["[SCENE_SETTING]", "[TWO_CHARACTERS]"],
    description: "Hollywood screenplay format scene with slugline, parentheticals, and tense subtext dialogue.",
    prompt: `Write a movie screenplay scene taking place in [SCENE_SETTING] between [TWO_CHARACTERS].
Use industry screenplay format (SLUGLINE, Character name centered, parentheticals) with intense emotional subtext.`
  },
  {
    id: 134,
    category_id: "text_generation",
    title: "Job Description & Talent Acquisition Pitch",
    title_ar: "الوصف الوظيفي وجذب الكفاءات العالية",
    difficulty: "medium",
    strength: 3,
    usage_count: 1380,
    is_template: true,
    tags: ["hr", "job-description", "hiring", "recruitment"],
    variables: ["[JOB_TITLE]", "[COMPANY_CULTURE]"],
    description: "Compelling job posting highlighting company mission, responsibilities, and perks.",
    prompt: `Write an enticing job description for a [JOB_TITLE].
Emphasize [COMPANY_CULTURE], 90-day expectations, required skills, and competitive benefits.`
  },
  {
    id: 135,
    category_id: "text_generation",
    title: "Grant Proposal & Non-Profit Funding Application",
    title_ar: "مقترحات المنح وطلب التمويل للمشاريع",
    difficulty: "expert",
    strength: 5,
    usage_count: 980,
    is_template: true,
    tags: ["grant", "funding", "proposal", "nonprofit"],
    variables: ["[PROJECT_GOAL]", "[GRANT_AMOUNT]"],
    description: "Grant application detailing community impact, methodology, budget breakdown, and evaluation metrics.",
    prompt: `Write a grant funding proposal for a project aiming to [PROJECT_GOAL] requesting [GRANT_AMOUNT].
Include Needs Statement, Project Objectives, Budget Breakdown, and Measurable Outcomes.`
  },
  {
    id: 136,
    category_id: "text_generation",
    title: "Policy & Terms of Service Document Draft",
    title_ar: "صياغة السياسات والشروط والأحكام",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1250,
    is_template: true,
    tags: ["legal", "policy", "privacy", "terms"],
    variables: ["[APP_TYPE]", "[DATA_COLLECTED]"],
    description: "Drafts GDPR-compliant Privacy Policy sections explaining data handling.",
    prompt: `Draft a Privacy Policy section for a [APP_TYPE] collecting [DATA_COLLECTED].
Detail user rights under GDPR/CCPA, cookies usage, and data retention rules.`
  }
];
