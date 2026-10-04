import React, { useState, useEffect } from 'react';
import { CBSEClass, UserProgress, Chapter } from './types/cbse';
import { CBSE_CHAPTERS } from './data/cbseData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ChapterNotesViewer } from './components/ChapterNotesViewer';
import { ChapterSlidePresentation } from './components/ChapterSlidePresentation';
import { InteractiveQuizArena } from './components/InteractiveQuizArena';
import { PYQExplorer } from './components/PYQExplorer';
import { ProgressTrackerView } from './components/ProgressTrackerView';
import { AIDoubtSolver } from './components/AIDoubtSolver';
import { GeminiChatbot } from './components/GeminiChatbot';
import { NotebookLMIntegrationModal } from './components/NotebookLMIntegrationModal';
import { FormulaSheetModal } from './components/FormulaSheetModal';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'cbse_shiksha_student_progress_v1';

const getInitialProgress = (): UserProgress => {
  const todayStr = new Date().toISOString().split('T')[0];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: UserProgress = JSON.parse(raw);
      if (parsed.lastActiveDate !== todayStr) {
        const lastDate = new Date(parsed.lastActiveDate);
        const todayDate = new Date(todayStr);
        const diffDays = Math.round(
          (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
          parsed.studyStreakDays = (parsed.studyStreakDays || 0) + 1;
        } else if (diffDays > 1) {
          parsed.studyStreakDays = 1;
        }
        parsed.lastActiveDate = todayStr;
      }
      return parsed;
    }
  } catch (err) {
    console.error('Error loading progress:', err);
  }

  return {
    selectedClass: '10',
    targetScore: 95,
    completedChapters: ['c10-sci-ch1'],
    bookmarkedChapterIds: ['c10-math-ch8'],
    bookmarkedPyqIds: ['pyq-10-sci-2024'],
    studyStreakDays: 3,
    lastActiveDate: todayStr,
    quizResults: [
      {
        quizId: 'quiz-init-1',
        subjectId: 'science',
        score: 4,
        totalQuestions: 4,
        percentage: 100,
        timestamp: Date.now() - 86400000,
      },
    ],
  };
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress);
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [selectedClass, setSelectedClass] = useState<CBSEClass>(progress.selectedClass || '10');
  const [isFormulaSheetOpen, setIsFormulaSheetOpen] = useState(false);

  // Active chapter for slide presentation view
  const classChapters = CBSE_CHAPTERS.filter((ch) => ch.classNum === selectedClass);
  const [activeSlideChapterId, setActiveSlideChapterId] = useState<string>(
    classChapters[0]?.id || CBSE_CHAPTERS[0].id
  );

  // Active chapter for NotebookLM integration modal
  const [notebookLmChapter, setNotebookLmChapter] = useState<Chapter | null>(null);

  // Context passing for cross-navigation
  const [activeQuizChapterId, setActiveQuizChapterId] = useState<string | undefined>(undefined);
  const [aiGuruContext, setAiGuruContext] = useState<{ topic?: string; subject?: string }>({});

  // Save progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [progress]);

  const handleSelectClass = (cls: CBSEClass) => {
    setSelectedClass(cls);
    setProgress((prev) => ({ ...prev, selectedClass: cls }));
    const firstForClass = CBSE_CHAPTERS.find((c) => c.classNum === cls);
    if (firstForClass) setActiveSlideChapterId(firstForClass.id);
  };

  const handleToggleCompleteChapter = (chapterId: string) => {
    setProgress((prev) => {
      const exists = prev.completedChapters.includes(chapterId);
      const updated = exists
        ? prev.completedChapters.filter((id) => id !== chapterId)
        : [...prev.completedChapters, chapterId];
      return { ...prev, completedChapters: updated };
    });
  };

  const handleToggleBookmarkChapter = (chapterId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedChapterIds.includes(chapterId);
      const updated = exists
        ? prev.bookmarkedChapterIds.filter((id) => id !== chapterId)
        : [...prev.bookmarkedChapterIds, chapterId];
      return { ...prev, bookmarkedChapterIds: updated };
    });
  };

  const handleToggleBookmarkPyq = (pyqId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedPyqIds.includes(pyqId);
      const updated = exists
        ? prev.bookmarkedPyqIds.filter((id) => id !== pyqId)
        : [...prev.bookmarkedPyqIds, pyqId];
      return { ...prev, bookmarkedPyqIds: updated };
    });
  };

  const handleRecordQuizResult = (result: {
    quizId: string;
    subjectId: string;
    score: number;
    totalQuestions: number;
    percentage: number;
  }) => {
    setProgress((prev) => ({
      ...prev,
      quizResults: [
        {
          ...result,
          timestamp: Date.now(),
        },
        ...prev.quizResults,
      ],
    }));
  };

  const handleUpdateTargetScore = (score: number) => {
    setProgress((prev) => ({ ...prev, targetScore: score }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your study progress and quiz records?')) {
      const todayStr = new Date().toISOString().split('T')[0];
      const fresh: UserProgress = {
        selectedClass,
        targetScore: 95,
        completedChapters: [],
        bookmarkedChapterIds: [],
        bookmarkedPyqIds: [],
        studyStreakDays: 1,
        lastActiveDate: todayStr,
        quizResults: [],
      };
      setProgress(fresh);
    }
  };

  // Cross-navigation handlers
  const handleStartQuizForChapter = (chapterId: string) => {
    setActiveQuizChapterId(chapterId);
    setCurrentTab('quizzes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskGuruForChapter = (chapter: Chapter) => {
    setAiGuruContext({
      topic: `Explain key concepts and derivations for ${chapter.title} (NCERT Class ${chapter.classNum})`,
      subject: chapter.subjectId,
    });
    setCurrentTab('ai-guru');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSlidesForChapter = (chapter: Chapter) => {
    setActiveSlideChapterId(chapter.id);
    setCurrentTab('slides');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenNotebookLMForChapter = (chapter: Chapter) => {
    setNotebookLmChapter(chapter);
  };

  const handleNavigateChapter = (_chapterId: string) => {
    setCurrentTab('notes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activePresentationChapter =
    CBSE_CHAPTERS.find((c) => c.id === activeSlideChapterId) ||
    classChapters[0] ||
    CBSE_CHAPTERS[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Universal Top Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedClass={selectedClass}
        onSelectClass={handleSelectClass}
        onOpenFormulas={() => setIsFormulaSheetOpen(true)}
        streakDays={progress.studyStreakDays}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'overview' && (
          <HeroSection
            selectedClass={selectedClass}
            onSelectClass={handleSelectClass}
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            completedChaptersCount={progress.completedChapters.length}
          />
        )}

        {currentTab === 'notes' && (
          <ChapterNotesViewer
            selectedClass={selectedClass}
            completedChapterIds={progress.completedChapters}
            bookmarkedChapterIds={progress.bookmarkedChapterIds}
            onToggleComplete={handleToggleCompleteChapter}
            onToggleBookmark={handleToggleBookmarkChapter}
            onStartQuizForChapter={handleStartQuizForChapter}
            onAskGuruForChapter={handleAskGuruForChapter}
            onOpenSlidesForChapter={handleOpenSlidesForChapter}
            onOpenNotebookLMForChapter={handleOpenNotebookLMForChapter}
          />
        )}

        {currentTab === 'slides' && (
          <div className="space-y-6">
            {/* Slide Deck Chapter Selector Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Select Presentation Chapter:
                </span>
                <select
                  value={activePresentationChapter.id}
                  onChange={(e) => setActiveSlideChapterId(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-lg py-1.5 px-3 focus:ring-2 focus:ring-sky-500 cursor-pointer"
                >
                  {(classChapters.length > 0 ? classChapters : CBSE_CHAPTERS).map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      Ch {ch.chapterNumber}: {ch.title} ({ch.subjectId.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenNotebookLMForChapter(activePresentationChapter)}
                  className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  Open in NotebookLM
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('notes');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Read Full Text Notes
                </button>
              </div>
            </div>

            <ChapterSlidePresentation
              chapter={activePresentationChapter}
              onOpenNotes={() => setCurrentTab('notes')}
              onOpenNotebookLM={() => handleOpenNotebookLMForChapter(activePresentationChapter)}
            />
          </div>
        )}

        {currentTab === 'quizzes' && (
          <InteractiveQuizArena
            selectedClass={selectedClass}
            onRecordQuizResult={handleRecordQuizResult}
            preSelectedChapterId={activeQuizChapterId}
            onOpenNotesForChapter={handleNavigateChapter}
          />
        )}

        {currentTab === 'pyqs' && (
          <PYQExplorer
            selectedClass={selectedClass}
            bookmarkedPyqIds={progress.bookmarkedPyqIds}
            onToggleBookmarkPyq={handleToggleBookmarkPyq}
          />
        )}

        {currentTab === 'tracker' && (
          <ProgressTrackerView
            progress={progress}
            onUpdateTargetScore={handleUpdateTargetScore}
            onNavigateChapter={handleNavigateChapter}
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onResetProgress={handleResetProgress}
          />
        )}

        {currentTab === 'chatbot' && (
          <GeminiChatbot selectedClass={selectedClass} />
        )}

        {currentTab === 'ai-guru' && (
          <AIDoubtSolver
            selectedClass={selectedClass}
            initialTopic={aiGuruContext.topic || ''}
            initialSubject={aiGuruContext.subject || 'Science'}
          />
        )}
      </main>

      {/* Google NotebookLM Study Pack Modal */}
      {notebookLmChapter && (
        <NotebookLMIntegrationModal
          isOpen={!!notebookLmChapter}
          onClose={() => setNotebookLmChapter(null)}
          chapter={notebookLmChapter}
        />
      )}

      {/* Formula Cheat Sheet Quick Drawer / Modal */}
      <FormulaSheetModal
        isOpen={isFormulaSheetOpen}
        onClose={() => setIsFormulaSheetOpen(false)}
        initialClass={selectedClass}
      />

      {/* Academic Footer */}
      <Footer
        selectedClass={selectedClass}
        onSelectClass={handleSelectClass}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenFormulas={() => setIsFormulaSheetOpen(true)}
      />
    </div>
  );
}
