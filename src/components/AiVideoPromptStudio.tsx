import React, { useState } from 'react';
import { VideoPromptConfig, SocialPlatform, VideoType, VideoPlatformItem } from '../types';
import { VIDEO_PLATFORMS_REGISTRY } from '../data/modelIntelligenceData';
import { Film, Video, Tv, Play, Sparkles, Clapperboard, Copy, Check, Compass, Eye, Volume2, Camera, Layers, Wand2, ShieldCheck, Zap } from 'lucide-react';

interface AiVideoPromptStudioProps {
  language: 'ar' | 'en';
  onTestInPlayground?: (prompt: string) => void;
}

export const AiVideoPromptStudio: React.FC<AiVideoPromptStudioProps> = ({ language, onTestInPlayground }) => {
  const isAr = language === 'ar';
  const [copied, setCopied] = useState(false);

  const [config, setConfig] = useState<VideoPromptConfig>({
    videoType: 'tiktok_viral',
    platform: 'tiktok',
    topic: 'فيديو ترويجي لمنتج تجميل طبيعي باستخدام الزيوت النادرة',
    duration: '30s',
    aspectRatio: '9:16',
    pacing: 'ultra_fast',
    cameraMovement: 'Cinematic Push-In & Slow Orbit',
    lightingStyle: 'Volumetric Soft Studio Lighting',
    colorGrading: 'Teal & Orange Modern Aesthetic',
    audioMusicStyle: 'Upbeat Lo-Fi Ambient Beat',
    voiceoverStyle: 'Confident Executive Warm Arabic Voice',
    includeHookCTA: true,
    isCinematicMode: false,
    targetVideoPlatform: 'kling-ai'
  });

  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [recommendedPlatforms, setRecommendedPlatforms] = useState<VideoPlatformItem[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Social platforms metadata
  const socialPlatforms = [
    { id: 'tiktok', label: 'TikTok', icon: '📱', defaultRatio: '9:16', pacing: 'ultra_fast' },
    { id: 'instagram_reels', label: 'Instagram Reels', icon: '📸', defaultRatio: '9:16', pacing: 'dynamic' },
    { id: 'youtube_shorts', label: 'YouTube Shorts', icon: '▶️', defaultRatio: '9:16', pacing: 'ultra_fast' },
    { id: 'youtube_video', label: 'YouTube (Long)', icon: '📺', defaultRatio: '16:9', pacing: 'cinematic' },
    { id: 'facebook', label: 'Facebook Watch', icon: '📘', defaultRatio: '1:1', pacing: 'dynamic' },
    { id: 'snapchat', label: 'Snapchat Spotlight', icon: '👻', defaultRatio: '9:16', pacing: 'ultra_fast' },
    { id: 'twitter_x', label: 'X (Twitter)', icon: '🕳️', defaultRatio: '16:9', pacing: 'dynamic' }
  ];

  // Video types metadata
  const videoTypes = [
    { id: 'tiktok_viral', name_ar: '📱 فيديو TikTok انتشاري', name_en: 'Viral TikTok', desc_ar: 'تركيز على اول 3 ثواني (Hook) ووتيرة سريعة 9:16', desc_en: 'First 3s hook focus with fast 9:16 vertical pacing' },
    { id: 'instagram_reel', name_ar: '📸 Instagram Reel جمالي', name_en: 'Aesthetic Reel', desc_ar: 'إضاءة راقية، هوية بصرية، وتنسيق رأسي 9:16', desc_en: 'Luxury lighting and brand identity in 9:16' },
    { id: 'yt_short', name_ar: '▶️ YouTube Short تعليمي', name_en: 'YouTube Short', desc_ar: 'احتفاظ بالمشاهدة، حبكة سريعة، وCTA في النهاية', desc_en: 'High retention narrative with clear end CTA' },
    { id: 'yt_long', name_ar: '📺 فيديو YouTube وثائقي/كامل', name_en: 'YouTube Long Form', desc_ar: 'فصول، مقدمة مشوقة، وسياق قصصي 16:9', desc_en: 'Chapters, engaging intro and storytelling in 16:9' },
    { id: 'product_ad', name_ar: '🛍️ إعلان منتج استثماري', name_en: 'Product Commercial', desc_ar: 'تركيز على زوايا المنتج والواقعية والإغراء البصري', desc_en: 'Product camera angles and realistic macro focus' },
    { id: 'cinematic_film', name_ar: '🎬 فيلم سينمائي محبوك', name_en: 'Cinematic Film', desc_ar: 'عدسات 35mm، إضاءة درامية، وانتقالات إخراجية', desc_en: '35mm lenses, dramatic lighting, directorial cuts' },
    { id: 'educational_story', name_ar: '📚 قصصية تعليمية وحقائق', name_en: 'Educational Story', desc_ar: 'رسوم بيانية، كابشن متفاعل، ورواية ممتعة', desc_en: 'Graphics, interactive captions, engaging facts' },
    { id: 'music_video', name_ar: '🎵 فيديو كليب موسيقي', name_en: 'Music Video', desc_ar: 'تزامن مع الإيقاع، ألوان نيون، ومؤثرات حركية', desc_en: 'Beat synchronization, neon grading, kinetic FX' }
  ];

  const handlePlatformSelect = (pId: string) => {
    const p = socialPlatforms.find((sp) => sp.id === pId);
    if (!p) return;
    setConfig((prev) => ({
      ...prev,
      platform: pId as SocialPlatform,
      aspectRatio: p.defaultRatio as any,
      pacing: p.pacing as any
    }));
  };

  const handleGenerateVideoPrompt = () => {
    setIsGenerating(true);

    setTimeout(() => {
      // 1. Analyze and recommend video platforms
      let recs: VideoPlatformItem[] = [];
      if (config.isCinematicMode || config.videoType === 'cinematic_film') {
        recs = [VIDEO_PLATFORMS_REGISTRY[0], VIDEO_PLATFORMS_REGISTRY[1], VIDEO_PLATFORMS_REGISTRY[4]]; // Kling, Luma, Runway
      } else if (config.platform === 'tiktok' || config.platform === 'instagram_reels') {
        recs = [VIDEO_PLATFORMS_REGISTRY[2], VIDEO_PLATFORMS_REGISTRY[5], VIDEO_PLATFORMS_REGISTRY[0]]; // Hailuo, CapCut, Kling
      } else if (config.videoType === 'yt_long') {
        recs = [VIDEO_PLATFORMS_REGISTRY[6], VIDEO_PLATFORMS_REGISTRY[0], VIDEO_PLATFORMS_REGISTRY[1]]; // InVideo, Kling, Luma
      } else {
        recs = [VIDEO_PLATFORMS_REGISTRY[0], VIDEO_PLATFORMS_REGISTRY[2], VIDEO_PLATFORMS_REGISTRY[3]];
      }
      setRecommendedPlatforms(recs);

      // 2. Build High Precision Video Prompt
      let p = '';

      if (config.isCinematicMode) {
        p = `[🎬 CINEMATIC VIDEO DIRECTORIAL PROMPT]
PLATFORM: ${config.platform.toUpperCase()} (${config.aspectRatio}) | DURATION: ${config.duration}
TOPIC: ${config.topic}

[SHOT-BY-SHOT CINEMATIC STRUCTURE]
- SCENE 1 (THE HOOK - 00:00 to 00:03): High-contrast extreme close-up (ECU) introducing ${config.topic}. Camera utilizes ${config.cameraMovement}. 35mm anamorphic lens with shallow depth of field (f/1.8).
- SCENE 2 (THE CORE ACTION - 00:03 to 00:20): Mid-shot transitioning into a dynamic tracking movement. Environment featuring ${config.lightingStyle}. Color grading: ${config.colorGrading}.
- SCENE 3 (THE PEAK VISUAL - 00:20 to 00:27): Slow-motion 60fps capture emphasizing fluid motion, particle light reflections, and atmospheric depth.
- SCENE 4 (THE RESOLUTION & CTA - 00:27 to 00:30): Elegant whip pan ending on sleek branding.

[TECHNICAL CAMERA & LIGHTING PARAMETERS]
- Aspect Ratio: ${config.aspectRatio}
- Motion Pacing: ${config.pacing.toUpperCase()}
- Camera Mechanics: ${config.cameraMovement}, smooth dolly track
- Lighting Setup: ${config.lightingStyle}
- Color Palette: ${config.colorGrading}
- Sound Design & Music: ${config.audioMusicStyle} with rich bass undertones
- Voiceover Script Persona: ${config.voiceoverStyle}

[AI GENERATOR PROMPT SYNTAX - COPY DIRECTLY TO KLING / LUMA / RUNWAY]
"Cinematic 8k photorealistic video shot of ${config.topic}, ${config.cameraMovement}, ${config.lightingStyle}, ${config.colorGrading}, shot on 35mm lens, hyper-detailed physics, highly realistic textures, volumetric haze, 60fps, aspect ratio --ar ${config.aspectRatio.replace(':', ' ')}"`;
      } else {
        p = `[📱 VIRAL SOCIAL MEDIA VIDEO PROMPT - ${config.platform.toUpperCase()}]
VIDEO FORMAT: ${config.videoType.toUpperCase()} | ASPECT RATIO: ${config.aspectRatio} | DURATION: ${config.duration}
CORE OBJECTIVE: High retention video about "${config.topic}"

[HOOK & STORYBOARD BREAKDOWN]
1. VIRAL HOOK (0-3s): "Stop scrolling! Here is the secret behind ${config.topic}." Quick visual jump-cut with dynamic onscreen caption text.
2. STORY DEVELOPMENT (3-20s): Fast-paced sequence. Camera: ${config.cameraMovement}. Lighting: ${config.lightingStyle}.
3. CLIMAX & VALUE (20-25s): High engagement reveal showing the transformation or result.
4. CTA (25-30s): "Comment 'AI' to receive the full guide! Save & Share."

[AI VIDEO GENERATOR SYNTAX]
Prompt: "Hyper-engaging ${config.videoType} video featuring ${config.topic}, ${config.pacing} pacing, ${config.cameraMovement}, ${config.lightingStyle}, ${config.colorGrading}, professional studio quality, --ar ${config.aspectRatio.replace(':', ' ')}"

[VOICEOVER & AUDIO INSTRUCTIONS]
- Voice Style: ${config.voiceoverStyle}
- Background Music: ${config.audioMusicStyle}`;
      }

      setGeneratedPrompt(p);
      setIsGenerating(false);
    }, 400);
  };

  const copyToClipboard = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-[#00D1FF]/15 to-[#7000FF]/10 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/30 text-[#00D1FF] text-xs font-mono font-bold">
              <Clapperboard className="w-4 h-4 text-[#00D1FF]" />
              <span>{isAr ? 'استوديو توليد فيديوهات الذكاء الاصطناعي' : 'AI Video Prompt Studio v3.0'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
              🎬 {isAr ? 'استوديو برومبتات الفيديو والمنصات التفاعلية' : 'AI Video Prompt Studio & Platform Recommender'}
            </h1>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {isAr
                ? 'توليد برومبتات فيديو احترافية ومقاطع سينمائية لـ TikTok وReels وShorts، مع تحويل الفكرة إلى مشاهد، حركة كاميرا، وترشيح أحدث منصات الفيديو المجانية.'
                : 'Craft cinema-grade video prompts for TikTok, Reels, YouTube & Cinematic film with camera controls & AI video platform recommendations.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setConfig((prev) => ({ ...prev, isCinematicMode: !prev.isCinematicMode }))}
              className={`px-5 py-3 rounded-2xl border text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                config.isCinematicMode
                  ? 'bg-gradient-to-r from-[#7000FF] to-[#00D1FF] text-[#F8FAFC] border-[#00D1FF] shadow-lg shadow-[#00D1FF]/20 ring-2 ring-[#00D1FF]/40'
                  : 'bg-[#07090E] border-[#2D3748] text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <Film className="w-4 h-4 text-[#00D1FF]" />
              <span>{config.isCinematicMode ? (isAr ? '🎬 وضع CINEMATIC مفعّل' : '🎬 CINEMATIC MODE ON') : (isAr ? 'تفعيل وضع CINEMATIC' : 'Enable CINEMATIC MODE')}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Video Controls & Form */}
        <div className="lg:col-span-7 space-y-5 bg-[#0F1219] border border-[#2D3748] rounded-3xl p-6 shadow-xl">
          
          {/* 1. Social Platform Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-[#00D1FF] flex items-center gap-2">
              <Tv className="w-4 h-4 text-[#00D1FF]" />
              <span>{isAr ? '1. اختر منصة التواصل الاجتماعي المستهدفة:' : '1. Target Social Media Platform:'}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {socialPlatforms.map((sp) => {
                const isSelected = config.platform === sp.id;
                return (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => handlePlatformSelect(sp.id)}
                    className={`p-2.5 rounded-xl border text-center flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#00D1FF]/15 border-[#00D1FF] text-[#00D1FF] font-bold shadow-md'
                        : 'bg-[#07090E] border-[#2D3748] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#00D1FF]/30'
                    }`}
                  >
                    <span className="text-base">{sp.icon}</span>
                    <span className="text-xs font-mono truncate">{sp.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Video Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-[#00D1FF] flex items-center gap-2">
              <Video className="w-4 h-4 text-[#00D1FF]" />
              <span>{isAr ? '2. اختر نوع وأسلوب الفيديو:' : '2. Video Style & Category:'}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[180px] overflow-y-auto no-scrollbar pr-1">
              {videoTypes.map((vt) => {
                const isSelected = config.videoType === vt.id;
                return (
                  <button
                    key={vt.id}
                    type="button"
                    onClick={() => setConfig((prev) => ({ ...prev, videoType: vt.id as any }))}
                    className={`p-2.5 rounded-xl border text-right sm:text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#7000FF]/20 border-[#00D1FF] text-[#F8FAFC] font-bold'
                        : 'bg-[#07090E] border-[#2D3748] text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <span className="text-xs font-mono block text-[#F8FAFC]">{isAr ? vt.name_ar : vt.name_en}</span>
                    <span className="text-[10px] text-[#94A3B8] font-mono block truncate">{isAr ? vt.desc_ar : vt.desc_en}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Main Video Idea Topic Input */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-[#00D1FF] flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-[#00D1FF]" />
              <span>{isAr ? '3. وصف فكرة الفيديو أو المنتج:' : '3. Main Video Idea or Concept:'}</span>
            </label>
            <textarea
              rows={3}
              value={config.topic}
              onChange={(e) => setConfig((prev) => ({ ...prev, topic: e.target.value }))}
              placeholder={isAr ? 'مثال: فيديو سينمائي لمدينة مستقبلية بأسلوب الساtopunk مع سيارات تطير في الليل...' : 'E.g., Cinematic video of a cyberpunk futuristic city with flying cars at night...'}
              className="w-full bg-[#07090E] border border-[#2D3748] focus:border-[#00D1FF] rounded-2xl p-3.5 text-xs text-[#F8FAFC] focus:outline-none leading-relaxed"
            />
          </div>

          {/* 4. Technical Specs: Aspect Ratio, Duration, Camera, Lighting */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[#94A3B8]">{isAr ? 'أبعاد الفيديو:' : 'Aspect Ratio:'}</label>
              <select
                value={config.aspectRatio}
                onChange={(e) => setConfig((prev) => ({ ...prev, aspectRatio: e.target.value as any }))}
                className="w-full bg-[#07090E] border border-[#2D3748] rounded-xl p-2 text-xs text-[#F8FAFC] focus:outline-none"
              >
                <option value="9:16">9:16 (Vertical Reel/TikTok)</option>
                <option value="16:9">16:9 (Horizontal Widescreen)</option>
                <option value="1:1">1:1 (Square Post)</option>
                <option value="21:9">21:9 (Cinematic Ultrawide)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[#94A3B8]">{isAr ? 'مدة الفيديو:' : 'Duration:'}</label>
              <select
                value={config.duration}
                onChange={(e) => setConfig((prev) => ({ ...prev, duration: e.target.value }))}
                className="w-full bg-[#07090E] border border-[#2D3748] rounded-xl p-2 text-xs text-[#F8FAFC] focus:outline-none"
              >
                <option value="15s">15 Seconds</option>
                <option value="30s">30 Seconds</option>
                <option value="60s">60 Seconds</option>
                <option value="3m">3 Minutes</option>
              </select>
            </div>

            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-[11px] font-mono text-[#94A3B8]">{isAr ? 'حركة الكاميرا:' : 'Camera Motion:'}</label>
              <select
                value={config.cameraMovement}
                onChange={(e) => setConfig((prev) => ({ ...prev, cameraMovement: e.target.value }))}
                className="w-full bg-[#07090E] border border-[#2D3748] rounded-xl p-2 text-xs text-[#F8FAFC] focus:outline-none"
              >
                <option value="Cinematic Push-In & Slow Orbit">Push-In & Orbit</option>
                <option value="Fast Dynamic Tracking Pan">Fast Tracking Pan</option>
                <option value="Drone Aerial Overhead Shot">Drone Overhead</option>
                <option value="Handheld FPS Dynamic Motion">Handheld FPS</option>
              </select>
            </div>
          </div>

          {/* Action Generate Button */}
          <button
            type="button"
            onClick={handleGenerateVideoPrompt}
            disabled={isGenerating || !config.topic.trim()}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00D1FF] to-[#7000FF] hover:opacity-90 text-[#F8FAFC] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#00D1FF]/20 cursor-pointer disabled:opacity-50 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#F8FAFC]" />
            <span>{isGenerating ? (isAr ? 'جاري التوليد والتحليل...' : 'Generating Video Prompt...') : (isAr ? 'إنشاء برومبت الفيديو وترشيح المنصة' : 'Generate Video Prompt & Find Best Platform')}</span>
          </button>
        </div>

        {/* Right Column: Output & Platform Recommendation Engine */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* 1. Platform Recommendation Engine Box */}
          {recommendedPlatforms.length > 0 && (
            <div className="bg-[#0F1219] border border-[#00D1FF]/40 rounded-3xl p-5 space-y-3 shadow-xl animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#00D1FF] flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#00D1FF]" />
                  <span>{isAr ? '🎯 المنصات الأنسب مجاناً لهذا الفيديو:' : '🎯 Best Free AI Platforms for this Video:'}</span>
                </span>
              </div>

              <div className="space-y-2">
                {recommendedPlatforms.map((p) => (
                  <div key={p.id} className="p-3 rounded-2xl bg-[#07090E] border border-[#2D3748] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{p.icon}</span>
                      <div>
                        <span className="text-xs font-mono font-bold text-[#F8FAFC] block">{p.name}</span>
                        <span className="text-[10px] text-[#94A3B8] font-mono block">{p.provider} • Max {p.maxDuration}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${p.badgeColor}`}>
                      {isAr ? p.statusLabel_ar : p.statusLabel_en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Generated Prompt Output Display */}
          <div className="bg-[#0F1219] border border-[#2D3748] rounded-3xl p-5 space-y-3 shadow-xl relative min-h-[320px] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[#2D3748] pb-3">
              <span className="text-xs font-mono font-bold text-[#F8FAFC] flex items-center gap-2">
                <Film className="w-4 h-4 text-[#00D1FF]" />
                <span>{isAr ? 'برومبت الفيديو الاحترافي الجاهز:' : 'Generated Video Studio Prompt:'}</span>
              </span>

              {generatedPrompt && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="px-3 py-1 rounded-xl bg-[#00D1FF]/10 hover:bg-[#00D1FF]/20 text-[#00D1FF] text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-[#00D1FF]/30"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ البرومبت' : 'Copy')}</span>
                  </button>

                  {onTestInPlayground && (
                    <button
                      type="button"
                      onClick={() => onTestInPlayground(generatedPrompt)}
                      className="px-3 py-1 rounded-xl bg-[#7000FF]/20 hover:bg-[#7000FF]/30 text-[#F8FAFC] text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-[#7000FF]/40"
                    >
                      <Play className="w-3.5 h-3.5 text-[#00D1FF]" />
                      <span>{isAr ? 'تجربة' : 'Test'}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {generatedPrompt ? (
              <textarea
                readOnly
                value={generatedPrompt}
                className="w-full h-80 bg-[#07090E] border border-[#2D3748] rounded-2xl p-4 text-xs font-mono text-[#E2E8F0] leading-relaxed resize-none focus:outline-none"
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
                <Clapperboard className="w-12 h-12 text-[#2D3748]" />
                <p className="text-xs font-mono text-[#94A3B8]">
                  {isAr ? 'حدد فكرة الفيديو واضغط إنشاء لمشاهدة السكربت والبرومبت السينمائي الجاهز.' : 'Fill in your video idea and click generate to build a studio prompt.'}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
