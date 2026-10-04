import React, { useState } from 'react';
import { CBSEClass } from '../types/cbse';
import { CBSE_CLASSES, CBSE_SUBJECTS } from '../data/cbseData';
import {
  Sparkles,
  Send,
  BookOpen,
  CheckCircle,
  Copy,
  Check,
  Volume2,
  VolumeX,
  HelpCircle,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';

interface AIDoubtSolverProps {
  selectedClass: CBSEClass;
  initialTopic?: string;
  initialSubject?: string;
}

const PRESET_DOUBTS = [
  'Derive Lens Formula using Cartesian sign convention for convex lens.',
  'Why does sky appear blue and sun reddish at sunrise and sunset?',
  'Explain double circulation in human heart with pulmonary and systemic loops.',
  'How to score full marks in CBSE Assertion-Reason and Case-Based questions?',
  'What is the difference between combination, decomposition and displacement reactions with examples?',
  'State and prove Gauss theorem in electrostatics with its applications.',
];

export const AIDoubtSolver: React.FC<AIDoubtSolverProps> = ({
  selectedClass,
  initialTopic = '',
  initialSubject = 'Science',
}) => {
  const [classNum, setClassNum] = useState<CBSEClass>(selectedClass);
  const [subject, setSubject] = useState(initialSubject);
  const [prompt, setPrompt] = useState(initialTopic);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAskGuru = async (textToAsk?: string) => {
    const question = textToAsk || prompt;
    if (!question.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);
    setAiResponse(null);

    try {
      const res = await fetch('/api/ai/doubt-solver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: question,
          classNum,
          subject,
          chapterTitle: 'General NCERT Syllabus',
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned error ${res.status}`);
      }

      const data = await res.json();
      setAiResponse(data.answer);
    } catch (err: any) {
      console.error('Error asking AI:', err);
      setErrorMessage(
        'Could not reach AI Tutor. Please check internet connection or retry in a moment.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!aiResponse) return;
    navigator.clipboard.writeText(aiResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window) || !aiResponse) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      // clean markdown asterisks for cleaner speech
      const cleaned = aiResponse.replace(/[*#_`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wide">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>CBSE Shiksha Guru · Real-Time NCERT Doubt Assistant</span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Ask Any CBSE Doubt, Theorem, or Exam Question
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
          Powered by Gemini 3.8 Flash. Answers are strictly formatted according to official NCERT textbooks and CBSE board exam marking schemes—complete with step allocations, keywords to underline, and common mistakes to avoid.
        </p>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Student Class:
            </label>
            <select
              value={classNum}
              onChange={(e) => setClassNum(e.target.value as CBSEClass)}
              className="w-full bg-slate-50 border border-slate-200 text-xs font-medium rounded-lg p-2.5 focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              {CBSE_CLASSES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label} ({c.stage})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Subject:
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs font-medium rounded-lg p-2.5 focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="Science">Science (Physics, Chemistry, Biology)</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics (Senior Secondary)</option>
              <option value="Chemistry">Chemistry (Senior Secondary)</option>
              <option value="Biology">Biology (Senior Secondary)</option>
              <option value="Social Science">Social Science (History, Geo, Civics, Eco)</option>
              <option value="English">English Language & Literature</option>
              <option value="Computer Science">Computer Science / IP</option>
            </select>
          </div>
        </div>

        {/* Question Text Area */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-semibold text-slate-700">
            Type your doubt or question:
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Explain why ionic compounds conduct electricity in molten state but not in solid state..."
              className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white resize-none"
            />
            <button
              onClick={() => handleAskGuru()}
              disabled={isLoading || !prompt.trim()}
              className="absolute right-3 bottom-3.5 px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Analyzing...</span>
              ) : (
                <>
                  <span>Ask Guru</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preset Question Pills */}
        <div className="space-y-2 pt-1">
          <div className="text-xs font-semibold text-slate-500">Popular Board Doubts:</div>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_DOUBTS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(preset);
                  handleAskGuru(preset);
                }}
                className="text-xs text-slate-700 bg-slate-100 hover:bg-sky-50 hover:text-sky-800 px-2.5 py-1 rounded-md transition-colors text-left"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error state */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* AI Response Display Card */}
      {aiResponse && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-5 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  CBSE Board Examination Model Answer
                </span>
                <span className="text-[11px] text-slate-500">
                  Grounded in NCERT Guidelines · Class {classNum} {subject}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleSpeech}
                title={isSpeaking ? 'Stop speech' : 'Read answer aloud'}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {isSpeaking ? (
                  <VolumeX className="w-4 h-4 text-amber-600 animate-pulse" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={handleCopy}
                title="Copy answer text"
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1 text-xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Formatted Markdown Content */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-800">
            {aiResponse}
          </div>

          {/* Footer Disclaimer */}
          <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-500 border border-slate-100 flex items-center justify-between">
            <span>Verified against Central Board of Secondary Education curriculum rubrics.</span>
            <span className="font-semibold text-sky-700">NCERT Grounded</span>
          </div>
        </div>
      )}
    </div>
  );
};
