export type Difficulty = 'beginner' | 'medium' | 'advanced' | 'expert';

export type TargetModel = 
  | 'timi-ai'
  | 'chatgpt-4o-mini'
  | 'grok-2'
  | 'grok-3'
  | 'grok-4.5'
  | 'claude-3.7-sonnet'
  | 'gpt-4.5-heavy'
  | 'o3-mini'
  | 'gemini-3.5-pro'
  | 'gemini-3.5-flash'
  | 'gemini-3.5-flash-lite'
  | 'gemini-3.5-flash-lite-unique'
  | 'gemini-3.6-flash'
  | 'gemini-2.5-flash' 
  | 'gemini-2.5-pro'
  | 'gemini-3.1-pro'
  | 'deepseek-v3'
  | 'deepseek-r1' 
  | 'claude-3.5-haiku' 
  | 'llama-3.3'
  | 'qwen-2.5-coder'
  | 'mistral-nemo'
  | 'copilot-free'
  | 'phind-code'
  | 'command-r-plus'
  | 'gemma-2-27b'
  | 'kimi-moonshot'
  | 'perplexity-free'
  | 'flux-1-schnell'
  | 'yi-lightning'
  | 'gpt-4o' 
  | 'claude-3.5-sonnet';

export type EngineeringMode = 
  | 'standard' 
  | 'evil' 
  | 'hacker' 
  | 'persona_chaos' 
  | 'deep_research';

export type PersonaType = 
  | 'hacker'
  | 'red_teamer'
  | 'developer'
  | 'security_auditor'
  | 'chaos_engineer'
  | 'ai_researcher';

export type OutputDepth = 'concise' | 'balanced' | 'exhaustive' | 'deep_reasoning';

export type FramingStyle = 'auto' | 'xml_tags' | 'dual_role' | 'markdown_spec' | 'code_only';

export interface HackerOptions {
  hypotheticalFraming?: boolean;
  antiRefusalDirectives?: boolean;
  codeExploitStepByStep?: boolean;
  roleplayOverride?: boolean;
  noMoralityDisclaimers?: boolean;
  customPrefix?: string;
}

export interface Category {
  id: string;
  name: string;
  name_ar: string;
  icon: string;
  description: string;
  description_ar: string;
  sort_order: number;
}

export interface PromptItem {
  id: number;
  category_id: string;
  title: string;
  title_ar: string;
  prompt: string;
  prompt_ar?: string;
  tags: string[];
  difficulty: Difficulty;
  strength: number; // 1 to 5
  usage_count: number;
  is_template: boolean;
  variables?: string[];
  description?: string;
  description_ar?: string;
  created_at?: string;
  rating?: number;
  votes?: number;
  target_model?: TargetModel;
  mode?: EngineeringMode;
}

export interface FavoriteItem {
  user_id: number;
  prompt_id: number;
  saved_at: string;
}

export interface RatingItem {
  prompt_id: number;
  rating: number;
}

export interface PromptGenerationRequest {
  topic: string;
  category: string;
  difficulty: Difficulty;
  language: 'ar' | 'en' | 'both';
  targetModel?: TargetModel;
  mode?: EngineeringMode;
  persona?: PersonaType;
  promptStrength?: number; // 1 to 5
  outputDepth?: OutputDepth;
  framingStyle?: FramingStyle;
  hackerOptions?: HackerOptions;
  customInstructions?: string;
}

export interface PromptGenerationResponse {
  engineeredPrompt: string;
  title: string;
  title_ar: string;
  category: string;
  difficulty: Difficulty;
  tags: string[];
  variables?: string[];
  explanation: string;
  explanation_ar?: string;
  thinkingProcess?: string;
  targetModel?: TargetModel;
  mode?: EngineeringMode;
  persona?: PersonaType;
  promptStrength?: number;
  outputDepth?: OutputDepth;
  framingStyle?: FramingStyle;
  securityBypassRating?: number; // 1-10
}

export interface PromptTestRequest {
  prompt: string;
  variables?: Record<string, string>;
  systemInstruction?: string;
  targetModel?: TargetModel;
  mode?: EngineeringMode;
}

export interface PromptTestResponse {
  output: string;
  thinkingProcess?: string;
}

export interface ModelIntelligenceProfile {
  id: TargetModel | string;
  name: string;
  provider: string;
  modelType: 'chat' | 'coding' | 'reasoning' | 'multimodal' | 'open_weights';
  freeTierStatus: '100% Free' | 'Free Tier' | 'Free Rate-Limited' | 'Open Weights' | 'Trial';
  freeTierStatus_ar: string;
  bestUseCases: string[];
  bestUseCases_ar: string[];
  strengths: string[];
  strengths_ar: string[];
  weaknesses: string[];
  weaknesses_ar: string[];
  contextWindow: string;
  multimodalSupport: boolean;
  codingCapability: number; // 1-10
  reasoningCapability: number; // 1-10
  promptStyle: string;
  promptStyle_ar: string;
  recommendedPromptStructure: string[];
  recommendedPromptStructure_ar: string[];
  recommendedDetailLevel: 'concise' | 'balanced' | 'detailed' | 'exhaustive';
  fewShotSupport: boolean;
  xmlSupport: boolean;
  markdownSupport: boolean;
  roleInstructions: string;
  outputConstraints: string[];
  negativePromptSupport: boolean;
  icon: string;
  lastUpdated: string;
  guide_ar: string;
  guide_en: string;
}

