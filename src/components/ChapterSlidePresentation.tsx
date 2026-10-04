import React, { useState, useEffect } from 'react';
import { Chapter, SlideItem } from '../types/cbse';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Tv,
  Download,
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  Palette,
  FileText,
} from 'lucide-react';

interface ChapterSlidePresentationProps {
  chapter: Chapter;
  onOpenNotes?: () => void;
  onOpenNotebookLM?: () => void;
}

export const ChapterSlidePresentation: React.FC<ChapterSlidePresentationProps> = ({
  chapter,
  onOpenNotes,
  onOpenNotebookLM,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [colorTheme, setColorTheme] = useState<'blue' | 'emerald' | 'slate' | 'amber'>('blue');
  const [isGenerating, setIsGenerating] = useState(false);
  const [dynamicSlides, setDynamicSlides] = useState<SlideItem[] | null>(null);

  const activeSlides: SlideItem[] =
    dynamicSlides ||
    chapter.slideDeck?.slides || [
      {
        id: 'fallback-s1',
        slideNumber: 1,
        title: chapter.title,
        subtitle: `NCERT Class ${chapter.classNum} · ${chapter.ncertBookName}`,
        category: 'Overview',
        contentBullets: chapter.keyPoints.slice(0, 4),
        calloutBox: {
          title: 'Chapter Summary',
          text: chapter.summary,
          variant: 'info',
        },
        speakerNotes: `Welcome to this presentation on ${chapter.title}. This chapter carries ${chapter.weightageMarks} marks in CBSE exams.`,
      },
      {
        id: 'fallback-s2',
        slideNumber: 2,
        title: 'Core Concepts & Principles',
        subtitle: 'Fundamental NCERT Definitions',
        category: 'Core Concept',
        contentBullets: chapter.keyPoints.slice(4, 8),
        calloutBox: {
          title: 'Marking Scheme Tip',
          text: chapter.boardExamTips[0] || 'Underline key scientific terms in pencil.',
          variant: 'warning',
        },
        speakerNotes: 'Walk students through the core definitions and emphasize exact terminology.',
      },
      {
        id: 'fallback-s3',
        slideNumber: 3,
        title: 'High-Yield Board Questions & Summary',
        subtitle: 'Mastery Checklist',
        category: 'Summary',
        contentBullets: chapter.commonMistakes.map((m) => `Caution: ${m}`),
        calloutBox: {
          title: 'Exemplar Focus',
          text: 'Practice all in-text questions and NCERT back exercises.',
          variant: 'success',
        },
        speakerNotes: 'Conclude with key takeaways and encourage students to practice the chapter quiz.',
      },
    ];

  const currentSlide = activeSlides[currentSlideIndex] || activeSlides[0];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlideIndex((prev) => Math.min(activeSlides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlides.length, isFullscreen]);

  const handleGenerateAiSlides = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterTitle: chapter.title,
          classNum: chapter.classNum,
          subject: chapter.subjectId,
        }),
      });
      const data = await res.json();
      if (data.slides && data.slides.length > 0) {
        setDynamicSlides(data.slides);
        setCurrentSlideIndex(0);
      }
    } catch (err) {
      console.error('Error generating slides:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const getThemeClasses = () => {
    switch (colorTheme) {
      case 'emerald':
        return {
          banner: 'bg-emerald-950 text-emerald-100',
          accent: 'text-emerald-400',
          bulletDot: 'bg-emerald-500',
          calloutBorder: 'border-emerald-500/40 bg-emerald-900/30',
        };
      case 'slate':
        return {
          banner: 'bg-slate-950 text-slate-100',
          accent: 'text-sky-400',
          bulletDot: 'bg-sky-500',
          calloutBorder: 'border-slate-700 bg-slate-900/60',
        };
      case 'amber':
        return {
          banner: 'bg-stone-900 text-amber-100',
          accent: 'text-amber-400',
          bulletDot: 'bg-amber-500',
          calloutBorder: 'border-amber-700/50 bg-amber-950/40',
        };
      default:
        return {
          banner: 'bg-slate-900 text-sky-100',
          accent: 'text-sky-400',
          bulletDot: 'bg-sky-500',
          calloutBorder: 'border-sky-500/30 bg-sky-950/40',
        };
    }
  };

  const theme = getThemeClasses();

  // Render SVG interactive diagram
  const renderDiagram = () => {
    if (currentSlide.diagramType === 'chemical_reaction') {
      return (
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
          <svg viewBox="0 0 320 180" className="w-full max-w-sm h-40">
            {/* Water Beaker Container */}
            <rect x="70" y="40" width="180" height="110" rx="8" fill="#0c4a6e" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2" />
            <path d="M 70 65 Q 115 60 160 65 T 250 65 L 250 145 Q 250 150 245 150 L 75 150 Q 70 150 70 145 Z" fill="#0284c7" fillOpacity="0.3" />
            {/* Cathode Test Tube (-ve, H2) */}
            <rect x="100" y="25" width="30" height="90" rx="4" fill="#0f172a" stroke="#e2e8f0" strokeWidth="1.5" />
            <circle cx="115" cy="45" r="3" fill="#38bdf8" />
            <circle cx="112" cy="65" r="2.5" fill="#38bdf8" />
            <circle cx="118" cy="85" r="3" fill="#38bdf8" />
            <text x="115" y="15" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Cathode (-)</text>
            <text x="115" y="130" fill="#bae6fd" fontSize="9" fontWeight="bold" textAnchor="middle">2H₂ (Vol: 2)</text>

            {/* Anode Test Tube (+ve, O2) */}
            <rect x="190" y="45" width="30" height="70" rx="4" fill="#0f172a" stroke="#e2e8f0" strokeWidth="1.5" />
            <circle cx="205" cy="65" r="3" fill="#f87171" />
            <circle cx="203" cy="85" r="2.5" fill="#f87171" />
            <text x="205" y="15" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">Anode (+)</text>
            <text x="205" y="130" fill="#fecaca" fontSize="9" fontWeight="bold" textAnchor="middle">O₂ (Vol: 1)</text>

            {/* Battery & Wires */}
            <path d="M 115 115 L 115 165 L 145 165" stroke="#94a3b8" strokeWidth="2" fill="none" />
            <path d="M 205 115 L 205 165 L 175 165" stroke="#94a3b8" strokeWidth="2" fill="none" />
            <rect x="145" y="158" width="30" height="14" rx="2" fill="#334155" stroke="#cbd5e1" strokeWidth="1" />
            <text x="160" y="169" fill="#f8fafc" fontSize="8" fontWeight="bold" textAnchor="middle">6V Battery</text>
          </svg>
          <div className="text-[11px] text-slate-300 font-semibold mt-1">
            Electrolysis Setup: Water Splits into 2H₂ (Cathode) + O₂ (Anode)
          </div>
        </div>
      );
    }

    if (currentSlide.diagramType === 'human_heart') {
      return (
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
          <svg viewBox="0 0 320 180" className="w-full max-w-sm h-40">
            {/* Heart Outline Box */}
            <rect x="60" y="30" width="200" height="120" rx="16" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
            {/* Vertical Septum */}
            <line x1="160" y1="30" x2="160" y2="150" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="3 3" />
            {/* Horizontal Valve Line */}
            <line x1="60" y1="90" x2="260" y2="90" stroke="#94a3b8" strokeWidth="2" />

            {/* Chambers */}
            {/* Right Atrium (Deoxygenated - Blue) */}
            <rect x="65" y="35" width="90" height="50" rx="8" fill="#1e3a8a" fillOpacity="0.6" />
            <text x="110" y="60" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">Right Atrium</text>
            <text x="110" y="75" fill="#60a5fa" fontSize="8" textAnchor="middle">From Vena Cava</text>

            {/* Left Atrium (Oxygenated - Red) */}
            <rect x="165" y="35" width="90" height="50" rx="8" fill="#881337" fillOpacity="0.6" />
            <text x="210" y="60" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">Left Atrium</text>
            <text x="210" y="75" fill="#f87171" fontSize="8" textAnchor="middle">From Pulm Veins</text>

            {/* Right Ventricle */}
            <rect x="65" y="95" width="90" height="50" rx="8" fill="#1e3a8a" fillOpacity="0.8" />
            <text x="110" y="120" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">Right Ventricle</text>
            <text x="110" y="135" fill="#60a5fa" fontSize="8" textAnchor="middle">To Pulm Artery</text>

            {/* Left Ventricle (Thick Myocardium) */}
            <rect x="165" y="95" width="90" height="50" rx="8" fill="#881337" fillOpacity="0.9" stroke="#fda4af" strokeWidth="1.5" />
            <text x="210" y="120" fill="#fecdd3" fontSize="10" fontWeight="bold" textAnchor="middle">Left Ventricle</text>
            <text x="210" y="135" fill="#fb7185" fontSize="8" textAnchor="middle">High Pressure Aorta</text>
          </svg>
          <div className="text-[11px] text-slate-300 font-semibold mt-1">
            Double Circulation: Complete Separation of Deoxygenated & Oxygenated Blood
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-black p-4 sm:p-8 flex flex-col justify-between overflow-y-auto' : ''}`}>
      {/* Top Slide Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-xs">
            <Tv className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Interactive PPT Deck: {chapter.title}
            </h3>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>Slide {currentSlideIndex + 1} of {activeSlides.length}</span>
              <span>·</span>
              <span className="font-semibold text-sky-700">{currentSlide.category}</span>
            </div>
          </div>
        </div>

        {/* Theme and Mode Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Palette Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {(['blue', 'emerald', 'slate', 'amber'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setColorTheme(t)}
                title={`Switch to ${t} theme`}
                className={`w-5 h-5 rounded-full transition-transform ${
                  t === 'blue'
                    ? 'bg-sky-600'
                    : t === 'emerald'
                    ? 'bg-emerald-600'
                    : t === 'slate'
                    ? 'bg-slate-900'
                    : 'bg-amber-600'
                } ${colorTheme === t ? 'ring-2 ring-offset-1 ring-slate-900 scale-110' : 'opacity-70 hover:opacity-100'}`}
              />
            ))}
          </div>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              showNotes
                ? 'bg-sky-50 border-sky-300 text-sky-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Speaker Notes</span>
          </button>

          <button
            onClick={handleGenerateAiSlides}
            disabled={isGenerating}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">{isGenerating ? 'Generating...' : 'AI Slide Polish'}</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Canvas (16:9 Aspect Ratio Aesthetic) */}
      <div className={`relative overflow-hidden rounded-2xl shadow-xl transition-all ${theme.banner} ${isFullscreen ? 'flex-1 min-h-[500px] flex flex-col justify-between p-8 sm:p-12' : 'p-6 sm:p-10 min-h-[460px] flex flex-col justify-between'}`}>
        {/* Slide Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className={`font-bold uppercase tracking-wider ${theme.accent}`}>
              {currentSlide.category} · CBSE Class {chapter.classNum}
            </span>
            <span className="opacity-60 tabular-nums">
              Slide {currentSlideIndex + 1} / {activeSlides.length}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {currentSlide.title}
          </h2>

          {currentSlide.subtitle && (
            <p className="text-sm sm:text-base opacity-80 font-medium">
              {currentSlide.subtitle}
            </p>
          )}
        </div>

        {/* Slide Center Content: Bullets + Diagram / Callout */}
        <div className="my-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Content Bullets */}
          <div className={currentSlide.diagramType ? 'lg:col-span-7 space-y-3' : 'lg:col-span-12 space-y-3.5'}>
            <ul className="space-y-2.5">
              {currentSlide.contentBullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed opacity-95">
                  <span className={`w-2 h-2 rounded-full ${theme.bulletDot} mt-2 shrink-0`} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Callout Box */}
            {currentSlide.calloutBox && (
              <div className={`p-4 rounded-xl border mt-4 text-xs ${theme.calloutBorder} space-y-1`}>
                <div className={`font-bold ${theme.accent} uppercase tracking-wider text-[11px]`}>
                  {currentSlide.calloutBox.title}
                </div>
                <div className="opacity-90 leading-relaxed font-sans">
                  {currentSlide.calloutBox.text}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Diagram (if present) */}
          {currentSlide.diagramType && (
            <div className="lg:col-span-5">
              {renderDiagram()}
            </div>
          )}
        </div>

        {/* Slide Footer Branding & Navigation Hints */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] opacity-70">
          <span>CBSE Shiksha Academic Presentation Deck · Aligned with NCERT {chapter.editionYear || 'Latest Edition'}</span>
          <span>Use ← and → arrow keys to navigate slides</span>
        </div>
      </div>

      {/* Speaker Notes Drawer */}
      {showNotes && currentSlide.speakerNotes && (
        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1 text-amber-950">
          <div className="font-bold text-amber-900 uppercase tracking-wide text-[10px] flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Teacher & Presenter Delivery Notes</span>
          </div>
          <div className="leading-relaxed">
            {currentSlide.speakerNotes}
          </div>
        </div>
      )}

      {/* Slide Navigation & Thumbnail Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Thumbnails */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
          {activeSlides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap ${
                currentSlideIndex === idx
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Slide {idx + 1}
            </button>
          ))}
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-40 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.min(activeSlides.length - 1, prev + 1))}
            disabled={currentSlideIndex === activeSlides.length - 1}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-500 transition-colors disabled:opacity-40 flex items-center gap-1 shadow-xs"
          >
            <span>Next Slide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
