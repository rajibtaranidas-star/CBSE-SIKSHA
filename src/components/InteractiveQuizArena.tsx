import React, { useState, useEffect } from 'react';
import { CBSEClass, QuizQuestion } from '../types/cbse';
import { CBSE_QUIZZES, CBSE_SUBJECTS, CBSE_CHAPTERS } from '../data/cbseData';
import {
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  AlertCircle,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface InteractiveQuizArenaProps {
  selectedClass: CBSEClass;
  onRecordQuizResult: (result: {
    quizId: string;
    subjectId: string;
    score: number;
    totalQuestions: number;
    percentage: number;
  }) => void;
  preSelectedChapterId?: string;
  onOpenNotesForChapter?: (chapterId: string) => void;
}

export const InteractiveQuizArena: React.FC<InteractiveQuizArenaProps> = ({
  selectedClass,
  onRecordQuizResult,
  preSelectedChapterId,
  onOpenNotesForChapter,
}) => {
  const availableSubjects = CBSE_SUBJECTS.filter((s) => s.classes.includes(selectedClass));
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    availableSubjects[0]?.id || 'science'
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [isTimed, setIsTimed] = useState(true);

  // Quiz active states
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [activeQuestionList, setActiveQuestionList] = useState<QuizQuestion[]>([]);
  const [isGeneratingAiQuiz, setIsGeneratingAiQuiz] = useState(false);

  // Filter available pool
  const pool = CBSE_QUIZZES.filter((q) => {
    const matchClass = q.classNum === selectedClass;
    const matchSub = q.subjectId === selectedSubjectId;
    const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    return matchClass && matchSub && matchDiff;
  });

  // If pool is empty for specific class/subject combination, fallback to all class questions
  const finalPool = pool.length > 0 ? pool : CBSE_QUIZZES.filter((q) => q.classNum === selectedClass);

  // Timer tick
  useEffect(() => {
    let interval: any = null;
    if (quizStarted && !quizFinished) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, quizFinished]);

  const handleStartQuiz = (customQuestions?: QuizQuestion[]) => {
    const questionsToUse = customQuestions || (finalPool.length > 0 ? finalPool : CBSE_QUIZZES.slice(0, 5));
    setActiveQuestionList(questionsToUse);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsAnswerConfirmed(false);
    setTimerSeconds(0);
    setQuizFinished(false);
    setQuizStarted(true);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswerConfirmed) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleConfirmAnswer = () => {
    if (userAnswers[currentQuestionIndex] === undefined) return;
    setIsAnswerConfirmed(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestionList.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswerConfirmed(false);
    } else {
      // Finish quiz
      setQuizFinished(true);
      // Calculate score
      let correct = 0;
      activeQuestionList.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctOptionIndex) {
          correct += 1;
        }
      });
      const pct = Math.round((correct / activeQuestionList.length) * 100);
      onRecordQuizResult({
        quizId: `quiz-${Date.now()}`,
        subjectId: selectedSubjectId,
        score: correct,
        totalQuestions: activeQuestionList.length,
        percentage: pct,
      });
    }
  };

  // AI Quiz Generator call
  const handleGenerateAiQuiz = async () => {
    setIsGeneratingAiQuiz(true);
    try {
      const res = await fetch('/api/ai/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classNum: selectedClass,
          subject: selectedSubjectId,
          chapterTitle: 'CBSE High-Yield Board Topics',
          count: 5,
          difficulty: selectedDifficulty === 'All' ? 'Medium' : selectedDifficulty,
        }),
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        handleStartQuiz(data.questions);
      } else {
        handleStartQuiz();
      }
    } catch (err) {
      console.error('Failed to generate AI quiz:', err);
      handleStartQuiz();
    } finally {
      setIsGeneratingAiQuiz(false);
    }
  };

  // Calculation for results
  const totalQuestions = activeQuestionList.length;
  let correctCount = 0;
  activeQuestionList.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctOptionIndex) correctCount += 1;
  });
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Format time MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Quiz Launcher Screen */}
      {!quizStarted && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="text-xs font-semibold text-sky-700 uppercase tracking-wide">
                  Class {selectedClass} Interactive Testing Module
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                  CBSE Pattern Chapter Quiz & Mock Drills
                </h2>
              </div>

              {/* Mode switch */}
              <div className="flex items-center gap-2 text-xs font-medium bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setIsTimed(true)}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    isTimed ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'
                  }`}
                >
                  Timed Mode
                </button>
                <button
                  onClick={() => setIsTimed(false)}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    !isTimed ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'
                  }`}
                >
                  Practice Mode
                </button>
              </div>
            </div>

            {/* Selectors: Subject & Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select Subject:
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSubjects.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubjectId(sub.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                        selectedSubjectId === sub.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Difficulty Level:
                </label>
                <div className="flex items-center gap-2">
                  {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                        selectedDifficulty === diff
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quiz Preview & Details Box */}
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-800">
                  Ready to test with {finalPool.length} curated questions
                </span>
                <span>Includes CBSE Assertion-Reason & Case Studies</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="font-semibold text-slate-900 block">Single-Choice MCQs</span>
                  Direct conceptual questions from NCERT chapters
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="font-semibold text-slate-900 block">Assertion-Reason (A & R)</span>
                  Standard board format testing cause and effect logic
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="font-semibold text-slate-900 block">Case-Based Analysis</span>
                  Passage-based questions evaluating scientific inquiry
                </div>
              </div>
            </div>

            {/* Launch Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleStartQuiz()}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-500 transition-colors shadow-xs flex items-center gap-2"
              >
                <span>Start Curated Practice Drill</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleGenerateAiQuiz}
                disabled={isGeneratingAiQuiz}
                className="px-5 py-2.5 text-sm font-semibold text-amber-900 bg-amber-50 border border-amber-300 rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{isGeneratingAiQuiz ? 'Generating AI Quiz...' : 'Generate Custom AI Quiz Drill'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Quiz Question Screen */}
      {quizStarted && !quizFinished && activeQuestionList.length > 0 && (
        <div className="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Top Progress & Status Bar */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-3">
              <span className="text-slate-600">
                Question {currentQuestionIndex + 1} of {activeQuestionList.length}
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-sky-700 capitalize">
                {activeQuestionList[currentQuestionIndex].type.replace('-', ' ')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {isTimed && (
                <div className="flex items-center gap-1.5 text-slate-700 font-mono tabular-nums">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{formatTime(timerSeconds)}</span>
                </div>
              )}
              <button
                onClick={() => setQuizStarted(false)}
                className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
              >
                Exit
              </button>
            </div>
          </div>

          {/* Question Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* If Case-Based, show passage */}
            {activeQuestionList[currentQuestionIndex].casePassage && (
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1.5">
                <div className="font-bold text-amber-900 uppercase tracking-wider text-[10px]">
                  Source / Case-Study Context
                </div>
                <div className="leading-relaxed">
                  {activeQuestionList[currentQuestionIndex].casePassage}
                </div>
              </div>
            )}

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-bold text-slate-900 whitespace-pre-line leading-relaxed">
              {activeQuestionList[currentQuestionIndex].question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {activeQuestionList[currentQuestionIndex].options.map((option, optIdx) => {
                const isSelected = userAnswers[currentQuestionIndex] === optIdx;
                const isCorrect = optIdx === activeQuestionList[currentQuestionIndex].correctOptionIndex;

                let optionStyles = 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50';

                if (isAnswerConfirmed) {
                  if (isCorrect) {
                    optionStyles = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                  } else if (isSelected) {
                    optionStyles = 'border-red-500 bg-red-50 text-red-950 font-semibold';
                  } else {
                    optionStyles = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyles = 'border-sky-600 bg-sky-50 text-sky-950 font-semibold ring-2 ring-sky-600/30';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isAnswerConfirmed}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 ${optionStyles}`}
                  >
                    <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{option}</span>
                    {isAnswerConfirmed && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerConfirmed && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Detailed Explanation Drawer (Revealed once confirmed) */}
            {isAnswerConfirmed && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>NCERT Step-by-Step Explanation:</span>
                  <span className="text-[11px] font-normal text-slate-500">
                    {activeQuestionList[currentQuestionIndex].ncertReference}
                  </span>
                </div>
                <div className="text-slate-700 leading-relaxed">
                  {activeQuestionList[currentQuestionIndex].explanation}
                </div>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                {!isAnswerConfirmed ? 'Select your answer and press Confirm' : 'Review solution and proceed'}
              </div>

              {!isAnswerConfirmed ? (
                <button
                  onClick={handleConfirmAnswer}
                  disabled={userAnswers[currentQuestionIndex] === undefined}
                  className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  Confirm Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-500 transition-colors flex items-center gap-1.5"
                >
                  <span>
                    {currentQuestionIndex < activeQuestionList.length - 1 ? 'Next Question' : 'View Full Scorecard'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Finished / Scorecard Screen */}
      {quizFinished && (
        <div className="max-w-2xl mx-auto bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-600 border border-amber-200">
              <Trophy className="w-7 h-7" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Test Completed!
            </h2>

            <div className="text-xs text-slate-500">
              Performance Report · Class {selectedClass} {selectedSubjectId}
            </div>

            {/* Big Score Display */}
            <div className="py-4">
              <div className="text-5xl font-extrabold text-slate-900 tabular-nums">
                {scorePercent}%
              </div>
              <div className="text-xs font-medium text-slate-600 mt-1">
                You scored {correctCount} out of {totalQuestions} marks
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <span className="text-slate-500 block">Total Time</span>
              <span className="text-base font-bold text-slate-900 tabular-nums font-mono">
                {formatTime(timerSeconds)}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <span className="text-slate-500 block">Board Readiness</span>
              <span className="text-base font-bold text-sky-700">
                {scorePercent >= 80 ? 'Mastery Level' : scorePercent >= 60 ? 'Competent' : 'Needs Practice'}
              </span>
            </div>
          </div>

          {/* Detailed Question Review Accordion / List */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Question-by-Question Review
            </h3>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {activeQuestionList.map((q, idx) => {
                const userAns = userAnswers[idx];
                const isCorrect = userAns === q.correctOptionIndex;
                return (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-slate-900">
                        {idx + 1}. {q.question}
                      </span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      )}
                    </div>
                    <div className="text-slate-600">
                      Your answer: {userAns !== undefined ? q.options[userAns] : 'Not Answered'}
                    </div>
                    {!isCorrect && (
                      <div className="text-emerald-700 font-medium">
                        Correct: {q.options[q.correctOptionIndex]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => handleStartQuiz()}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>

            <button
              onClick={() => setQuizStarted(false)}
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Back to Quiz Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