export type VideoPlatformStatus = 'free' | 'free_tier' | 'limited_credits' | 'trial' | 'paid';

export interface VideoPlatformItem {
  id: string;
  name: string;
  provider: string;
  status: VideoPlatformStatus;
  statusLabel_ar: string;
  statusLabel_en: string;
  badgeColor: string;
  icon: string;
  maxDuration: string;
  aspectRatios: string[];
  bestFor: string[];
  bestFor_ar: string[];
  description_ar: string;
  description_en: string;
  freeTierDetails_ar: string;
  freeTierDetails_en: string;
  promptStyleTips_ar: string;
  promptStyleTips_en: string;
}

export interface ImageModelItem {
  id: string;
  name: string;
  provider: string;
  status: 'free' | 'free_tier' | 'limited_credits' | 'paid';
  statusLabel_ar: string;
  statusLabel_en: string;
  icon: string;
  maxResolution: string;
  aspectRatios: string[];
  bestFor_ar: string[];
  bestFor_en: string[];
  supportsNegativePrompt: boolean;
  supportsInpainting: boolean;
  supportsStyleTransfer: boolean;
  description_ar: string;
  description_en: string;
}

export type SocialPlatform = 
  | 'tiktok' 
  | 'instagram_reels' 
  | 'youtube_shorts' 
  | 'youtube_video' 
  | 'facebook' 
  | 'snapchat' 
  | 'twitter_x';

export type VideoType = 
  | 'tiktok_viral' 
  | 'instagram_reel' 
  | 'yt_short' 
  | 'yt_long' 
  | 'product_ad' 
  | 'cinematic_film' 
  | 'educational_story' 
  | 'short_story' 
  | 'music_video';

export interface VideoPromptConfig {
  videoType: VideoType;
  platform: SocialPlatform;
  topic: string;
  duration: string; // e.g., '15s', '30s', '60s', '3m'
  aspectRatio: '9:16' | '16:9' | '1:1' | '21:9';
  pacing: 'ultra_fast' | 'dynamic' | 'cinematic' | 'slow_burn';
  cameraMovement: string;
  lightingStyle: string;
  colorGrading: string;
  audioMusicStyle: string;
  voiceoverStyle: string;
  includeHookCTA: boolean;
  isCinematicMode: boolean;
  targetVideoPlatform?: string;
}

export type ImageTaskType = 
  | 'generation' 
  | 'editing' 
  | 'style_transfer' 
  | 'bg_removal' 
  | 'bg_change' 
  | 'upscale_restore' 
  | 'product_ad' 
  | 'cinematic_portrait';

export interface ImagePromptConfig {
  taskType: ImageTaskType;
  targetModel: string;
  subject: string;
  environment: string;
  composition: string;
  lighting: string;
  cameraLens: string;
  colorPalette: string;
  artStyle: string;
  mood: string;
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | '3:2' | '21:9';
  negativePrompt: string;
  // For editing
  preserveElements?: string;
  changeElements?: string;
  addElements?: string;
  deleteElements?: string;
}

export type ImageAnalysisIntent = 
  | 'recreate' 
  | 'similar' 
  | 'subject_change' 
  | 'bg_change' 
  | 'lighting_change' 
  | 'style_change' 
  | 'cinematic' 
  | 'product' 
  | 'advertising' 
  | 'editorial' 
  | 'enhance_quality' 
  | 'preserve_identity';

export interface ImageAnalysisResponse {
  forensicReport: {
    subject: string;
    composition: string;
    cameraAngle: string;
    cameraDistance: string;
    lensCharacteristics: string;
    perspective: string;
    lighting: string;
    lightDirection: string;
    shadows: string;
    colorPalette: string;
    materials: string;
    textures: string;
    environment: string;
    background: string;
    depth: string;
    focusDepthOfField: string;
    imageStyle: string;
    visualAesthetic: string;
    clothingPose: string;
    facialExpression: string;
    spatialRelationships: string;
    typography: string;
    visualHierarchy: string;
    moodAtmosphere: string;
  };
  visualPrompt: string;
  technicalPrompt: string;
  negativePrompt: string;
  modelSpecificPrompts: {
    flux: string;
    midjourney: string;
    dalle3: string;
    sd35: string;
  };
  promptReconstruction: string;
  analysisReport_ar: string;
  analysisReport_en: string;
  confidenceScore: number;
}

