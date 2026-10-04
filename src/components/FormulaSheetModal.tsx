import React, { useState } from 'react';
import { CBSEClass, FormulaItem } from '../types/cbse';
import { CBSE_FORMULAS, CBSE_CLASSES } from '../data/cbseData';
import { X, Search, Copy, Check, Calculator, BookOpen } from 'lucide-react';

interface FormulaSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialClass: CBSEClass;
}

export const FormulaSheetModal: React.FC<FormulaSheetModalProps> = ({
  isOpen,
  onClose,
  initialClass,
}) => {
  const [selectedClass, setSelectedClass] = useState<CBSEClass | 'all'>(initialClass);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = CBSE_FORMULAS.filter((f) => {
    const matchClass = selectedClass === 'all' || f.classNum === selectedClass;
    const matchSubject = selectedSubject === 'all' || f.subjectId === selectedSubject;
    const matchSearch =
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchClass && matchSubject && matchSearch;
  });

  const handleCopyFormula = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                CBSE High-Yield Formula Cheat Sheet
              </h2>
              <p className="text-xs text-slate-500">
                Quick revision handbook for Board Examination numericals
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 border-b border-slate-100 bg-white space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search formulas by name, law, or variables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Class filter */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Class:</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value as CBSEClass)}
                className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-lg py-2 px-3 focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                {CBSE_CLASSES.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject filter */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Subject:</span>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-lg py-2 px-3 focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                <option value="all">All Subjects</option>
                <option value="maths">Mathematics</option>
                <option value="science">Science</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
              </select>
            </div>
          </div>
        </div>

        {/* Formula Cards Grid */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500 space-y-1">
              <p>No formulas found matching your filter criteria.</p>
              <p className="text-slate-400">Try changing class or searching for keywords like &quot;Ohm&quot;, &quot;Quadratic&quot;, &quot;Lens&quot;.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 hover:border-slate-300 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[11px] font-semibold text-sky-700 uppercase tracking-wide">
                          Class {item.classNum} · {item.chapterTitle}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                          {item.title}
                        </h4>
                      </div>
                      <button
                        onClick={() => handleCopyFormula(item.id, item.formula)}
                        title="Copy formula expression"
                        className="p-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Formula Monospace Display */}
                    <div className="p-3 bg-slate-900 text-amber-300 font-mono text-xs sm:text-sm font-semibold rounded-lg whitespace-pre-line border border-slate-800">
                      {item.formula}
                    </div>

                    {/* Variables */}
                    <div className="text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-800">Variables: </span>
                      {item.variables}
                    </div>
                  </div>

                  {/* Application note */}
                  <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">Exam Context: </span>
                    {item.application}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Formula bank aligned with standard NCERT appendices.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Close Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
