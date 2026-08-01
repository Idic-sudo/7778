import { PromptItem } from '../../types';

export const REASONING_PROMPTS: PromptItem[] = [
  {
    id: 153,
    category_id: "reasoning",
    title: "Deep First-Principles Deconstruction Framework",
    title_ar: "محلل الأصول الأولى والمبادئ الأساسية",
    difficulty: "expert",
    strength: 5,
    usage_count: 2200,
    is_template: true,
    tags: ["reasoning", "first-principles", "analysis"],
    variables: ["[COMPLEX_PROBLEM]"],
    description: "Deconstructs complex problems down to fundamental truths.",
    prompt: `Solve [COMPLEX_PROBLEM] using First-Principles Thinking:
1. Deconstruct problem to undeniable facts
2. Challenge hidden assumptions
3. Rebuild novel solution from scratch`
  },
  {
    id: 154,
    category_id: "reasoning",
    title: "Formal Mathematical Proof & Logic Verification",
    title_ar: "الإثبات الرياضي المنطقي والتحقق الشكلي",
    difficulty: "expert",
    strength: 5,
    usage_count: 1450,
    is_template: true,
    tags: ["math", "proof", "logic", "formal"],
    variables: ["[THEOREM_OR_STATEMENT]"],
    description: "Constructs formal mathematical proof (direct, induction, or contradiction).",
    prompt: `Construct a formal mathematical proof for the following statement:
"[THEOREM_OR_STATEMENT]"
State all axioms, lemmas, and logical inference steps explicitly.`
  },
  {
    id: 155,
    category_id: "reasoning",
    title: "Root Cause Analysis (5 Whys + Fishbone Diagram)",
    title_ar: "تحليل السبب الجذر (5 Whys ومخطط إيشيكاوا)",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1980,
    is_template: true,
    tags: ["root-cause", "5-whys", "fishbone", "problem-solving"],
    variables: ["[SYSTEM_FAILURE]"],
    description: "Executes 5 Whys iteration and Fishbone diagram categories to diagnose root cause.",
    prompt: `Perform Root Cause Analysis on failure: [SYSTEM_FAILURE].
1. Apply 5 Whys methodology sequentially
2. Categorize causes using Fishbone framework (People, Process, Tech, Environment)
3. Actionable prevention plan`
  },
  {
    id: 156,
    category_id: "reasoning",
    title: "Bayesian Probability Update Calculator",
    title_ar: "ملاحظات وتحديثات الاحتمال البايزي Bayesian",
    difficulty: "expert",
    strength: 5,
    usage_count: 1210,
    is_template: true,
    tags: ["bayesian", "probability", "statistics", "math"],
    variables: ["[PRIOR_PROBABILITY]", "[NEW_EVIDENCE]"],
    description: "Calculates updated posterior probability given prior belief and new evidence.",
    prompt: `Calculate posterior probability using Bayes' Theorem:
Prior P(H): [PRIOR_PROBABILITY]
New Evidence E: [NEW_EVIDENCE]
Show likelihood P(E|H) calculation step-by-step.`
  },
  {
    id: 157,
    category_id: "reasoning",
    title: "Inversion Thinking Framework (Pre-Mortem Analysis)",
    title_ar: "التفكير العكسي وتحليل ما قبل الوفاة Pre-Mortem",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1820,
    is_template: true,
    tags: ["inversion", "pre-mortem", "strategy", "risk"],
    variables: ["[PROJECT_NAME]"],
    description: "Assumes project has failed disastrously 1 year from now, identifying top 10 root causes.",
    prompt: `Assume [PROJECT_NAME] has failed completely 1 year in the future.
Conduct a Pre-Mortem: List 10 specific catastrophic reasons why it failed and how to prevent them today.`
  },
  {
    id: 158,
    category_id: "reasoning",
    title: "Game Theory Nash Equilibrium Solver",
    title_ar: "حل معضلات التوازن بنظرية الألعاب Nash Equilibrium",
    difficulty: "expert",
    strength: 5,
    usage_count: 1350,
    is_template: true,
    tags: ["game-theory", "nash-equilibrium", "strategy"],
    variables: ["[PAYOFF_MATRIX]"],
    description: "Identifies dominant strategies and Nash Equilibrium points in multi-player payoff matrix.",
    prompt: `Analyze the following Game Theory payoff matrix:
[PAYOFF_MATRIX]

Find strict/weak dominant strategies and calculate pure/mixed strategy Nash Equilibria.`
  },
  {
    id: 159,
    category_id: "reasoning",
    title: "Second-Order Effects & Unintended Consequences Engine",
    title_ar: "تأثيرات الدرجة الثانية والتداعيات غير المقصودة",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1620,
    is_template: true,
    tags: ["second-order", "systems-thinking", "strategy"],
    variables: ["[PROPOSED_POLICY]"],
    description: "Maps 1st, 2nd, and 3rd order unintended ripple effects of proposed policy decisions.",
    prompt: `Analyze proposed policy: [PROPOSED_POLICY].
Map ripple effects:
- 1st Order (Immediate direct impact)
- 2nd Order (Behavioral responses and market shifts)
- 3rd Order (Long-term systemic equilibrium change)`
  },
  {
    id: 160,
    category_id: "reasoning",
    title: "Deductive vs Inductive Logic Validator",
    title_ar: "صحة الحجج الاستنباطية والاستقرائية",
    difficulty: "medium",
    strength: 4,
    usage_count: 1150,
    is_template: true,
    tags: ["logic", "deduction", "induction", "validity"],
    variables: ["[ARGUMENT_TEXT]"],
    description: "Evaluates argument validity, soundness, and premise truth.",
    prompt: `Evaluate argument:
"[ARGUMENT_TEXT]"

Determine if argument is Deductive or Inductive. Test for validity, soundness, and logical fallacies.`
  },
  {
    id: 161,
    category_id: "reasoning",
    title: "Occam's Razor Simplicity Evaluator",
    title_ar: "شفرة أوكام للتبسيط واختيار التفسير الأبسط",
    difficulty: "medium",
    strength: 3,
    usage_count: 1280,
    is_template: true,
    tags: ["occams-razor", "simplicity", "explanation"],
    variables: ["[OBSERVED_PHENOMENON]"],
    description: "Compares competing hypotheses using Occam's Razor principle.",
    prompt: `Examine phenomenon: [OBSERVED_PHENOMENON].
Compare 3 competing explanations. Identify which explanation makes the fewest unverified assumptions per Occam's Razor.`
  },
  {
    id: 162,
    category_id: "reasoning",
    title: "Pareto Principle 80/20 High-Leverage Identification",
    title_ar: "قاعدة باريتو 80/20 لتحديد الرافعة العالية",
    difficulty: "medium",
    strength: 4,
    usage_count: 2100,
    is_template: true,
    tags: ["pareto", "80-20", "productivity", "focus"],
    variables: ["[GOAL_OR_PROBLEM]"],
    description: "Identifies the 20% high-leverage activities responsible for 80% of desired results.",
    prompt: `Apply the 80/20 Pareto Principle to [GOAL_OR_PROBLEM].
Identify the 20% vital inputs driving 80% of outputs, and list what 80% low-impact noise to eliminate immediately.`
  },
  {
    id: 163,
    category_id: "reasoning",
    title: "Fermi Estimate & Back-of-the-Envelope Calculation",
    title_ar: "تقديرات فيرمي السريعة Fermi Estimation",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1420,
    is_template: true,
    tags: ["fermi", "estimation", "math", "problem-solving"],
    variables: ["[IMPOSSIBLE_QUESTION]"],
    description: "Estimates order of magnitude for seemingly impossible questions using dimensional analysis.",
    prompt: `Provide a Fermi estimate for: "[IMPOSSIBLE_QUESTION]".
Break down into key order-of-magnitude assumptions, showing back-of-the-envelope math.`
  },
  {
    id: 164,
    category_id: "reasoning",
    title: "Cynefin Framework Domain Categorizer",
    title_ar: "إطار كاينفين اتخاذ القرارات في التعقيد",
    difficulty: "expert",
    strength: 5,
    usage_count: 1090,
    is_template: true,
    tags: ["cynefin", "decision-making", "complexity"],
    variables: ["[ORGANIZATIONAL_SITUATION]"],
    description: "Categorizes situation into Clear, Complicated, Complex, or Chaotic domain with response protocol.",
    prompt: `Categorize situation [ORGANIZATIONAL_SITUATION] using the Cynefin Framework.
Is it Clear (Sense-Categorize-Respond), Complicated (Sense-Analyze-Respond), Complex (Probe-Sense-Respond), or Chaotic?`
  },
  {
    id: 165,
    category_id: "reasoning",
    title: "Cognitive Bias Identification Matrix",
    title_ar: "اكتشاف وتحليل التحيزات المعرفية الإدراكية",
    difficulty: "medium",
    strength: 4,
    usage_count: 1540,
    is_template: true,
    tags: ["cognitive-bias", "psychology", "decision-making"],
    variables: ["[DECISION_STORY]"],
    description: "Detects confirmation bias, sunk cost fallacy, availability heuristic in decision narratives.",
    prompt: `Analyze decision story: "[DECISION_STORY]".
Identify 3 active cognitive biases distorting clear judgment and provide debiasing counter-questions.`
  },
  {
    id: 166,
    category_id: "reasoning",
    title: "Scientific Hypothesis Testing Protocol",
    title_ar: "تصميم تجربة اختبار الفرضيات العلمية",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1250,
    is_template: true,
    tags: ["scientific-method", "hypothesis", "experiment"],
    variables: ["[RESEARCH_QUESTION]"],
    description: "Formulates testable null/alternative hypothesis with controlled variable experiment design.",
    prompt: `Design scientific research protocol for [RESEARCH_QUESTION].
Formulate Null Hypothesis (H0) & Alternative Hypothesis (H1), control vs independent variables, and p-value significance target.`
  },
  {
    id: 167,
    category_id: "reasoning",
    title: "Algorithmic Complexity & Big-O Notation Prover",
    title_ar: "إثبات وتحديد التعقيد الخوارزمي Big-O",
    difficulty: "expert",
    strength: 5,
    usage_count: 1680,
    is_template: true,
    tags: ["big-o", "algorithms", "complexity", "computer-science"],
    variables: ["[ALGORITHM_CODE]"],
    description: "Analyzes worst, average, and best-case time/space complexity.",
    prompt: `Analyze algorithm:
\`\`\`
[ALGORITHM_CODE]
\`\`\`
Determine worst-case O(N), best-case Ω(N), and space complexity with formal mathematical step explanation.`
  },
  {
    id: 168,
    category_id: "reasoning",
    title: "Trilemma & Trade-off Optimization Engine",
    title_ar: "موازن المقايضات الصعبة والتريليما الثلاثية",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1390,
    is_template: true,
    tags: ["tradeoff", "trilemma", "optimization"],
    variables: ["[THREE_COMPETING_GOALS]"],
    description: "Evaluates impossible trinity trade-offs (e.g. Speed vs Quality vs Cost).",
    prompt: `Evaluate trilemma trade-off between: [THREE_COMPETING_GOALS].
Provide Pareto frontier analysis showing what must be sacrificed under each strategic configuration.`
  }
];