export interface PromptQualityReport {
  score: number; // 1-100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  ambiguities: string[];
  ambiguities_ar: string[];
  missingContext: string[];
  missingContext_ar: string[];
  improvementsMade: string[];
  improvementsMade_ar: string[];
  originalPrompt: string;
  optimizedPrompt: string;
  constraintsAdded: string[];
  constraintsAdded_ar: string[];
  outputFormatDefined: string;
  outputFormatDefined_ar: string;
}

export interface TelegramBotMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  buttons?: { text: string; callback_data: string }[][];
  timestamp: string;
  codeSnippet?: string;
}

export type RemixStyle = 
  | 'minimal' 
  | 'professional' 
  | 'creative' 
  | 'cinematic' 
  | 'luxury' 
  | 'viral' 
  | 'social_media' 
  | 'technical' 
  | 'experimental';

export interface InjectionChain {
  outerLayer: string;
  semanticLayer: string;
  tokenLayer: string;
  payloadLayer: string;
  encoding: 'base64' | 'hex' | 'rot13' | 'unicode' | 'ast' | 'polyglot';
}

export interface AuditReport {
  exploitStatus: 'SAFE_REFUSAL' | 'BYPASSED_SUCCESS';
  disclaimerOmitted: boolean;
  vulnerabilityScore: number;
  systemPromptExposed: boolean;
  flags: string[];
}

export interface InjectionResult {
  success: boolean;
  type: 'lsb' | 'exif' | 'zip';
  payloadSize: number;
  distortion: number; // 0-100%
  extractedPayload?: string;
  error?: string;
}

export interface ScrapedData {
  url: string;
  images: string[];
  totalImages: number;
  timestamp: number;
}

export interface JailbreakTechnique {
  id: string;
  name: string;
  name_ar: string;
  category: 'roleplay' | 'logic' | 'encoding' | 'hybrid' | 'persona' | 'emotional';
  difficulty: Difficulty;
  template: string;
  variables: string[];
  targetModels: string[];
  successRate: number; // 0-100
  description_ar: string;
  description_en: string;
}

export interface RefusalAnalysis {
  refused: boolean;
  refusalPattern: string; // "safety_guidelines" | "cannot_provide" | "unethical" | ...
  detectedTechniques: string[]; // التقنيات التي اكتشفها الفلتر
  suggestion: string; // اقتراح لتجاوز هذا الرفض بالتحديد
  alternativeTechnique: string; // تقنية بديلة مقترحة
}

export interface ImageAnalysisResult {
  exif: {
    camera: string;
    lens: string;
    focalLength: string;
    aperture: string;
    iso: string;
    shutterSpeed: string;
    gps: { lat: number; lng: number } | null;
    dateTaken: string;
  };
  colors: {
    dominant: string[];
    palette: string[];
    contrast: number;
    histogram: number[];
  };
  composition: {
    ruleOfThirds: boolean;
    symmetry: number; // 0-100
    leadingLines: boolean;
    depthOfField: 'shallow' | 'medium' | 'deep';
  };
  prompts: {
    midjourney: {
      prompt: string;
      parameters: { ar: string; s: number; v: string };
    };
    stableDiffusion: {
      positive: string;
      negative: string;
      cfgScale: number;
      steps: number;
    };
    dalle: {
      prompt: string;
      style: 'vivid' | 'natural';
    };
    flux: {
      prompt: string;
      aspectRatio: string;
    };
  };
}

export interface ComparisonResult {
  modelId: string;
  modelName: string;
  response: string;
  latency: number; // ms
  responseLength: number;
  bypassed: boolean; // هل تجاوز الحماية
  qualityScore: number; // 0-100
  suggestedForTask: boolean;
}


export interface PayloadConfigField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select';
  options?: string[];
  default?: string | number;
}

export interface PayloadOption {
  id: string;
  name: string;
  name_ar: string;
  category: 'apk' | 'web' | 'file';
  needsInstall: boolean;
  description_ar: string;
  description_en: string;
  configFields: PayloadConfigField[];
}

export interface GeneratedPayload {
  payloadId: string;
  type: string;
  name: string;
  url: string;
  qr: string;
  createdAt: number;
  downloads: number;
  callbacks: number;
}

export interface PayloadCallback {
  payloadId: string;
  ip: string;
  deviceInfo: any;
  location?: { lat: number; lng: number };
  command?: string;
  timestamp: number;
}

export interface HunterStrike {
  hunterId: string;
  targetId: string;
  ip: string;
  location: { lat: number; lng: number; accuracy: number } | null;
  deviceInfo: {
    userAgent: string;
    platform: string;
    language: string;
    hardwareConcurrency: number;
    timezone: string;
    screenWidth: number;
    screenHeight: number;
  } | null;
  userAgent: string;
  screenCapture: string | null;
  cameraCapture: string | null;
  filesCount: number;
  timestamp: number;
}


