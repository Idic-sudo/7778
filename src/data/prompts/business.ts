import { PromptItem } from '../../types';

export const BUSINESS_PROMPTS: PromptItem[] = [
  {
    id: 216,
    category_id: "business",
    title: "Startup One-Page Lean Canvas Business Plan",
    title_ar: "مخطط نموذج العمل التجاري للشركات الناشئة Lean Canvas",
    difficulty: "advanced",
    strength: 5,
    usage_count: 2800,
    is_template: true,
    tags: ["business-plan", "lean-canvas", "startup", "strategy"],
    variables: ["[STARTUP_IDEA]"],
    description: "Builds complete 9-box Lean Canvas (Problem, Solution, Value Prop, Channels, Revenue, Costs).",
    prompt: `Create a Lean Canvas Business Plan for startup idea: [STARTUP_IDEA].
Detail:
1. Problem & Existing Alternatives
2. Solution & Key Metrics
3. Unique Value Proposition
4. Unfair Advantage & Channels
5. Cost Structure & Revenue Streams`
  },
  {
    id: 217,
    category_id: "business",
    title: "VC Pitch Deck 10-Slide Outline Generator",
    title_ar: "عرض العروض التقديمية للمستثمرين (Pitch Deck 10 Slides)",
    difficulty: "expert",
    strength: 5,
    usage_count: 2400,
    is_template: true,
    tags: ["pitch-deck", "vc", "fundraising", "slides"],
    variables: ["[COMPANY_NAME]", "[PROBLEM_SOLVED]"],
    description: "Generates slide-by-slide copy and visual prompts for Sequoia-style 10-slide seed pitch deck.",
    prompt: `Create a 10-slide VC Pitch Deck outline for [COMPANY_NAME] solving [PROBLEM_SOLVED].
Slides: Title, Problem, Solution, Market Size (TAM/SAM/SOM), Product, Business Model, Traction, Competition, Team, The Ask.`
  },
  {
    id: 218,
    category_id: "business",
    title: "Financial Model & SaaS Unit Economics Engine",
    title_ar: "النموذج المالي والاقتصادات الأساسية SaaS",
    difficulty: "expert",
    strength: 5,
    usage_count: 1980,
    is_template: true,
    tags: ["financial-model", "saas", "unit-economics", "cac-ltv"],
    variables: ["[MONTHLY_PRICE]", "[CHURN_RATE]"],
    description: "Calculates LTV, CAC payback period, Monthly Recurring Revenue (MRR) growth, and burn rate.",
    prompt: `Build a 3-year financial forecast model for a SaaS business.
Inputs: Subscription ARPU: [MONTHLY_PRICE]/mo, Churn: [CHURN_RATE]%.
Show monthly MRR projections, Customer Lifetime Value (LTV), target Customer Acquisition Cost (CAC), and runway calculations.`
  },
  {
    id: 219,
    category_id: "business",
    title: "SWOT & PESTEL Strategic Market Matrix",
    title_ar: "تحليل SWOT و PESTEL للتخطيط الاستراتيجي",
    difficulty: "advanced",
    strength: 4,
    usage_count: 2100,
    is_template: true,
    tags: ["swot", "pestel", "strategic-analysis", "market"],
    variables: ["[COMPANY_OR_INDUSTRY]"],
    description: "Comprehensive SWOT (Strengths, Weaknesses, Opportunities, Threats) and PESTEL environmental audit.",
    prompt: `Perform a dual SWOT and PESTEL strategic analysis for [COMPANY_OR_INDUSTRY].
SWOT: Internal Strengths & Weaknesses vs External Opportunities & Threats.
PESTEL: Political, Economic, Social, Technological, Environmental, and Legal factors.`
  },
  {
    id: 220,
    category_id: "business",
    title: "Competitor Intelligence & Feature Matrix Audit",
    title_ar: "تحليل المنافسين ومصفوفة الفروقات والمميزات",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1750,
    is_template: true,
    tags: ["competitor-analysis", "benchmarking", "market-research"],
    variables: ["[MY_PRODUCT]", "[TOP_3_COMPETITORS]"],
    description: "Compares feature parity, pricing strategy, market share, and weaknesses of competitors.",
    prompt: `Conduct a competitive analysis comparing [MY_PRODUCT] against [TOP_3_COMPETITORS].
Provide a Feature Parity Matrix table, pricing tier comparison, competitor customer complaint analysis, and strategic positioning gap.`
  },
  {
    id: 221,
    category_id: "business",
    title: "Standard Operating Procedure (SOP) Writer",
    title_ar: "كتابة إجراءات العمل التشغيلية القياسية SOP",
    difficulty: "medium",
    strength: 4,
    usage_count: 1890,
    is_template: true,
    tags: ["sop", "operations", "process", "business"],
    variables: ["[OPERATIONAL_PROCESS]"],
    description: "Formal corporate SOP document with purpose, scope, step-by-step workflow, and quality checklists.",
    prompt: `Draft a formal corporate Standard Operating Procedure (SOP) for [OPERATIONAL_PROCESS].
Include Purpose, Scope, Roles & Responsibilities, Step-by-step Flowchart text, Exception handling, and Quality Assurance checklist.`
  },
  {
    id: 222,
    category_id: "business",
    title: "B2B Sales Partnership Proposal & Term Sheet",
    title_ar: "صياغة عروض الشراكة التجارية والاتفاقيات",
    difficulty: "expert",
    strength: 5,
    usage_count: 1540,
    is_template: true,
    tags: ["partnership", "b2b", "proposal", "term-sheet"],
    variables: ["[PARTNER_COMPANY]", "[MUTUAL_BENEFIT]"],
    description: "Strategic alliance partnership proposal outlining co-marketing, revenue share, and KPIs.",
    prompt: `Draft a strategic B2B partnership proposal to [PARTNER_COMPANY].
Value Proposition: [MUTUAL_BENEFIT]. Outline strategic alignment, revenue share terms, co-marketing deliverables, and 90-day execution roadmap.`
  },
  {
    id: 223,
    category_id: "business",
    title: "OKRs (Objectives & Key Results) Framework Builder",
    title_ar: "تحديد الأهداف والنتائج الرئيسية OKRs للفرق",
    difficulty: "medium",
    strength: 4,
    usage_count: 2200,
    is_template: true,
    tags: ["okr", "goals", "management", "kpi"],
    variables: ["[DEPARTMENT_NAME]", "[QUARTERLY_GOAL]"],
    description: "Drafts 3 ambitious Objectives with 4 measurable, quantitative Key Results for quarterly team alignment.",
    prompt: `Develop quarterly OKRs for [DEPARTMENT_NAME] aiming to achieve [QUARTERLY_GOAL].
Provide 3 qualitative Objectives. For each Objective, list 4 measurable, numeric Key Results (KRs) with baseline and target metrics.`
  },
  {
    id: 224,
    category_id: "business",
    title: "Executive Summary for Annual Business Report",
    title_ar: "الملخص التنفيذي للتقارير السنوية والاستثمارية",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1420,
    is_template: true,
    tags: ["executive-summary", "report", "business-writing"],
    variables: ["[COMPANY_HIGHLIGHTS]"],
    description: "Polished executive summary highlighting annual revenue growth, operational milestones, and strategic outlook.",
    prompt: `Write a 1-page Executive Summary for a company report featuring: [COMPANY_HIGHLIGHTS].
Structure into Financial Performance, Key Operational Wins, Strategic Challenges, and Future Growth Outlook.`
  },
  {
    id: 225,
    category_id: "business",
    title: "Mergers & Acquisitions (M&A) Due Diligence Checklist",
    title_ar: "قائمة الفحص النافي للجهالة لعمليات الاستحواذ M&A",
    difficulty: "expert",
    strength: 5,
    usage_count: 1100,
    is_template: true,
    tags: ["m-and-a", "due-diligence", "finance", "legal"],
    variables: ["[TARGET_INDUSTRY]"],
    description: "Exhaustive due diligence checklist for acquiring a company in target sector.",
    prompt: `Create a M&A Due Diligence audit checklist for acquiring a company in [TARGET_INDUSTRY].
Cover Financial Audits, Legal & IP Rights, Technology Debt, HR & Key Employee Retention, and Compliance Audit.`
  },
  {
    id: 226,
    category_id: "business",
    title: "Pricing Strategy & Tier Optimization Matrix",
    title_ar: "استراتيجية التسعير وبناء الباقات والاشتراكات",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1980,
    is_template: true,
    tags: ["pricing", "monetization", "saas", "strategy"],
    variables: ["[PRODUCT_OFFERING]"],
    description: "Designs Starter, Pro, and Enterprise pricing tiers with feature gates and value metrics.",
    prompt: `Design a 3-tier pricing strategy (Free/Starter, Pro, Enterprise) for [PRODUCT_OFFERING].
Define price points, core value metric (per user / per GB / per credit), feature packaging matrix, and annual discount incentive.`
  },
  {
    id: 227,
    category_id: "business",
    title: "Customer Churn Analysis & Retention Playbook",
    title_ar: "تحليل تسرب العملاء وإستراتيجيات الاستبقاء",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1620,
    is_template: true,
    tags: ["churn", "retention", "customer-success"],
    variables: ["[CHURN_REASON]"],
    description: "Diagnoses customer churn drivers and outlines proactive customer success intervention workflows.",
    prompt: `Analyze root cause for customer churn due to: [CHURN_REASON].
Create a Retention Playbook: In-app health score triggers, automated re-engagement email sequence, and customer success call script.`
  },
  {
    id: 228,
    category_id: "business",
    title: "Supply Chain Risk Management & Mitigation Audit",
    title_ar: "إدارة مخاطر سلاسل الإمداد والتوريد",
    difficulty: "expert",
    strength: 5,
    usage_count: 1250,
    is_template: true,
    tags: ["supply-chain", "logistics", "risk-management"],
    variables: ["[PRODUCT_SUPPLY_CHAIN]"],
    description: "Identifies single points of failure in supply chain logistics and formulates backup vendor strategies.",
    prompt: `Audit supply chain risks for [PRODUCT_SUPPLY_CHAIN].
Identify single-point failure risks, geopolitical logistics bottlenecks, inventory buffer metrics, and vendor SLA diversification plans.`
  },
  {
    id: 229,
    category_id: "business",
    title: "Board of Directors Meeting Agenda & Resolution Doc",
    title_ar: "جدول أعمال اجتماع مجلس الإدارة والقرارات الرسمية",
    difficulty: "expert",
    strength: 5,
    usage_count: 1180,
    is_template: true,
    tags: ["board-meeting", "governance", "corporate"],
    variables: ["[MEETING_PURPOSE]"],
    description: "Formal board of directors meeting agenda with time allocations and voting resolution templates.",
    prompt: `Prepare a Board of Directors meeting pack for [MEETING_PURPOSE].
Include timed Agenda, CEO Quarterly Update format, CFO Financial Briefing structure, and Formal Board Resolution voting text.`
  },
  {
    id: 230,
    category_id: "business",
    title: "Franchise Expansion Model & Operations Manual Outline",
    title_ar: "نموذج التوسع والتلخيص التجاري الفرنشايز",
    difficulty: "expert",
    strength: 5,
    usage_count: 1320,
    is_template: true,
    tags: ["franchise", "expansion", "business-growth"],
    variables: ["[RESTAURANT_OR_RETAIL_BRAND]"],
    description: "Franchise growth model detailing franchise fees, royalty structure, site criteria, and training playbook.",
    prompt: `Build a Franchise Expansion Framework for [RESTAURANT_OR_RETAIL_BRAND].
Detail: Initial Franchise Fee, Ongoing Royalty %, Location Site Criteria, Quality Control Audits, and Operations Manual Outline.`
  }
];
