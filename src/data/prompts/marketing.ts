import { PromptItem } from '../../types';

export const MARKETING_PROMPTS: PromptItem[] = [
  {
    id: 185,
    category_id: "marketing",
    title: "Viral TikTok & Reels 15-Second Video Hook Generator",
    title_ar: "خطافات فيديوهات تيك توك و ريلز الفيروسية",
    difficulty: "medium",
    strength: 5,
    usage_count: 3600,
    is_template: true,
    tags: ["tiktok", "reels", "viral", "short-form-video"],
    variables: ["[PRODUCT_OR_NICHE]"],
    description: "Generates 10 high-retention video hooks designed to stop scrolling in 3 seconds.",
    prompt: `Generate 10 high-converting TikTok/Reels video hooks for [PRODUCT_OR_NICHE].
Include visual on-screen text, audio spoken hook, and 3-second pattern interrupt concept.`
  },
  {
    id: 186,
    category_id: "marketing",
    title: "Google Search Ads Copywriter & Keyword Mapper",
    title_ar: "صناعة إعلانات جوجل البحثية ومطابقة الكلمات",
    difficulty: "advanced",
    strength: 4,
    usage_count: 2200,
    is_template: true,
    tags: ["google-ads", "ppc", "search-ads", "copywriting"],
    variables: ["[PRODUCT_OR_SERVICE]", "[TARGET_KEYWORDS]"],
    description: "Generates RSA (Responsive Search Ads) with 15 headlines and 4 description variations.",
    prompt: `Create Google Responsive Search Ads (RSA) for [PRODUCT_OR_SERVICE].
Target Keywords: [TARGET_KEYWORDS].
Provide 15 Headlines (<= 30 chars each) and 4 Descriptions (<= 90 chars each) maximizing Quality Score.`
  },
  {
    id: 187,
    category_id: "marketing",
    title: "Meta (Facebook/Instagram) Ad Creative Strategy",
    title_ar: "إستراتيجية وصناعة إعلانات فيسبوك وانستغرام",
    difficulty: "advanced",
    strength: 4,
    usage_count: 2800,
    is_template: true,
    tags: ["facebook-ads", "meta-ads", "instagram", "conversion"],
    variables: ["[OFFER]", "[TARGET_AUDIENCE]"],
    description: "Complete ad set plan including primary text, image concepts, and hook angles.",
    prompt: `Design a Meta Ads creative campaign for [OFFER] targeting [TARGET_AUDIENCE].
Provide 3 Ad Angles (Emotional Pain Point, Urgency Offer, Social Proof) with Primary Copy, Headline, and Image Prompt.`
  },
  {
    id: 188,
    category_id: "marketing",
    title: "Influencer Marketing Outreach Script & Brief",
    title_ar: "خطاب وملف إحاطة حملات المؤثرين",
    difficulty: "medium",
    strength: 4,
    usage_count: 1890,
    is_template: true,
    tags: ["influencer", "outreach", "collab", "brief"],
    variables: ["[BRAND_NAME]", "[COMPENSATION_OFFER]"],
    description: "DM outreach message and creator campaign brief for sponsored posts.",
    prompt: `Write an Instagram DM outreach template to partner with macro-influencers for [BRAND_NAME].
Offer: [COMPENSATION_OFFER]. Keep it casual, value-driven, and easy to accept.`
  },
  {
    id: 189,
    category_id: "marketing",
    title: "Customer Journey Funnel Architecture (AIDA + Retention)",
    title_ar: "هندسة قمع المبيعات ورحلة العميل الشاملة",
    difficulty: "expert",
    strength: 5,
    usage_count: 2100,
    is_template: true,
    tags: ["funnel", "customer-journey", "growth", "cro"],
    variables: ["[BUSINESS_MODEL]"],
    description: "Maps Top-of-Funnel (TOFU), Middle-of-Funnel (MOFU), and Bottom-of-Funnel (BOFU) assets.",
    prompt: `Design the complete marketing funnel for [BUSINESS_MODEL].
Detail content assets and offers for:
- TOFU (Awareness)
- MOFU (Consideration)
- BOFU (Decision)
- Post-Purchase Retention (LTV Expansion)`
  },
  {
    id: 190,
    category_id: "marketing",
    title: "Product Hunt Launch Playbook & Post Templates",
    title_ar: "دليل إطلاق المنتجات في Product Hunt",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1650,
    is_template: true,
    tags: ["product-hunt", "launch", "startup", "growth"],
    variables: ["[PRODUCT_NAME]", "[TAGLINE]"],
    description: "Product Hunt launch kit containing maker comment, tagline options, and supporter outreach emails.",
    prompt: `Create a Product Hunt launch kit for [PRODUCT_NAME] ([TAGLINE]).
Provide: Maker First Comment, 60-character Tagline options, and Supporter Email broadcast copy.`
  },
  {
    id: 191,
    category_id: "marketing",
    title: "SEO On-Page Optimization Audit & Meta Tag Generator",
    title_ar: "تدقيق السيو الداخلي وإنشاء وسوم Meta Tags",
    difficulty: "medium",
    strength: 4,
    usage_count: 2400,
    is_template: true,
    tags: ["seo", "meta-tags", "on-page", "schema"],
    variables: ["[PAGE_URL_OR_TOPIC]"],
    description: "Generates high CTR Meta Title, Meta Description, OG Image tags, and Schema.org JSON-LD.",
    prompt: `Generate SEO metadata for [PAGE_URL_OR_TOPIC].
Output:
- Title Tag (< 60 chars)
- Meta Description (< 155 chars) with high CTR trigger
- OpenGraph Meta Tags
- Schema.org JSON-LD structured data markup`
  },
  {
    id: 192,
    category_id: "marketing",
    title: "Abandoned Cart Email Automation Flow",
    title_ar: "سلسلة إيميلات السلة المتروكة لرفع المبيعات",
    difficulty: "medium",
    strength: 4,
    usage_count: 2250,
    is_template: true,
    tags: ["email-marketing", "klaviyo", "abandoned-cart", "ecommerce"],
    variables: ["[STORE_DISCOUNT]"],
    description: "3-email sequence recovering lost revenue from abandoned checkout carts.",
    prompt: `Write a 3-part abandoned cart email series for an e-commerce brand.
Email 1 (1 hour post-abandonment): Gentle reminder.
Email 2 (24 hours post-abandonment): Urgency + Social proof.
Email 3 (48 hours post-abandonment): Incentive offer ([STORE_DISCOUNT]).`
  },
  {
    id: 193,
    category_id: "marketing",
    title: "Viral Contest & Giveaway Campaign Strategy",
    title_ar: "حملات المسابقات والجوائز الفيروسية للنمو",
    difficulty: "medium",
    strength: 4,
    usage_count: 1720,
    is_template: true,
    tags: ["giveaway", "contest", "viral-growth", "social"],
    variables: ["[PRIZE_VALUED_AT]"],
    description: "Viral referral contest mechanics maximizing email capture and social shares.",
    prompt: `Design a viral social media giveaway campaign for a prize valued at [PRIZE_VALUED_AT].
Specify entry rules, bonus points for sharing, partner brand cross-promotion pitch, and official terms.`
  },
  {
    id: 194,
    category_id: "marketing",
    title: "App Store Optimization (ASO) Listing Copywriter",
    title_ar: "تحسين ظهور التطبيقات في المتاجر ASO",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1390,
    is_template: true,
    tags: ["aso", "app-store", "play-store", "mobile"],
    variables: ["[APP_FEATURES]"],
    description: "App Store & Google Play keywords, short description, and full promo text.",
    prompt: `Write ASO store listing text for a mobile app with features: [APP_FEATURES].
Provide App Name (with keyword), Subtitle (30 chars), Keyword Field (100 chars comma-separated), and Promo Text.`
  },
  {
    id: 195,
    category_id: "marketing",
    title: "Brand Positioning & Value Proposition Canvas",
    title_ar: "مخطط القيمة المضافة وتموضّع العلامة التجارية",
    difficulty: "expert",
    strength: 5,
    usage_count: 1820,
    is_template: true,
    tags: ["brand-strategy", "value-proposition", "positioning"],
    variables: ["[TARGET_CUSTOMER]", "[COMPETITOR_NAME]"],
    description: "Geoffrey Moore style positioning statement defining target, market category, and differentiator.",
    prompt: `Build a Brand Positioning Statement for a product targeting [TARGET_CUSTOMER] competing against [COMPETITOR_NAME].
Structure: For [Target], Who [Need], Our Product is a [Category] That [Key Benefit], Unlike [Competitor], Our Product [Differentiator].`
  },
  {
    id: 196,
    category_id: "marketing",
    title: "Cold Call Script & Objection Handling Playbook",
    title_ar: "سكربت المكالمات البيعية والتعامل مع الاعتراضات",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1950,
    is_template: true,
    tags: ["sales", "cold-calling", "objections", "b2b"],
    variables: ["[SERVICE_OFFERED]"],
    description: "Cold call script with gatekeeper bypass and responses to 'No time' and 'Too expensive'.",
    prompt: `Write a B2B cold calling script selling [SERVICE_OFFERED].
Include 5-second permission opener, 15-second pitch, gatekeeper bypass, and objection handlers for "Send an email" and "No budget".`
  },
  {
    id: 197,
    category_id: "marketing",
    title: "SaaS Freemium to Paid Upgrade Conversion In-App Prompt",
    title_ar: "تحويل مستخدمي الخدمة المجانية إلى اشتراك مدفوع",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1540,
    is_template: true,
    tags: ["saas", "freemium", "conversion", "in-app"],
    variables: ["[FEATURE_LOCKED]"],
    description: "In-app modal pop-up copy prompting free users to upgrade when hitting feature limit.",
    prompt: `Write the copy for an in-app upgrade modal triggered when a free SaaS user hits the limit for [FEATURE_LOCKED].
Include value trigger, paywall feature list, social proof quote, and single-click upgrade button.`
  },
  {
    id: 198,
    category_id: "marketing",
    title: "Public Relations Pitch to Tech Journalists",
    title_ar: "مخاطبة الصحفيين التقنيين والتغطية الإعلامية",
    difficulty: "medium",
    strength: 4,
    usage_count: 1280,
    is_template: true,
    tags: ["pr", "tech-media", "pitch", "journalists"],
    variables: ["[EXCLUSIVE_DATA_STORY]"],
    description: "Personalized pitch email to tech news journalists with exclusive story angle.",
    prompt: `Write a 120-word pitch email to a TechCrunch journalist sharing exclusive research data: [EXCLUSIVE_DATA_STORY].
Hook with industry trend context and offer exclusive early interview access.`
  },
  {
    id: 199,
    category_id: "marketing",
    title: "Customer Review Request & NPS Survey Email",
    title_ar: "طلب تقييم العملاء وقياس مؤشر NPS",
    difficulty: "beginner",
    strength: 3,
    usage_count: 1620,
    is_template: true,
    tags: ["nps", "reviews", "customer-feedback", "trustpilot"],
    variables: ["[BRAND_NAME]"],
    description: "Post-purchase automated review request email directing satisfied users to Trustpilot.",
    prompt: `Write a short post-purchase email for [BRAND_NAME] asking customers for a quick rating.
Direct 9-10 scores to Trustpilot/Google Reviews and low scores to customer support feedback form.`
  },
  {
    id: 200,
    category_id: "marketing",
    title: "Event Webinar Registration Landing Page Copy",
    title_ar: "كتابة صفحة التسجيل للندوات والمؤتمرات المباشرة",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1890,
    is_template: true,
    tags: ["webinar", "landing-page", "lead-gen", "event"],
    variables: ["[WEBINAR_TOPIC]", "[SPEAKER_CREDENTIALS]"],
    description: "High-converting webinar registration page with 3 key takeaways, speaker bio, and countdown timer copy.",
    prompt: `Write high-converting landing page copy for a live webinar on [WEBINAR_TOPIC] featuring [SPEAKER_CREDENTIALS].
Provide Headline, Subhead, 3 Bullet Takeaways ("What you'll learn"), Speaker Bio, and Urgency CTA.`
  }
];
