import React, { useState } from 'react';
import { CBSEClass, PYQPaper } from '../types/cbse';
import { CBSE_PYQS, CBSE_SUBJECTS } from '../data/cbseData';
import {
  FileText,
  Clock,
  Award,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Printer,
  CheckCircle,
  HelpCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

interface PYQExplorerProps {
  selectedClass: CBSEClass;
  bookmarkedPyqIds: string[];
  onToggleBookmarkPyq: (pyqId: string) => void;
}

export const PYQExplorer: React.FC<PYQExplorerProps> = ({
  selectedClass,
  bookmarkedPyqIds,
  onToggleBookmarkPyq,
}) => {
  const availableSubjects = CBSE_SUBJECTS.filter((s) => s.classes.includes(selectedClass));
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    availableSubjects[0]?.id || 'science'
  );

  // Available papers for this class
  const classPapers = CBSE_PYQS.filter((p) => p.classNum === selectedClass);
  const subjectPapers = classPapers.filter((p) => p.subjectId === selectedSubjectId);

  // Fallback to any paper for this class if subject filter yields none
  const papersToDisplay = subjectPapers.length > 0 ? subjectPapers : classPapers;

  const [activePaperId, setActivePaperId] = useState<string>(
    papersToDisplay[0]?.id || CBSE_PYQS[0].id
  );

  const activePaper: PYQPaper =
    CBSE_PYQS.find((p) => p.id === activePaperId) || papersToDisplay[0] || CBSE_PYQS[0];

  // Accordion state for revealed answers: Map of question identifier -> boolean
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [revealAll, setRevealAll] = useState(false);

  const toggleAnswer = (key: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleToggleRevealAll = () => {
    const next = !revealAll;
    setRevealAll(next);
    const updated: Record<string, boolean> = {};
    activePaper.sections.forEach((sec, sIdx) => {
      sec.questions.forEach((q, qIdx) => {
        updated[`${sIdx}-${qIdx}`] = next;
      });
    });
    setRevealedAnswers(updated);
  };

  const isBookmarked = bookmarkedPyqIds.includes(activePaper.id);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            CBSE Board & Annual Examination Archive · Class {selectedClass}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Previous Year Question Papers (PYQs) & Marking Schemes
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleRevealAll}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
          >
            {revealAll ? <EyeOff className="w-3.5 h-3.5 text-slate-500" /> : <Eye className="w-3.5 h-3.5 text-slate-500" />}
            <span>{revealAll ? 'Hide All Solutions' : 'Reveal All Solutions'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print Paper</span>
          </button>
        </div>
      </div>

      {/* Subject Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {availableSubjects.map((sub) => {
          const isActive = selectedSubjectId === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubjectId(sub.id);
                const first = classPapers.find((p) => p.subjectId === sub.id);
                if (first) setActivePaperId(first.id);
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {sub.name}
            </button>
          );
        })}
      </div>

      {/* Paper Switcher Pill Bar */}
      {papersToDisplay.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs text-slate-500 font-medium">Select Paper:</span>
          {papersToDisplay.map((paper) => (
            <button
              key={paper.id}
              onClick={() => {
                setActivePaperId(paper.id);
                setRevealedAnswers({});
                setRevealAll(false);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
                activePaperId === paper.id
                  ? 'bg-sky-50 border-sky-400 text-sky-900 font-semibold'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {paper.year} · {paper.title.split('(')[0]}
            </button>
          ))}
        </div>
      )}

      {/* Main Question Paper Container (Clean Academic Exam Sheet Layout) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-10 space-y-8 print:p-0 print:border-none print:shadow-none">
        {/* Exam Header */}
        <div className="text-center space-y-2 border-b-2 border-slate-900 pb-6">
          <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">
            Central Board of Secondary Education · Class {activePaper.classNum}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {activePaper.title}
          </h1>

          {/* Clean Unboxed Metadata */}
          <div className="flex items-center justify-center gap-3 text-xs font-semibold text-slate-600 pt-1">
            <span>Time Allowed: {activePaper.timeAllowedMinutes / 60} Hours</span>
            <span>·</span>
            <span>Maximum Marks: {activePaper.totalMarks}</span>
            <span>·</span>
            <span className="text-sky-700">{activePaper.examType}</span>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => onToggleBookmarkPyq(activePaper.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border flex items-center gap-1.5 transition-colors ${
                isBookmarked
                  ? 'bg-sky-50 border-sky-300 text-sky-800 font-semibold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-sky-600 text-sky-600' : ''}`} />
              <span>{isBookmarked ? 'Saved in Tracker' : 'Bookmark this Paper'}</span>
            </button>
          </div>
        </div>

        {/* General Instructions Box */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
          <div className="font-bold text-slate-900 uppercase tracking-wide">
            General Instructions:
          </div>
          <ol className="list-decimal list-inside space-y-1 text-slate-600 leading-relaxed">
            {activePaper.instructions.map((inst, idx) => (
              <li key={idx}>{inst}</li>
            ))}
          </ol>
        </div>

        {/* Paper Sections */}
        <div className="space-y-8 divide-y divide-slate-100">
          {activePaper.sections.map((section, sIdx) => (
            <div key={sIdx} className="pt-6 space-y-6">
              {/* Section Title */}
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {section.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {section.description}
                </p>
              </div>

              {/* Questions in Section */}
              <div className="space-y-5">
                {section.questions.map((q, qIdx) => {
                  const key = `${sIdx}-${qIdx}`;
                  const isRevealed = revealedAnswers[key] || revealAll;

                  return (
                    <div
                      key={qIdx}
                      className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4 hover:border-slate-300 transition-colors"
                    >
                      {/* Question Top Row: Q Number, Marks */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            Q{q.qNumber}
                          </span>
                          <div className="text-sm font-semibold text-slate-900 whitespace-pre-line leading-relaxed">
                            {q.questionText}
                          </div>
                        </div>
                        <span className="text-xs font-bold text-slate-600 bg-slate-200/80 px-2.5 py-1 rounded-md shrink-0 tabular-nums">
                          [{q.marks} Mark{q.marks > 1 ? 's' : ''}]
                        </span>
                      </div>

                      {/* Reveal Answer Accordion Button */}
                      <div className="pt-2">
                        <button
                          onClick={() => toggleAnswer(key)}
                          className={`text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                            isRevealed ? 'text-sky-700' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <span>{isRevealed ? 'Hide Model Answer & Marking Scheme' : 'Reveal Model Answer & Marking Scheme'}</span>
                          {isRevealed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Answer & Marking Scheme Panel */}
                      {isRevealed && (
                        <div className="p-4 bg-white rounded-lg border border-slate-200 text-xs space-y-4 animate-in fade-in-50 duration-200">
                          {/* Official Step Model Answer */}
                          <div className="space-y-1.5">
                            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-sky-800">
                              CBSE Topper Model Answer:
                            </div>
                            <div className="p-3 bg-slate-50 rounded-md font-sans text-slate-800 whitespace-pre-line leading-relaxed border border-slate-100">
                              {q.modelAnswer}
                            </div>
                          </div>

                          {/* Official Marking Scheme Rubric */}
                          {q.markingScheme && q.markingScheme.length > 0 && (
                            <div className="p-3 bg-emerald-50/70 rounded-md border border-emerald-100 text-emerald-950 space-y-1.5">
                              <div className="font-bold text-emerald-900 uppercase tracking-wider text-[11px]">
                                Official Step-by-Step Marking Distribution:
                              </div>
                              <ul className="list-disc list-inside space-y-1 text-slate-700">
                                {q.markingScheme.map((item, mIdx) => (
                                  <li key={mIdx}>
                                    <span className="font-medium text-emerald-900">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
