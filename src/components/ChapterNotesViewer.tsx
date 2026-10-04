import React, { useState } from 'react';
import { CBSEClass, Chapter } from '../types/cbse';
import { CBSE_CHAPTERS, CBSE_SUBJECTS } from '../data/cbseData';
import {
  BookOpen,
  CheckCircle,
  Bookmark,
  Volume2,
  VolumeX,
  Sparkles,
  HelpCircle,
  Clock,
  Award,
  AlertTriangle,
  Lightbulb,
  Search,
  Filter,
} from 'lucide-react';

interface ChapterNotesViewerProps {
  selectedClass: CBSEClass;
  completedChapterIds: string[];
  bookmarkedChapterIds: string[];
  onToggleComplete: (chapterId: string) => void;
  onToggleBookmark: (chapterId: string) => void;
  onStartQuizForChapter: (chapterId: string) => void;
  onAskGuruForChapter: (chapter: Chapter) => void;
  onOpenSlidesForChapter?: (chapter: Chapter) => void;
  onOpenNotebookLMForChapter?: (chapter: Chapter) => void;
}

export const ChapterNotesViewer: React.FC<ChapterNotesViewerProps> = ({
  selectedClass,
  completedChapterIds,
  bookmarkedChapterIds,
  onToggleComplete,
  onToggleBookmark,
  onStartQuizForChapter,
  onAskGuruForChapter,
  onOpenSlidesForChapter,
  onOpenNotebookLMForChapter,
}) => {
  const availableSubjects = CBSE_SUBJECTS.filter((s) => s.classes.includes(selectedClass));
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    availableSubjects[0]?.id || 'science'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'concepts' | 'ncert' | 'formulas' | 'tips' | 'resources'>('concepts');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Filter chapters for this class and subject
  const chapters = CBSE_CHAPTERS.filter(
    (ch) => ch.classNum === selectedClass && ch.subjectId === selectedSubjectId
  );

  // If no chapters found for selected subject in this mock class, fall back to any class chapter
  const displayChapters =
    chapters.length > 0
      ? chapters
      : CBSE_CHAPTERS.filter((ch) => ch.classNum === selectedClass);

  const filteredChapters = displayChapters.filter(
    (ch) =>
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [activeChapterId, setActiveChapterId] = useState<string>(
    filteredChapters[0]?.id || CBSE_CHAPTERS[0].id
  );

  const activeChapter =
    CBSE_CHAPTERS.find((ch) => ch.id === activeChapterId) ||
    filteredChapters[0] ||
    CBSE_CHAPTERS[0];

  const isCompleted = completedChapterIds.includes(activeChapter.id);
  const isBookmarked = bookmarkedChapterIds.includes(activeChapter.id);

  // Text to Speech handle
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${activeChapter.title}. ${activeChapter.summary}. Key Points: ${activeChapter.keyPoints.join('. ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Class {selectedClass} · NCERT Textbook Curriculum
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Chapter-Wise Revision Notes & NCERT Solutions
          </h2>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search chapters, formulas, concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Subject Filter Bar (Interactive Buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {availableSubjects.map((sub) => {
          const isActive = selectedSubjectId === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubjectId(sub.id);
                // pick first chapter for this subject if available
                const first = CBSE_CHAPTERS.find(
                  (c) => c.classNum === selectedClass && c.subjectId === sub.id
                );
                if (first) setActiveChapterId(first.id);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{sub.name}</span>
            </button>
          );
        })}
      </div>

      {/* Two-Zone Layout: Left Chapter Sidebar, Right Rich Chapter Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Chapter Index List */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Chapters ({filteredChapters.length})</span>
            <span className="text-slate-500 font-normal">Class {selectedClass}</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {filteredChapters.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No chapters found matching &quot;{searchQuery}&quot;.
              </div>
            ) : (
              filteredChapters.map((ch) => {
                const isSelected = activeChapterId === ch.id;
                const done = completedChapterIds.includes(ch.id);
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setActiveChapterId(ch.id);
                      if (isSpeaking) {
                        window.speechSynthesis?.cancel();
                        setIsSpeaking(false);
                      }
                    }}
                    className={`w-full text-left p-4 transition-colors flex items-start gap-3 ${
                      isSelected
                        ? 'bg-sky-50/70 border-l-4 border-sky-600'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="mt-0.5">
                      {done ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-500">
                          {ch.chapterNumber}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-semibold text-slate-900 truncate">
                          {ch.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                        <span>Ch {ch.chapterNumber}</span>
                        <span>·</span>
                        <span className="text-sky-700 font-medium">{ch.weightageMarks} Marks</span>
                        <span>·</span>
                        <span>{ch.estimatedReadTimeMinutes} min</span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Active Chapter Detailed Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            {/* Chapter Header with Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                {/* Zero-Pill Clean Metadata */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>Class {activeChapter.classNum}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeChapter.ncertBookName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-sky-700">{activeChapter.weightageMarks} Marks Weightage</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {activeChapter.estimatedReadTimeMinutes} min read
                  </span>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Chapter {activeChapter.chapterNumber}: {activeChapter.title}
                </h1>
              </div>

              {/* Actions: Listen, Bookmark, Complete, PPT, NotebookLM */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {onOpenSlidesForChapter && (
                  <button
                    onClick={() => onOpenSlidesForChapter(activeChapter)}
                    className="px-3 py-1.5 rounded-lg border border-sky-300 bg-sky-50 text-sky-800 text-xs font-semibold hover:bg-sky-100 transition-colors flex items-center gap-1.5 shadow-xs"
                    title="View Chapter Slide Presentation (PPT)"
                  >
                    <span>View PPT</span>
                  </button>
                )}

                {onOpenNotebookLMForChapter && (
                  <button
                    onClick={() => onOpenNotebookLMForChapter(activeChapter)}
                    className="px-3 py-1.5 rounded-lg border border-indigo-300 bg-indigo-50 text-indigo-800 text-xs font-semibold hover:bg-indigo-100 transition-colors flex items-center gap-1.5 shadow-xs"
                    title="Export to Google NotebookLM"
                  >
                    <span>NotebookLM</span>
                  </button>
                )}

                <button
                  onClick={handleToggleSpeech}
                  title={isSpeaking ? 'Stop Audio' : 'Listen to Notes Aloud'}
                  className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    isSpeaking
                      ? 'bg-amber-50 border-amber-300 text-amber-800 animate-pulse'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-4 h-4 text-amber-600" />
                      <span className="hidden sm:inline">Pause</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-slate-600" />
                      <span className="hidden sm:inline">Audio</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleBookmark(activeChapter.id)}
                  title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Chapter'}
                  className={`p-2 rounded-lg border transition-colors ${
                    isBookmarked
                      ? 'bg-sky-50 border-sky-300 text-sky-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-sky-600 text-sky-600' : ''}`} />
                </button>

                <button
                  onClick={() => onToggleComplete(activeChapter.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs Inside Chapter */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium max-w-fit">
              <button
                onClick={() => setActiveSubTab('concepts')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeSubTab === 'concepts'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Key Concepts & Notes
              </button>
              <button
                onClick={() => setActiveSubTab('ncert')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeSubTab === 'ncert'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                NCERT Solutions ({activeChapter.ncertSolutions?.length || 0})
              </button>
              <button
                onClick={() => setActiveSubTab('formulas')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeSubTab === 'formulas'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Formulas & Reactions
              </button>
              <button
                onClick={() => setActiveSubTab('tips')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeSubTab === 'tips'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Examiner Tips & Traps
              </button>
              <button
                onClick={() => setActiveSubTab('resources')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeSubTab === 'resources'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Resource Materials & NCERT Links
              </button>
            </div>

            {/* Sub-Tab 1: Concepts & Notes */}
            {activeSubTab === 'concepts' && (
              <div className="space-y-6">
                {/* Chapter Summary */}
                <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-100 text-slate-800 text-sm leading-relaxed">
                  <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
                    Chapter Summary
                  </div>
                  {activeChapter.summary}
                </div>

                {/* Key Bullet Points */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Core NCERT Learning Points
                  </h3>
                  <ul className="space-y-2.5">
                    {activeChapter.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Important Definitions */}
                {activeChapter.keyDefinitions && activeChapter.keyDefinitions.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Crucial Definitions (Board Exam Wording)
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {activeChapter.keyDefinitions.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1"
                        >
                          <div className="font-bold text-slate-900">{item.term}</div>
                          <div className="text-slate-600 leading-relaxed">{item.definition}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Sub-Tab 2: NCERT Textbook Solutions */}
            {activeSubTab === 'ncert' && (
              <div className="space-y-5">
                <div className="text-xs text-slate-500">
                  Step-by-step solved in-text questions, back exercises, and NCERT Exemplar problems formatted strictly per the CBSE answer sheet scheme.
                </div>

                <div className="space-y-4">
                  {activeChapter.ncertSolutions?.map((sol, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sky-800">{sol.questionNumber}</span>
                        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                          {sol.type}
                        </span>
                      </div>

                      <div className="font-semibold text-slate-900 text-sm">
                        Q: {sol.question}
                      </div>

                      <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-700 whitespace-pre-line leading-relaxed font-sans">
                        <span className="font-semibold text-slate-900 block mb-1">Answer:</span>
                        {sol.answer}
                      </div>

                      {sol.markingPoints && sol.markingPoints.length > 0 && (
                        <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100 text-[11px] text-emerald-900">
                          <span className="font-semibold block mb-1">CBSE Marking Scheme Rubric:</span>
                          <ul className="list-disc list-inside space-y-0.5">
                            {sol.markingPoints.map((pt, pIdx) => (
                              <li key={pIdx}>{pt}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-Tab 3: Formulas & Reactions */}
            {activeSubTab === 'formulas' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-500">
                  Essential mathematical equations, chemical reaction states, and physics derivations required for full marks.
                </div>

                {activeChapter.formulasOrLaws && activeChapter.formulasOrLaws.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {activeChapter.formulasOrLaws.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-slate-900 text-white rounded-xl shadow-xs space-y-2"
                      >
                        <div className="text-xs font-semibold text-sky-400 uppercase tracking-wide">
                          {item.title}
                        </div>
                        <div className="p-3 bg-slate-800 rounded-lg font-mono text-sm text-amber-300 font-semibold border border-slate-700/80 whitespace-pre-line">
                          {item.expression}
                        </div>
                        <div className="text-xs text-slate-300 leading-relaxed">
                          {item.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                    No complex algebraic equations for this specific chapter. Refer to Key Concepts tab for terminology.
                  </div>
                )}
              </div>
            )}

            {/* Sub-Tab 4: Examiner Tips & Traps */}
            {activeSubTab === 'tips' && (
              <div className="space-y-5">
                {/* Common Student Mistakes */}
                <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wide">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Common Mistakes That Cost Marks</span>
                  </div>
                  <ul className="space-y-2">
                    {activeChapter.commonMistakes?.map((mistake, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-amber-950 leading-relaxed">
                        <span className="font-bold text-amber-700">·</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Chief Examiner Board Tips */}
                <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wide">
                    <Lightbulb className="w-4 h-4 text-emerald-600" />
                    <span>Chief Examiner Board Advice</span>
                  </div>
                  <ul className="space-y-2">
                    {activeChapter.boardExamTips?.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-emerald-950 leading-relaxed">
                        <span className="font-bold text-emerald-700">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Sub-Tab 5: Resource Materials & External Links */}
            {activeSubTab === 'resources' && (
              <div className="space-y-5">
                <div className="bg-sky-50/70 p-4 rounded-xl border border-sky-200 text-xs text-sky-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-bold block text-sky-900">
                      Latest Rationalized NCERT Textbook Alignment ({activeChapter.editionYear || '2024–25 Edition'})
                    </span>
                    <span>
                      Direct verified links to official Ministry of Education portals, exemplar problem banks, and DIKSHA QR interactive assets.
                    </span>
                  </div>
                  {onOpenNotebookLMForChapter && (
                    <button
                      onClick={() => onOpenNotebookLMForChapter(activeChapter)}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-500 transition-colors shrink-0 shadow-xs"
                    >
                      Export to NotebookLM
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(activeChapter.resourceMaterials || [
                    {
                      title: 'Official NCERT e-Textbook Portal',
                      type: 'NCERT Official',
                      description: 'Download full high-resolution textbook chapter PDF directly from ncert.nic.in.',
                      url: 'https://ncert.nic.in/textbook.php',
                    },
                    {
                      title: 'NCERT Exemplar Problems Bank',
                      type: 'Exemplar',
                      description: 'Higher order thinking skills (HOTS) and complex numerical problem sets.',
                      url: 'https://ncert.nic.in/exemplar-problems.php',
                    },
                    {
                      title: 'DIKSHA National Digital Infrastructure',
                      type: 'Diksha',
                      description: 'Interactive worksheets, videos, and competency-based assessments.',
                      url: 'https://diksha.gov.in',
                    },
                    {
                      title: 'CBSE Academic Official Curriculum Repository',
                      type: 'Lab Manual',
                      description: 'Rationalized syllabus notifications, question banks, and sample papers.',
                      url: 'https://cbseacademic.nic.in',
                    },
                  ]).map((resItem, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between hover:border-slate-300 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wide">
                            {resItem.type}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{resItem.title}</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {resItem.description}
                        </p>
                      </div>

                      {resItem.url && (
                        <div className="pt-2">
                          <a
                            href={resItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900 transition-colors"
                          >
                            <span>Open Official Resource</span>
                            <span aria-hidden="true">→</span>
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Quick Launchers for Chapter */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                Ready to test your retention for this chapter?
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAskGuruForChapter(activeChapter)}
                  className="px-3.5 py-2 text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Ask AI Guru</span>
                </button>

                <button
                  onClick={() => onStartQuizForChapter(activeChapter.id)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-500 transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Start Chapter Quiz</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
