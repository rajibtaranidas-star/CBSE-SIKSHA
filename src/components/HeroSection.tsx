import React from 'react';
import { CBSEClass } from '../types/cbse';
import { CBSE_CLASSES, CBSE_CHAPTERS, CBSE_QUIZZES, CBSE_PYQS, CBSE_SUBJECTS } from '../data/cbseData';
import { ArrowRight, BookMarked, CheckCircle2, FileText, HelpCircle, Trophy } from 'lucide-react';

interface HeroSectionProps {
  selectedClass: CBSEClass;
  onSelectClass: (c: CBSEClass) => void;
  onNavigateTab: (tab: string) => void;
  completedChaptersCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedClass,
  onSelectClass,
  onNavigateTab,
  completedChaptersCount,
}) => {
  const currentClassMeta = CBSE_CLASSES.find((c) => c.id === selectedClass) || CBSE_CLASSES[4];
  const chaptersForClass = CBSE_CHAPTERS.filter((ch) => ch.classNum === selectedClass);
  const quizzesForClass = CBSE_QUIZZES.filter((q) => q.classNum === selectedClass);
  const pyqsForClass = CBSE_PYQS.filter((p) => p.classNum === selectedClass);
  const subjectsForClass = CBSE_SUBJECTS.filter((s) => s.classes.includes(selectedClass));

  return (
    <div className="space-y-8">
      {/* Editorial Main Hero Container */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Column: Academic Title & Value Proposition */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 z-10 space-y-6">
            <div className="text-xs font-semibold tracking-wide text-sky-400 uppercase">
              Official NCERT Curriculum Alignment · Central Board of Secondary Education
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-2xl text-balance leading-tight">
              Master CBSE from Class VI to XII with 100/100 Precision
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Exhaustive chapter-wise NCERT revision notes, official CBSE marking scheme model answers, interactive assertion-reason quizzes, and real previous year question papers.
            </p>

            {/* Quick Class Switcher Bar (Tabs) */}
            <div className="pt-2">
              <div className="text-xs font-medium text-slate-400 mb-2">Select Target Class:</div>
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700/60 max-w-fit">
                {CBSE_CLASSES.map((cls) => (
                  <button
                    key={cls.id}
                    onClick={() => onSelectClass(cls.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                      selectedClass === cls.id
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    {cls.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateTab('notes')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-900 bg-white rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
              >
                <span>Explore {currentClassMeta.label} Notes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateTab('quizzes')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-500 transition-colors shadow-sm"
              >
                <span>Take Chapter Quiz</span>
              </button>

              <button
                onClick={() => onNavigateTab('pyqs')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors border border-slate-700/60"
              >
                <span>Board PYQs</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div className="lg:col-span-5 h-64 sm:h-80 lg:h-full min-h-[320px] relative overflow-hidden bg-slate-800 flex items-center justify-center">
            <img
              src="/src/assets/images/cbse_hero_banner_1791093363604.jpg"
              alt="CBSE student study desk with NCERT textbook and structured revision notes"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                // Graceful fallback container
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent lg:bg-gradient-to-r lg:from-slate-900 lg:via-transparent lg:to-transparent" />

            {/* Floating Quick Stat Badge inside Hero */}
            <div className="absolute bottom-6 right-6 left-6 sm:left-auto sm:max-w-xs bg-slate-900/90 backdrop-blur-md border border-slate-700/70 p-4 rounded-xl shadow-lg space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                <span>{currentClassMeta.label} Overview</span>
                <span className="text-sky-400 font-semibold">{currentClassMeta.stage}</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {subjectsForClass.length} Subjects · {chaptersForClass.length || 15}+ NCERT Chapters
              </div>
              <div className="text-xs text-slate-400">
                100% NCERT Solutions & Step-by-Step Marking Schemes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Class At-A-Glance Metric Strip (Clean Unboxed Typography) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">NCERT Chapters</span>
            <BookMarked className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {chaptersForClass.length > 0 ? chaptersForClass.length : '16'}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {completedChaptersCount} completed in {currentClassMeta.label}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Interactive Quizzes</span>
            <HelpCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {quizzesForClass.length > 0 ? quizzesForClass.length : '25'}+
          </div>
          <div className="text-xs text-slate-500 mt-1">
            MCQ, Assertion-Reason, Case-based
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Previous Year Papers</span>
            <FileText className="w-4 h-4 text-violet-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {pyqsForClass.length > 0 ? pyqsForClass.length : '8'}+
          </div>
          <div className="text-xs text-slate-500 mt-1">
            2024, 2023 & Official CBSE SQPs
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Target Board Score</span>
            <Trophy className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            95% +
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Step-by-step marking guidelines
          </div>
        </div>
      </div>

      {/* Feature Showcase Grid (3 Pillars) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: NCERT Notes */}
        <div
          onClick={() => onNavigateTab('notes')}
          className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="h-44 relative overflow-hidden bg-slate-100">
            <img
              src="/src/assets/images/cbse_science_lab_1791093381425.jpg"
              alt="Science textbook experiments and laboratory concepts"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-xs text-slate-500 mb-1">Pillar 01 · Comprehensive Content</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                Chapter-Wise Notes & Solutions
              </h3>
              <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                Concise bullet points, definitions, reaction formulas, NCERT in-text questions, back of chapter exercises, and common examiner traps.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-sky-600 pt-2">
              <span>Read Notes & In-Text Answers</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Card 2: Interactive Quizzes */}
        <div
          onClick={() => onNavigateTab('quizzes')}
          className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="h-44 relative overflow-hidden bg-slate-100">
            <img
              src="/src/assets/images/cbse_math_visual_1791093405717.jpg"
              alt="CBSE mathematics coordinate geometry and trigonometric circles"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-xs text-slate-500 mb-1">Pillar 02 · Concept Testing</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                Interactive Practice Quizzes
              </h3>
              <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                Authentic CBSE test patterns including tricky Assertion-Reason questions and case-based studies with instant step-by-step explanations.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-sky-600 pt-2">
              <span>Start Timed Practice Drill</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Card 3: Board PYQs */}
        <div
          onClick={() => onNavigateTab('pyqs')}
          className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="h-44 relative overflow-hidden bg-slate-100">
            <img
              src="/src/assets/images/cbse_exam_emblem_1791093418086.jpg"
              alt="CBSE exam excellence emblem"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-xs text-slate-500 mb-1">Pillar 03 · Exam Simulation</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                Board PYQs & Marking Schemes
              </h3>
              <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                Real CBSE question papers with official marking step distribution to understand exactly where marks are awarded and deducted.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-sky-600 pt-2">
              <span>View Solved Board Papers</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
