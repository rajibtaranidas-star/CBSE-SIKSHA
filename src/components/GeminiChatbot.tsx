import React, { useState, useRef, useEffect } from 'react';
import { CBSEClass, ChatMessage } from '../types/cbse';
import { CBSE_CLASSES, CBSE_SUBJECTS } from '../data/cbseData';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Globe,
  ExternalLink,
  RotateCcw,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Search,
} from 'lucide-react';

interface GeminiChatbotProps {
  selectedClass: CBSEClass;
}

const DEFAULT_PROMPTS = [
  'What are the deleted/rationalized topics in the latest NCERT edition for Class 10/12?',
  'Explain the Lens Formula and Cartesian sign convention with diagram cues.',
  'How to write high-scoring answers in CBSE Case-Based questions?',
  'What is the difference between Aerobic and Anaerobic respiration in humans & yeast?',
  'Derive the integrated rate equation for a first-order chemical reaction.',
];

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({ selectedClass }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: `Hello! I am **CBSE Shiksha AI Tutor & Research Scholar**, powered by Gemini with live **Google Search Grounding**.\n\nI have access to the latest rationalized NCERT textbooks and official CBSE circulars. Ask me any conceptual question, request step-by-step NCERT solutions, check syllabus updates, or ask for board exam marking schemes!`,
      timestamp: Date.now(),
      groundingSources: [
        { title: 'NCERT Official Portal', uri: 'https://ncert.nic.in' },
        { title: 'CBSE Academic Central Board', uri: 'https://cbseacademic.nic.in' },
      ],
      searchQueries: ['CBSE NCERT latest curriculum 2025 2026'],
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Science');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for API
      const conversationHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationHistory,
          classNum: selectedClass,
          subject: selectedSubject,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();

      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.text || 'Unable to retrieve answer.',
        timestamp: Date.now(),
        groundingSources: data.groundingSources,
        searchQueries: data.searchQueries,
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: 'Sorry, I encountered an issue connecting to the Gemini knowledge base. Please check your internet connection or try again.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear all conversation history?')) {
      if (speakingId) window.speechSynthesis?.cancel();
      setMessages([
        {
          id: 'welcome-fresh',
          role: 'model',
          text: `Chat cleared! How can I assist you with Class ${selectedClass} studies today?`,
          timestamp: Date.now(),
        },
      ]);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleSpeech = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    } else {
      window.speechSynthesis.cancel();
      const cleaned = text.replace(/[*#_`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = 1.0;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      window.speechSynthesis.speak(utterance);
      setSpeakingId(id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Top Banner & Subject Selector */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">
                Gemini Multi-Turn AI Tutor
              </h2>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <Globe className="w-3 h-3 text-emerald-600" />
                Google Search Grounded
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Real-time NCERT syllabus facts, circulars & step-by-step marking rubrics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Subject selector */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg py-1.5 px-2.5 focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            <option value="Science">Science (PCB)</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Social Science">Social Science</option>
            <option value="English">English</option>
          </select>

          <button
            onClick={handleClearChat}
            title="Reset conversation"
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Thread Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[560px] overflow-hidden">
        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isSpeakingThis = speakingId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-slate-900 text-white'
                      : 'bg-gradient-to-tr from-sky-600 to-indigo-600 text-white shadow-xs'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 ${
                    isUser
                      ? 'bg-slate-900 text-white rounded-tr-none'
                      : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {/* Text Content */}
                  <div className="whitespace-pre-line font-sans prose prose-slate max-w-none">
                    {msg.text}
                  </div>

                  {/* Grounding Source Citations Badge & Links */}
                  {msg.groundingSources && msg.groundingSources.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/80 mt-2 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        <Globe className="w-3 h-3 text-emerald-600" />
                        <span>Verified Search Grounding Citations:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.groundingSources.map((src, sIdx) => (
                          <a
                            key={sIdx}
                            href={src.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 px-2 py-0.5 rounded-md border border-sky-200 transition-colors"
                          >
                            <span className="truncate max-w-[180px]">{src.title}</span>
                            <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search Queries Used */}
                  {msg.searchQueries && msg.searchQueries.length > 0 && (
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <Search className="w-2.5 h-2.5" />
                      <span>Grounded queries: {msg.searchQueries.join(', ')}</span>
                    </div>
                  )}

                  {/* Actions Bar inside Model Bubble */}
                  {!isUser && (
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60 text-slate-500 text-[11px]">
                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        className="hover:text-slate-800 transition-colors flex items-center gap-1"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => handleToggleSpeech(msg.id, msg.text)}
                        className="hover:text-slate-800 transition-colors flex items-center gap-1"
                      >
                        {isSpeakingThis ? (
                          <VolumeX className="w-3 h-3 text-amber-600 animate-pulse" />
                        ) : (
                          <Volume2 className="w-3 h-3" />
                        )}
                        <span>{isSpeakingThis ? 'Stop' : 'Listen'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl rounded-tl-none flex items-center gap-2 text-xs text-slate-500">
                <Globe className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                <span>Searching Google and consulting rationalized NCERT edition...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Pills */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Suggested:
          </span>
          {DEFAULT_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              disabled={isLoading}
              className="text-[11px] text-slate-600 bg-white border border-slate-200 hover:border-sky-400 hover:text-sky-800 px-2.5 py-1 rounded-md transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask any doubt or syllabus question for Class ${selectedClass} ${selectedSubject}...`}
              disabled={isLoading}
              className="flex-1 p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-1.5 disabled:opacity-40 shadow-xs"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
