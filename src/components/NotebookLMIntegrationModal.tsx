import React, { useState } from 'react';
import { Chapter } from '../types/cbse';
import {
  X,
  Copy,
  Check,
  Download,
  ExternalLink,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  Headphones,
  FileText,
  HelpCircle,
} from 'lucide-react';

interface NotebookLMIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: Chapter;
}

export const NotebookLMIntegrationModal: React.FC<NotebookLMIntegrationModalProps> = ({
  isOpen,
  onClose,
  chapter,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<'source' | 'audio-script' | 'guide'>('source');
  const [isGenerating, setIsGenerating] = useState(false);
  const [dynamicPack, setDynamicPack] = useState<{
    notebooklmSourceText: string;
    audioOverviewScript: { speaker: string; text: string }[];
    faqList: { q: string; a: string }[];
  } | null>(null);

  if (!isOpen) return null;

  // Prepare standard NotebookLM source text from chapter content
  const sourceText =
    dynamicPack?.notebooklmSourceText ||
    `# NCERT Class ${chapter.classNum} ${chapter.subjectId.toUpperCase()}: ${chapter.title}
Source Document for Google NotebookLM (notebooklm.google.com)
Curriculum: Central Board of Secondary Education (CBSE)
Textbook: ${chapter.ncertBookName} (Rationalized Latest Edition)
Weightage: ${chapter.weightageMarks} Marks

## 1. Chapter Overview & Core Principles
${chapter.summary}

## 2. Fundamental NCERT Learning Points
${chapter.keyPoints.map((pt, i) => `${i + 1}. ${pt}`).join('\n')}

## 3. Crucial Definitions for Board Marking
${chapter.keyDefinitions.map((d) => `- **${d.term}:** ${d.definition}`).join('\n')}

${chapter.formulasOrLaws && chapter.formulasOrLaws.length > 0 ? `## 4. Key Formulas, Laws & Chemical Reactions\n${chapter.formulasOrLaws.map((f) => `### ${f.title}\nExpression: \`${f.expression}\`\nExplanation: ${f.explanation}`).join('\n\n')}` : ''}

## 5. Solved High-Yield NCERT Questions & Rubrics
${chapter.ncertSolutions.map((sol) => `### [${sol.type}] ${sol.questionNumber}: ${sol.question}\n**Official Step Model Answer:**\n${sol.answer}\n${sol.markingPoints ? `*Marking Points:* ${sol.markingPoints.join('; ')}` : ''}`).join('\n\n')}

## 6. Common Examiner Traps & Board Tips
${chapter.commonMistakes.map((m) => `- ⚠️ Caution: ${m}`).join('\n')}
${chapter.boardExamTips.map((t) => `- ✅ Tip: ${t}`).join('\n')}
`;

  const audioScript =
    dynamicPack?.audioOverviewScript || [
      {
        speaker: 'Maya',
        text: `Hey everyone, welcome back! Today we are taking a deep dive into Class ${chapter.classNum} ${chapter.subjectId}: "${chapter.title}". Aarav, what stands out most about this NCERT chapter?`,
      },
      {
        speaker: 'Aarav',
        text: `Well Maya, what makes this chapter critical is how CBSE tests it in the board exams. It is not just about memorizing facts; it is about cause-and-effect reasoning. If you understand the core mechanism, the 3-mark and 5-mark questions become completely straightforward.`,
      },
      {
        speaker: 'Maya',
        text: `Exactly! Take for example the key concepts: ${chapter.keyPoints[0] || 'the fundamental laws'}. A lot of students lose marks simply because they omit physical state symbols or forget the units.`,
      },
      {
        speaker: 'Aarav',
        text: `Right on point. In the CBSE marking scheme, half a mark is strictly allotted for the formula and another half for the balanced state. So keeping your handwriting neat and underlining keywords is half the battle won.`,
      },
      {
        speaker: 'Maya',
        text: `So whether you are solving in-text questions or attempting assertion-reason drills, remember this source document. Export it directly into your NotebookLM notebook and ask it to quiz you on your weakest topics!`,
      },
    ];

  const handleCopySource = () => {
    navigator.clipboard.writeText(sourceText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSource = () => {
    const blob = new Blob([sourceText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CBSE_Class_${chapter.classNum}_${chapter.title.replace(/\s+/g, '_')}_NotebookLM_Source.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Play audio overview simulation using Web Speech Synthesis
  const handleToggleAudioPodcast = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      let currentIndex = 0;

      const speakNextLine = () => {
        if (currentIndex >= audioScript.length) {
          setIsPlayingAudio(false);
          return;
        }

        const line = audioScript[currentIndex];
        const utterance = new SpeechSynthesisUtterance(`${line.speaker} says: ${line.text}`);
        utterance.rate = 1.0;
        // Maya female voice pitch adjustment, Aarav male pitch adjustment
        utterance.pitch = line.speaker === 'Maya' ? 1.15 : 0.9;

        utterance.onend = () => {
          currentIndex += 1;
          speakNextLine();
        };

        utterance.onerror = () => {
          setIsPlayingAudio(false);
        };

        window.speechSynthesis.speak(utterance);
      };

      setIsPlayingAudio(true);
      speakNextLine();
    }
  };

  const handleGenerateFreshPack = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/notebooklm-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterTitle: chapter.title,
          classNum: chapter.classNum,
          subject: chapter.subjectId,
          summary: chapter.summary,
          keyPoints: chapter.keyPoints,
        }),
      });
      const data = await res.json();
      if (data.notebooklmSourceText) {
        setDynamicPack(data);
      }
    } catch (err) {
      console.error('Error generating NotebookLM pack:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[88vh] flex flex-col overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Google NotebookLM Integration Hub
                </h2>
                <span className="text-[11px] font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                  AI Study Partner
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Export NCERT Class {chapter.classNum} chapter into Google NotebookLM for AI audio overviews and study guides
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (isPlayingAudio) window.speechSynthesis?.cancel();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls Bar */}
        <div className="px-5 py-3 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveTab('source')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'source'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              NotebookLM Source Text
            </button>
            <button
              onClick={() => setActiveTab('audio-script')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'audio-script'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Headphones className="w-3.5 h-3.5 text-sky-600" />
              <span>Audio Overview Deep Dive</span>
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'guide'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              How to Use with NotebookLM
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerateFreshPack}
              disabled={isGenerating}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{isGenerating ? 'Synthesizing...' : 'Regenerate with AI'}</span>
            </button>

            <a
              href="https://notebooklm.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Launch NotebookLM</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Tab 1: Source Document */}
          {activeTab === 'source' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-sky-50/70 p-4 rounded-xl border border-sky-200">
                <div className="text-xs text-sky-950 space-y-0.5">
                  <div className="font-bold text-sky-900">
                    Ready-to-Use NotebookLM Primary Source
                  </div>
                  <div>
                    This pre-formatted document contains chapter summaries, definitions, formulas, and verified NCERT solutions.
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopySource}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-white border border-sky-300 text-sky-900 hover:bg-sky-50 transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-sky-700" />}
                    <span>{copied ? 'Copied Source!' : 'Copy Source Text'}</span>
                  </button>

                  <button
                    onClick={handleDownloadSource}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-500 transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .txt</span>
                  </button>
                </div>
              </div>

              {/* Source Text Preview Box */}
              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs max-h-96 overflow-y-auto whitespace-pre-line leading-relaxed border border-slate-800 selection:bg-sky-700">
                {sourceText}
              </div>
            </div>
          )}

          {/* Tab 2: Audio Overview Deep Dive Script */}
          {activeTab === 'audio-script' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50/70 p-4 rounded-xl border border-amber-200">
                <div className="text-xs text-amber-950 space-y-0.5">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Headphones className="w-4 h-4 text-amber-600" />
                    <span>NotebookLM Audio Overview Experience</span>
                  </div>
                  <div>
                    Dual-host podcast format (Maya & Aarav) breaking down complex concepts with conversational metaphors.
                  </div>
                </div>

                <button
                  onClick={handleToggleAudioPodcast}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all shadow-xs ${
                    isPlayingAudio
                      ? 'bg-amber-600 text-white animate-pulse'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>Pause Podcast</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-amber-400" />
                      <span>Listen to Audio Overview</span>
                    </>
                  )}
                </button>
              </div>

              {/* Script Dialogue Flow */}
              <div className="space-y-3">
                {audioScript.map((line, idx) => {
                  const isMaya = line.speaker === 'Maya';
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1.5 transition-colors ${
                        isMaya
                          ? 'bg-sky-50/60 border-sky-200 text-sky-950'
                          : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold text-[11px] px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            isMaya ? 'bg-sky-200 text-sky-900' : 'bg-slate-200 text-slate-800'
                          }`}
                        >
                          {line.speaker}
                        </span>
                        <span className="text-[11px] text-slate-400">Host</span>
                      </div>
                      <p className="leading-relaxed font-sans">{line.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: Step-by-Step Instructions */}
          {activeTab === 'guide' && (
            <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm">
                  Why Use Google NotebookLM for CBSE Board Preparation?
                </h3>
                <p>
                  Google NotebookLM allows students to ground Gemini models exclusively in their own verified NCERT textbook sources, eliminating hallucinations and ensuring answers match exact CBSE marking schemes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 shadow-xs">
                  <div className="w-7 h-7 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
                    1
                  </div>
                  <h4 className="font-bold text-slate-900">Copy or Download Source</h4>
                  <p className="text-slate-600">
                    Click &quot;Download .txt&quot; or &quot;Copy Source Text&quot; from this dialog to get your clean chapter notes.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 shadow-xs">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </div>
                  <h4 className="font-bold text-slate-900">Upload to NotebookLM</h4>
                  <p className="text-slate-600">
                    Open <span className="font-semibold text-indigo-700">notebooklm.google.com</span>, create a new notebook for your class, and upload this text file as a Source.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 shadow-xs">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    3
                  </div>
                  <h4 className="font-bold text-slate-900">Generate Study Guides & Audio</h4>
                  <p className="text-slate-600">
                    Click &quot;Generate Audio Overview&quot; for an instant 10-minute deep dive podcast, or ask NotebookLM to generate custom flashcards and mock questions!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Google NotebookLM is a trademark of Google LLC. Source text formatted for seamless ingestion.</span>
          <button
            onClick={() => {
              if (isPlayingAudio) window.speechSynthesis?.cancel();
              onClose();
            }}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Close Hub
          </button>
        </div>
      </div>
    </div>
  );
};
