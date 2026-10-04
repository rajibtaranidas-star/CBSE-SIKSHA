import React, { useState, useEffect } from 'react';
import { CBSEClass, UserProgress } from '../types/cbse';
import { CBSE_CLASSES, CBSE_CHAPTERS, CBSE_SUBJECTS, CBSE_PYQS } from '../data/cbseData';
import {
  Trophy,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  Bookmark,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Target,
  Calendar,
} from 'lucide-react';

interface ProgressTrackerViewProps {
  progress: UserProgress;
  onUpdateTargetScore: (score: number) => void;
  onNavigateChapter: (chapterId: string) => void;
  onNavigateTab: (tab: string) => void;
  onResetProgress: () => void;
}

export const ProgressTrackerView: React.FC<ProgressTrackerViewProps> = ({
  progress,
  onUpdateTargetScore,
  onNavigateChapter,
  onNavigateTab,
  onResetProgress,
}) => {
  const currentClass = progress.selectedClass;
  const classChapters = CBSE_CHAPTERS.filter((ch) => ch.classNum === currentClass);
  const classSubjects = CBSE_SUBJECTS.filter((s) => s.classes.includes(currentClass));

  // Syllabus completion math
  const completedInClass = classChapters.filter((ch) =>
    progress.completedChapters.includes(ch.id)
  );
  const syllabusPct =
    classChapters.length > 0
      ? Math.round((completedInClass.length / classChapters.length) * 100)
      : 0;

  // Quiz analytics
  const totalQuizzes = progress.quizResults.length;
  const avgQuizScore =
    totalQuizzes > 0
      ? Math.round(
          progress.quizResults.reduce((acc, q) => acc + q.percentage, 0) / totalQuizzes
        )
      : 0;

  // CBSE Board Exam Countdown (Target: mid Feb)
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number }>({
    days: 120,
    hours: 14,
    mins: 35,
  });

  useEffect(() => {
    // Board exam target: March 1 of next exam cycle
    const targetDate = new Date('2027-02-15T09:00:00Z');
    const updateCountdown = () => {
      const now = new Date();
      const diff = Math.max(0, targetDate.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      setTimeLeft({ days, hours, mins });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  // Bookmarked chapters
  const bookmarkedChapters = CBSE_CHAPTERS.filter((ch) =>
    progress.bookmarkedChapterIds.includes(ch.id)
  );
  const bookmarkedPyqs = CBSE_PYQS.filter((p) =>
    progress.bookmarkedPyqIds.includes(p.id)
  );

  return (
    <div className="space-y-8">
      {/* Top Banner: Goal & Countdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Overall Target & Syllabus Gauge */}
        <div className="md:col-span-8 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="text-xs font-semibold text-sky-700 uppercase tracking-wide">
                Personalized Preparation Roadmap · Class {currentClass}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                Academic Progress & Mastery Tracker
              </h2>
            </div>

            {/* Target Score Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Target Score:</span>
              <select
                value={progress.targetScore}
                onChange={(e) => onUpdateTargetScore(Number(e.target.value))}
                className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 rounded-lg py-1.5 px-3 focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                <option value={90}>90% (Distinction)</option>
                <option value={95}>95% (Board Merit)</option>
                <option value={98}>98% (National Top 1%)</option>
                <option value={100}>100% (Centum Score)</option>
              </select>
            </div>
          </div>

          {/* Progress Bar & Numerical Metrics */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700">Class {currentClass} Syllabus Coverage</span>
              <span className="text-sky-700 font-bold tabular-nums text-sm">{syllabusPct}%</span>
            </div>

            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-600 rounded-full transition-all duration-500"
                style={{ width: `${syllabusPct}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{completedInClass.length} of {classChapters.length} chapters mastered</span>
              <span>{classChapters.length - completedInClass.length} remaining</span>
            </div>
          </div>

          {/* 3 Metric Mini Cards */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 block">Study Streak</span>
              <span className="text-xl font-bold text-slate-900 tabular-nums">
                {progress.studyStreakDays} Days
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 block">Quizzes Taken</span>
              <span className="text-xl font-bold text-slate-900 tabular-nums">
                {totalQuizzes}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 block">Avg Accuracy</span>
              <span className="text-xl font-bold text-emerald-600 tabular-nums">
                {avgQuizScore}%
              </span>
            </div>
          </div>
        </div>

        {/* Right: Board Exam Countdown Clock */}
        <div className="md:col-span-4 bg-slate-900 text-white p-6 sm:p-8 rounded-xl shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wide">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>CBSE Examination Clock</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Countdown to Board & Final Exams
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every day counts. Consistent daily revision of 45 minutes yields top percentiles.
            </p>
          </div>

          {/* Countdown Blocks */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums font-mono">
                {timeLeft.days}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Days</div>
            </div>

            <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums font-mono">
                {timeLeft.hours}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Hours</div>
            </div>

            <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums font-mono">
                {timeLeft.mins}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Mins</div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('quizzes')}
            className="w-full py-2.5 px-4 text-xs font-semibold text-slate-900 bg-white rounded-lg hover:bg-slate-100 transition-colors shadow-xs"
          >
            Practice Timed Test Now
          </button>
        </div>
      </div>

      {/* Subject-Wise Mastery Breakdown */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Subject-Wise Syllabus Completion
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed breakdown of completed NCERT chapters per subject.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classSubjects.map((sub) => {
            const subChapters = classChapters.filter((ch) => ch.subjectId === sub.id);
            const subCompleted = subChapters.filter((ch) =>
              progress.completedChapters.includes(ch.id)
            );
            const subPct =
              subChapters.length > 0
                ? Math.round((subCompleted.length / subChapters.length) * 100)
                : 0;

            return (
              <div
                key={sub.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{sub.name}</span>
                  <span className="text-xs font-bold text-sky-700 tabular-nums">{subPct}%</span>
                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-600 rounded-full transition-all duration-300"
                    style={{ width: `${subPct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>
                    {subCompleted.length} of {subChapters.length} chapters done
                  </span>
                  <button
                    onClick={() => onNavigateTab('notes')}
                    className="text-sky-700 font-semibold hover:underline"
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bookmarks & Saved Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Saved Chapters */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-sky-600" />
              <span>Bookmarked Notes ({bookmarkedChapters.length})</span>
            </h3>
          </div>

          {bookmarkedChapters.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-lg border border-slate-100">
              No chapters bookmarked yet. Click the bookmark icon on any chapter note to save for quick revision.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto">
              {bookmarkedChapters.map((ch) => (
                <div key={ch.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-900 block">{ch.title}</span>
                    <span className="text-slate-500">Class {ch.classNum} · Ch {ch.chapterNumber}</span>
                  </div>
                  <button
                    onClick={() => onNavigateChapter(ch.id)}
                    className="px-2.5 py-1 text-xs text-sky-700 font-medium hover:bg-sky-50 rounded-md transition-colors"
                  >
                    Open
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved PYQ Papers */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Saved Board Papers ({bookmarkedPyqs.length})</span>
            </h3>
          </div>

          {bookmarkedPyqs.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-lg border border-slate-100">
              No question papers bookmarked yet. Bookmark real board papers in the PYQs tab for offline exam practice.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto">
              {bookmarkedPyqs.map((pyq) => (
                <div key={pyq.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-900 block">{pyq.title}</span>
                    <span className="text-slate-500">Class {pyq.classNum} · {pyq.year}</span>
                  </div>
                  <button
                    onClick={() => onNavigateTab('pyqs')}
                    className="px-2.5 py-1 text-xs text-sky-700 font-medium hover:bg-sky-50 rounded-md transition-colors"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reset Tracker Danger Zone */}
      <div className="flex items-center justify-between p-4 bg-slate-100 rounded-xl text-xs text-slate-600">
        <span>Need to start preparation afresh for the new academic term?</span>
        <button
          onClick={onResetProgress}
          className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Progress</span>
        </button>
      </div>
    </div>
  );
};
