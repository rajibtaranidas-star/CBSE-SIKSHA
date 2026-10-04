import React from 'react';
import { CBSEClass } from '../types/cbse';
import { CBSE_CLASSES } from '../data/cbseData';
import { BookOpen, Sparkles, Award } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  selectedClass: CBSEClass;
  onSelectClass: (c: CBSEClass) => void;
  onOpenFormulas: () => void;
  streakDays: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  selectedClass,
  onSelectClass,
  onOpenFormulas,
  streakDays,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => onSelectTab('overview')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                CBSE Shiksha
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-slate-500 font-medium">
                NCERT Class VI–XII
              </span>
            </div>
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectTab('notes')}
              className={`transition-colors hover:text-slate-900 ${
                currentTab === 'notes' ? 'text-sky-600 font-semibold border-b-2 border-sky-600 pb-1 mt-1' : ''
              }`}
            >
              Chapter Notes
            </button>
            <button
              onClick={() => onSelectTab('slides')}
              className={`transition-colors hover:text-slate-900 ${
                currentTab === 'slides' ? 'text-sky-600 font-semibold border-b-2 border-sky-600 pb-1 mt-1' : ''
              }`}
            >
              Slide Decks (PPT)
            </button>
            <button
              onClick={() => onSelectTab('quizzes')}
              className={`transition-colors hover:text-slate-900 ${
                currentTab === 'quizzes' ? 'text-sky-600 font-semibold border-b-2 border-sky-600 pb-1 mt-1' : ''
              }`}
            >
              Interactive Quizzes
            </button>
            <button
              onClick={() => onSelectTab('pyqs')}
              className={`transition-colors hover:text-slate-900 ${
                currentTab === 'pyqs' ? 'text-sky-600 font-semibold border-b-2 border-sky-600 pb-1 mt-1' : ''
              }`}
            >
              Board PYQs
            </button>
            <button
              onClick={() => onSelectTab('tracker')}
              className={`transition-colors hover:text-slate-900 ${
                currentTab === 'tracker' ? 'text-sky-600 font-semibold border-b-2 border-sky-600 pb-1 mt-1' : ''
              }`}
            >
              Progress Tracker
            </button>
            <button
              onClick={() => onSelectTab('chatbot')}
              className={`flex items-center gap-1.5 transition-colors hover:text-slate-900 ${
                currentTab === 'chatbot' ? 'text-sky-600 font-semibold border-b-2 border-sky-600 pb-1 mt-1' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Chatbot</span>
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions & Class switcher */}
          <div className="flex items-center gap-3">
            {/* Study Streak indicator */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-600 font-medium px-2.5 py-1.5 bg-slate-100 rounded-md">
              <Award className="w-4 h-4 text-amber-600" />
              <span>{streakDays} Day Streak</span>
            </div>

            {/* Class Selector Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
              <label htmlFor="class-select" className="sr-only">Select CBSE Class</label>
              <select
                id="class-select"
                value={selectedClass}
                onChange={(e) => onSelectClass(e.target.value as CBSEClass)}
                className="bg-white text-xs font-semibold text-slate-800 border-0 rounded-md py-1.5 pl-2.5 pr-6 shadow-sm focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                {CBSE_CLASSES.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.label} ({cls.stage})
                  </option>
                ))}
              </select>
            </div>

            {/* Formula Sheet Trigger */}
            <button
              onClick={onOpenFormulas}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs hidden sm:block whitespace-nowrap"
            >
              Formula Sheets
            </button>
          </div>
        </div>

        {/* Mobile secondary tab bar */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-slate-100 overflow-x-auto text-xs font-medium gap-2">
          <button
            onClick={() => onSelectTab('overview')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${currentTab === 'overview' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-600'}`}
          >
            Overview
          </button>
          <button
            onClick={() => onSelectTab('notes')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${currentTab === 'notes' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-600'}`}
          >
            Notes
          </button>
          <button
            onClick={() => onSelectTab('slides')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${currentTab === 'slides' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-600'}`}
          >
            PPT Slides
          </button>
          <button
            onClick={() => onSelectTab('quizzes')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${currentTab === 'quizzes' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-600'}`}
          >
            Quizzes
          </button>
          <button
            onClick={() => onSelectTab('pyqs')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${currentTab === 'pyqs' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-600'}`}
          >
            PYQs
          </button>
          <button
            onClick={() => onSelectTab('tracker')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${currentTab === 'tracker' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-600'}`}
          >
            Tracker
          </button>
          <button
            onClick={() => onSelectTab('chatbot')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md flex items-center gap-1 ${currentTab === 'chatbot' ? 'bg-amber-50 text-amber-800 font-semibold' : 'text-slate-600'}`}
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            AI Chat
          </button>
        </div>
      </div>
    </header>
  );
};
