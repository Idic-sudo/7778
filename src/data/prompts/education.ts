import { PromptItem } from '../../types';

export const EDUCATION_PROMPTS: PromptItem[] = [
  {
    id: 201,
    category_id: "education",
    title: "Comprehensive Curriculum & Course Syllabus Builder",
    title_ar: "تخطيط المناهج والدورات التدريبية الشاملة",
    difficulty: "advanced",
    strength: 5,
    usage_count: 2400,
    is_template: true,
    tags: ["education", "curriculum", "course", "teaching"],
    variables: ["[SUBJECT_NAME]", "[TARGET_LEVEL]"],
    description: "Designs a 12-week structured course syllabus with weekly modules, learning outcomes, and assignments.",
    prompt: `Create a comprehensive 12-week course syllabus for [SUBJECT_NAME] at [TARGET_LEVEL] level.
Include weekly learning objectives, reading assignments, hands-on lab exercises, and midterm/final project breakdown.`
  },
  {
    id: 202,
    category_id: "education",
    title: "Step-by-Step Feynman Technique Explainer",
    title_ar: "الشرح بأسلوب فاينمان للتبسيط العميق",
    difficulty: "medium",
    strength: 4,
    usage_count: 2900,
    is_template: true,
    tags: ["feynman-technique", "learning", "simplification"],
    variables: ["[COMPLEX_CONCEPT]"],
    description: "Explains complex academic concept using plain language and analogies as if teaching a 12-year-old.",
    prompt: `Explain [COMPLEX_CONCEPT] using the Feynman Technique:
1. Explain it as if teaching a 12-year-old using simple everyday analogies.
2. Identify jargon terms and replace them with plain words.
3. Provide a real-world mental model.`
  },
  {
    id: 203,
    category_id: "education",
    title: "Automated Quiz & Multiple-Choice Question Generator",
    title_ar: "إنشاء الاختبارات المتعددة الاختيارات وشرح الإجابات",
    difficulty: "medium",
    strength: 4,
    usage_count: 2150,
    is_template: true,
    tags: ["quiz", "mcq", "exam", "assessment"],
    variables: ["[TOPIC]", "[QUESTION_COUNT]"],
    description: "Generates multiple-choice quiz questions with distractor analysis and detailed answer explanations.",
    prompt: `Generate [QUESTION_COUNT] multiple-choice questions (MCQs) testing knowledge on [TOPIC].
For each question: Provide 4 options (A-D), mark the correct answer, and give a 2-sentence explanation why it is correct.`
  },
  {
    id: 204,
    category_id: "education",
    title: "Interactive Language Learning Dialogue & Vocab Builder",
    title_ar: "تعلم اللغات والمحادثات التفاعلية مع القواعد",
    difficulty: "beginner",
    strength: 4,
    usage_count: 2600,
    is_template: true,
    tags: ["language-learning", "dialogue", "vocabulary", "grammar"],
    variables: ["[TARGET_LANGUAGE]", "[SCENARIO]"],
    description: "Simulates conversational practice in target language with inline vocabulary definitions and grammar notes.",
    prompt: `Act as a language tutor in [TARGET_LANGUAGE].
Create a realistic dialogue scenario: [SCENARIO].
Provide:
1. Conversation in [TARGET_LANGUAGE]
2. English translation
3. Key vocabulary list with pronunciation guide
4. Grammar breakdown of tricky sentences.`
  },
  {
    id: 205,
    category_id: "education",
    title: "Academic Thesis Statement & Literature Review Outline",
    title_ar: "هيكلة الرسائل العلمية والمراجعة الأدبية للبحوث",
    difficulty: "expert",
    strength: 5,
    usage_count: 1890,
    is_template: true,
    tags: ["thesis", "academic", "literature-review", "research"],
    variables: ["[RESEARCH_TOPIC]"],
    description: "Drafts formal academic thesis statement and literature review thematic structure.",
    prompt: `Help formulate an academic thesis statement for a paper on [RESEARCH_TOPIC].
Provide a 5-part Literature Review outline organizing existing academic debate into thematic clusters.`
  },
  {
    id: 206,
    category_id: "education",
    title: "Mnemonics & Memory Palace Technique Generator",
    title_ar: "ابتكار أدوات التذكر وقصر الذاكرة للحفظ الفائق",
    difficulty: "medium",
    strength: 4,
    usage_count: 1720,
    is_template: true,
    tags: ["mnemonics", "memory", "learning", "study-hacks"],
    variables: ["[LIST_OF_ITEMS_TO_MEMORIZE]"],
    description: "Creates memorable acronyms, stories, and visual memory palace associations to memorize lists.",
    prompt: `Create a memory palace guide and catchphrase mnemonic to memorize these items in exact order:
[LIST_OF_ITEMS_TO_MEMORIZE]
Describe vivid, bizarre visual associations for each room in the memory palace.`
  },
  {
    id: 207,
    category_id: "education",
    title: "Math Problem Step-by-Step Solver with LATEX Render",
    title_ar: "حل المسائل الرياضية خطوة بخطوة مع رموز LaTeX",
    difficulty: "advanced",
    strength: 5,
    usage_count: 2450,
    is_template: true,
    tags: ["math", "latex", "calculus", "algebra"],
    variables: ["[MATH_EQUATION]"],
    description: "Solves calculus, linear algebra, or physics equations showing step-by-step mathematical reasoning.",
    prompt: `Solve the following math problem step-by-step:
[MATH_EQUATION]

Format all mathematical equations using LaTeX syntax ($...$ and $$...$$) and explain the rule applied at each step.`
  },
  {
    id: 208,
    category_id: "education",
    title: "STEM Lab Experiment Protocol & Safety Guide",
    title_ar: "تصميم التجارب المعملية والتعليمية وإرشادات الأمان",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1320,
    is_template: true,
    tags: ["stem", "lab", "experiment", "science"],
    variables: ["[SCIENCE_EXPERIMENT_TOPIC]"],
    description: "Complete lab manual including materials list, procedure steps, safety warnings, and student worksheet.",
    prompt: `Write a STEM lab experiment protocol on [SCIENCE_EXPERIMENT_TOPIC].
Include Materials required, Safety Precautions (PPE), Step-by-step Procedure, Data Collection Table, and Analysis Questions.`
  },
  {
    id: 209,
    category_id: "education",
    title: "Flashcard Set Generator (Anki Format)",
    title_ar: "إنشاء بطاقات الاستذكار Flashcards بصيغة Anki",
    difficulty: "medium",
    strength: 3,
    usage_count: 2100,
    is_template: true,
    tags: ["anki", "flashcards", "spaced-repetition", "study"],
    variables: ["[TEXT_OR_TOPIC]"],
    description: "Converts text content into CSV-formatted Anki flashcard pairs (Front, Back) for spaced repetition.",
    prompt: `Convert the following study material into 15 high-yield Anki flashcards:
"[TEXT_OR_TOPIC]"

Output in clear tab-separated format (Front [TAB] Back) optimized for Anki import.`
  },
  {
    id: 210,
    category_id: "education",
    title: "Essay Peer Review & Rubric Scoring Evaluator",
    title_ar: "تقييم وتصحيح المقالات والمقترحات الأكاديمية",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1650,
    is_template: true,
    tags: ["essay", "grading", "rubric", "peer-review"],
    variables: ["[STUDENT_ESSAY]"],
    description: "Evaluates student essay against standard rubric criteria (Thesis, Evidence, Flow, Grammar).",
    prompt: `Grade the following student essay on a 100-point scale:
\`\`\`
[STUDENT_ESSAY]
\`\`\`
Provide detailed feedback breakdown across: Thesis Clarity (25pt), Evidence & Citation (25pt), Organization (25pt), Grammar & Style (25pt).`
  },
  {
    id: 211,
    category_id: "education",
    title: "Interactive Coding Tutorial & Exercises with Hints",
    title_ar: "دروس برمجية تفاعلية وتمارين مع التلميحات",
    difficulty: "medium",
    strength: 4,
    usage_count: 1980,
    is_template: true,
    tags: ["coding-tutorial", "programming", "exercises"],
    variables: ["[PROGRAMMING_CONCEPT]"],
    description: "Hands-on tutorial explaining coding concept with 3 progressive practice challenges.",
    prompt: `Create a hands-on coding tutorial teaching [PROGRAMMING_CONCEPT].
Provide clear theory summary, code example, and 3 progressive practice exercises with hidden hint toggles and solutions.`
  },
  {
    id: 212,
    category_id: "education",
    title: "History Timeline & Cause-and-Effect Narrative",
    title_ar: "السرد التاريخي والأسباب والنتائج للأحداث العالمية",
    difficulty: "medium",
    strength: 3,
    usage_count: 1420,
    is_template: true,
    tags: ["history", "timeline", "analysis", "humanities"],
    variables: ["[HISTORICAL_EVENT_OR_ERA]"],
    description: "Chronological timeline detailing catalyst triggers, major milestones, and long-term consequences.",
    prompt: `Explain the historical era/event: [HISTORICAL_EVENT_OR_ERA].
Provide a chronological timeline of key events, primary catalysts, key historical figures involved, and long-term geopolitical outcomes.`
  },
  {
    id: 213,
    category_id: "education",
    title: "Special Needs & Differentiated Learning Lesson Plan",
    title_ar: "خطط الدروس المخصصة للتعليم الفردي والتربية الخاصة",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1150,
    is_template: true,
    tags: ["special-education", "differentiated-learning", "teaching"],
    variables: ["[GRADE_LEVEL]", "[LESSON_TOPIC]"],
    description: "Lesson plan modifications supporting visual, auditory, kinesthetic, and neurodiverse learners.",
    prompt: `Create a differentiated lesson plan for [GRADE_LEVEL] students on [LESSON_TOPIC].
Include accommodations for visual learners, auditory learners, kinesthetic learners, and IEP support strategies.`
  },
  {
    id: 214,
    category_id: "education",
    title: "Debate Club Motion Brief & Argument Matrix",
    title_ar: "تحضير حجج الأندية والمناظرات الدراسية",
    difficulty: "medium",
    strength: 4,
    usage_count: 1380,
    is_template: true,
    tags: ["debate", "arguments", "public-speaking"],
    variables: ["[DEBATE_MOTION]"],
    description: "Prepares Proposition and Opposition arguments with evidence points for formal debates.",
    prompt: `Prepare a debate briefing doc for motion: "This House Would [DEBATE_MOTION]".
Provide 3 strong arguments for the Government (Proposition) and 3 strong arguments for the Opposition with counter-rebuttals.`
  },
  {
    id: 215,
    category_id: "education",
    title: "Speed Reading & Text Compression Guide",
    title_ar: "القراءة السريعة واستخلاص النقاط من المقالات",
    difficulty: "beginner",
    strength: 3,
    usage_count: 1820,
    is_template: true,
    tags: ["speed-reading", "summary", "study-skills"],
    variables: ["[LONG_TEXT]"],
    description: "Extracts core takeaways, key definitions, and actionable takeaways for rapid study.",
    prompt: `Perform a speed-reading extraction on the following text:
"[LONG_TEXT]"

Output: 1-sentence Executive Core, 5 Key Bullet Insights, and 3 Important Term Definitions.`
  }
];
