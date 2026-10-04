import React from 'react';
import { CBSEClass } from '../types/cbse';
import { CBSE_CLASSES } from '../data/cbseData';
import { BookOpen } from 'lucide-react';

interface FooterProps {
  selectedClass: CBSEClass;
  onSelectClass: (c: CBSEClass) => void;
  onSelectTab: (tab: string) => void;
  onOpenFormulas: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  selectedClass,
  onSelectClass,
  onSelectTab,
  onOpenFormulas,
}) => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-sky-600 flex items-center justify-center text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">
                CBSE Shiksha
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Academic study resource for students from Class VI to XII. Aligned with the official National Council of Educational Research and Training (NCERT) textbooks and Central Board of Secondary Education (CBSE) syllabus.
            </p>
          </div>

          {/* Quick Classes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Classes VI to XII
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {CBSE_CLASSES.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => {
                    onSelectClass(cls.id);
                    onSelectTab('notes');
                  }}
                  className={`text-left transition-colors hover:text-sky-600 ${
                    selectedClass === cls.id ? 'font-semibold text-sky-700' : 'text-slate-600'
                  }`}
                >
                  {cls.label}
                </button>
              ))}
            </div>
          </div>

          {/* Core Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Exam Preparation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('notes')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Chapter Notes & NCERT Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('quizzes')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Assertion-Reason Quizzes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('pyqs')}
                  className="hover:text-slate-900 transition-colors"
                >
                  CBSE Board Question Papers (2020–2024)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('tracker')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Personalized Study Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFormulas}
                  className="hover:text-slate-900 transition-colors"
                >
                  Formula & Derivation Cheat Sheet
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Guidelines Notice */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Curriculum Reference
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Content strictly adheres to the rationalized NCERT syllabi guidelines and modern NEP-compliant competency-based question patterns (Assertion-Reasoning, Case Studies, Practical Skills).
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} CBSE Shiksha Portal. Dedicated to Indian school students nationwide.
          </div>
          <div className="flex items-center gap-4">
            <span>NCERT Focused</span>
            <span>·</span>
            <span>Competency-Based Assessment</span>
            <span>·</span>
            <span>Centum Score Targeted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
