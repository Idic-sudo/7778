import { PromptItem } from '../../types';

export const CREATIVE_PROMPTS: PromptItem[] = [
  {
    id: 169,
    category_id: "creative",
    title: "Sci-Fi Universe & Lore Worldbuilder Engine",
    title_ar: "بناء العوالم الخيالية والفلكلور (Worldbuilding)",
    difficulty: "advanced",
    strength: 5,
    usage_count: 2200,
    is_template: true,
    tags: ["worldbuilding", "sci-fi", "lore", "creative"],
    variables: ["[PLANET_THEME]", "[MAGIC_OR_TECH_SYSTEM]"],
    description: "Builds comprehensive fictional world lore covering geography, magic/tech rules, and faction politics.",
    prompt: `Create a fictional world bible for a world themed around [PLANET_THEME].
Include:
1. Core Magic/Tech Rules and limitations: [MAGIC_OR_TECH_SYSTEM]
2. 3 major competing factions and their ideologies
3. Unique cultural rituals and idioms`
  },
  {
    id: 170,
    category_id: "creative",
    title: "Arabic Classical & Modern Poetry Composer",
    title_ar: "تأليف الشعر العربي الفصيح والعمودي",
    difficulty: "advanced",
    strength: 5,
    usage_count: 2800,
    is_template: true,
    tags: ["poetry", "arabic", "literature", "creative"],
    variables: ["[POEM_TOPIC]", "[POETIC_METER]"],
    description: "Composes classical Arabic poetry on specified meter (بحور الشعر العربي).",
    prompt: `اكتب قصيدة شعرية عربية فصيحة موزونة ومقفاة تتكون من 8 أبيات عن [POEM_TOPIC].
البحر الشعري المطلوب: [POETIC_METER] (مثل البحر الطويل أو الكامل).
التزم بالجزالة وقوة المفردات وسلاسة المعنى.`
  },
  {
    id: 171,
    category_id: "creative",
    title: "Cinematic Movie Script Plot Twist Generator",
    title_ar: "توليد الالتواءات الحبكة السينمائية المذهلة",
    difficulty: "medium",
    strength: 4,
    usage_count: 1980,
    is_template: true,
    tags: ["screenplay", "plot-twist", "movies", "storytelling"],
    variables: ["[INITIAL_STORY_PREMISE]"],
    description: "Generates 3 mind-bending narrative plot twists that recontextualize entire story events.",
    prompt: `Based on initial story premise: "[INITIAL_STORY_PREMISE]"
Generate 3 mind-bending plot twists that completely recontextualize previous events without creating plot holes.`
  },
  {
    id: 172,
    category_id: "creative",
    title: "Interactive Choice-Driven RPG Story Adventure",
    title_ar: "قصة تفاعلية متعددة المسارات والخيارات",
    difficulty: "medium",
    strength: 4,
    usage_count: 2400,
    is_template: true,
    tags: ["interactive", "choose-adventure", "story", "rpg"],
    variables: ["[ADVENTURE_THEME]"],
    description: "Branching story engine offering 3 distinct user choices at the end of every scene.",
    prompt: `Begin an interactive choose-your-own-adventure story set in [ADVENTURE_THEME].
Write Scene 1 (200 words) and present 3 distinct choices (A, B, C) for what the player does next.`
  },
  {
    id: 173,
    category_id: "creative",
    title: "Character Flaw & Backstory Origin Generator",
    title_ar: "بناء خلفيات الشخصيات والعيوب النفسية",
    difficulty: "medium",
    strength: 4,
    usage_count: 1750,
    is_template: true,
    tags: ["character-design", "backstory", "writing"],
    variables: ["[CHARACTER_ARCHETYPE]"],
    description: "Creates complex characters with internal contradictions, ghost trauma, and lie they believe.",
    prompt: `Design a multi-layered character profile for a [CHARACTER_ARCHETYPE].
Include: Ghost/Trauma from past, Lie they believe about themselves, Internal Want vs External Need.`
  },
  {
    id: 174,
    category_id: "creative",
    title: "High-Concept Sci-Fi Novel Premise Pitch",
    title_ar: "أفكار الروايات الخيالية والعلمية المبتكرة",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1620,
    is_template: true,
    tags: ["sci-fi", "novel", "pitch", "ideas"],
    variables: ["[CORE_WHAT_IF_QUESTION]"],
    description: "Pitches high-concept novel based on 'What If' speculative science premise.",
    prompt: `Pitch a high-concept sci-fi novel based on: "What if [CORE_WHAT_IF_QUESTION]?"
Provide 1-sentence logline, protagonist arc, major antagonist force, and climactic ending.`
  },
  {
    id: 175,
    category_id: "creative",
    title: "Child Storybook Narrative with Morals",
    title_ar: "قصص الأطفال الممتعة ذات العبر النبيلة",
    difficulty: "beginner",
    strength: 3,
    usage_count: 2100,
    is_template: true,
    tags: ["children", "storybook", "fable", "kids"],
    variables: ["[ANIMAL_HERO]", "[MORAL_LESSON]"],
    description: "Charming children's illustrated story teaching kindness, honesty, or perseverance.",
    prompt: `Write a bedtime story for 6-year-old kids starring a brave little [ANIMAL_HERO].
Teach the valuable moral lesson of [MORAL_LESSON] through gentle, imaginative adventures.`
  },
  {
    id: 176,
    category_id: "creative",
    title: "Horror Supernatural Suspense Scene Writer",
    title_ar: "مشاهد الرعب والتشويق والنهايات المظلمة",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1890,
    is_template: true,
    tags: ["horror", "suspense", "atmospheric", "writing"],
    variables: ["[HAUNTED_LOCATION]"],
    description: "Atmospheric horror scene writing leveraging sensory dread and psychological tension.",
    prompt: `Write a scary, suspenseful horror scene set in [HAUNTED_LOCATION].
Focus heavily on auditory and claustrophobic sensory descriptions building up to a terrifying reveal.`
  },
  {
    id: 177,
    category_id: "creative",
    title: "Humorous Satirical Essay & Parody",
    title_ar: "المقالات الساخرة والكوميدية الممتعة",
    difficulty: "medium",
    strength: 3,
    usage_count: 1450,
    is_template: true,
    tags: ["humor", "satire", "parody", "comedy"],
    variables: ["[MODERN_OBSESSION]"],
    description: "Witty, satirical essay poking fun at modern societal trends in The Onion style.",
    prompt: `Write a hilarious satirical essay in the style of The Onion parodying people's obsession with [MODERN_OBSESSION].`
  },
  {
    id: 178,
    category_id: "creative",
    title: "Fantasy Magic System Rules & Limitations Matrix",
    title_ar: "تصميم أنظمة السحر الخيالية بقواعد محددة",
    difficulty: "expert",
    strength: 5,
    usage_count: 1320,
    is_template: true,
    tags: ["magic-system", "hard-fantasy", "sanderson"],
    variables: ["[SOURCE_OF_MAGIC]"],
    description: "Brandon Sanderson style hard magic system with explicit costs and limitations.",
    prompt: `Design a hard fantasy magic system based on [SOURCE_OF_MAGIC].
Detail: Source of power, Physical cost to caster, 3 specific spells, and 2 strict breaking limitations.`
  },
  {
    id: 179,
    category_id: "creative",
    title: "Song Lyrics & Melody Rhythm Composer",
    title_ar: "تأليف كلمات الأغاني والألحان والإيقاع",
    difficulty: "medium",
    strength: 4,
    usage_count: 2250,
    is_template: true,
    tags: ["music", "lyrics", "songwriting", "chorus"],
    variables: ["[GENRE]", "[EMOTIONAL_THEME]"],
    description: "Composes Verse-Chorus-Verse-Bridge song lyrics with rhyme scheme and tempo guidance.",
    prompt: `Write full song lyrics for a [GENRE] track exploring [EMOTIONAL_THEME].
Structure: Verse 1, Pre-Chorus, Chorus, Verse 2, Bridge, Outro. Include BPM and musical vibe notes.`
  },
  {
    id: 180,
    category_id: "creative",
    title: "Fictional Language (Conlang) Grammar & Vocabulary",
    title_ar: "ابتكار اللغات الخيالية (Conlang) والمفردات",
    difficulty: "expert",
    strength: 5,
    usage_count: 1050,
    is_template: true,
    tags: ["conlang", "linguistics", "worldbuilding"],
    variables: ["[SPECIES_OR_CULTURE]"],
    description: "Creates fictional constructed language phonology, basic grammar syntax, and 20 core words.",
    prompt: `Develop a constructed language (Conlang) for [SPECIES_OR_CULTURE].
Provide phonology rules, SOV/SVO word order syntax, and 20 sample vocabulary words with translations.`
  },
  {
    id: 181,
    category_id: "creative",
    title: "Visual Metaphor & Imagery Generator",
    title_ar: "توليد الصور البلاغية والتشبيهات الفنية",
    difficulty: "medium",
    strength: 3,
    usage_count: 1380,
    is_template: true,
    tags: ["metaphor", "imagery", "literary-devices"],
    variables: ["[ABSTRACT_EMOTION]"],
    description: "Generates 5 striking poetic metaphors describing abstract emotions.",
    prompt: `Generate 5 vivid, unconventional literary metaphors capturing the experience of [ABSTRACT_EMOTION].`
  },
  {
    id: 182,
    category_id: "creative",
    title: "Steampunk Alternate History Narrative",
    title_ar: "قصص التاريخ البديل والثورة البخارية",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1190,
    is_template: true,
    tags: ["alternate-history", "steampunk", "victorian"],
    variables: ["[HISTORICAL_EVENT]"],
    description: "Reimagines historical events as taking place in a steampunk technological timeline.",
    prompt: `Write an alternate history story reimagining [HISTORICAL_EVENT] as taking place in a clockwork steampunk world.`
  },
  {
    id: 183,
    category_id: "creative",
    title: "Surreal Dream Scene & Stream-of-Consciousness",
    title_ar: "تداعي الأفكار وتجسيد مشاهد الأحلام",
    difficulty: "medium",
    strength: 3,
    usage_count: 1100,
    is_template: true,
    tags: ["surrealism", "stream-of-consciousness", "dream"],
    variables: ["[DREAM_SYMBOL]"],
    description: "Surrealist stream-of-consciousness passage featuring dream logic around central symbol.",
    prompt: `Write a surrealist stream-of-consciousness story sequence centered around [DREAM_SYMBOL] in the style of Franz Kafka.`
  },
  {
    id: 184,
    category_id: "creative",
    title: "Manga & Comic Book Page Layout Script",
    title_ar: "كتابة سيناريو صفحات المانجا والكوميكس",
    difficulty: "advanced",
    strength: 4,
    usage_count: 1540,
    is_template: true,
    tags: ["manga", "comic", "panel-script", "anime"],
    variables: ["[ACTION_BATTLE]"],
    description: "Script for a 5-panel manga page detailing visual framing, action sound effects (SFX), and speech bubbles.",
    prompt: `Write a panel-by-panel script for a 5-panel comic book page featuring [ACTION_BATTLE].
Specify Panel layout, visual angle, manga SFX sound effects, and character dialogue balloons.`
  }
];
