import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize server-side Gemini client with required User-Agent
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'CBSE Shiksha Fullstack Server' });
});

// Endpoint 1: Multi-turn Chatbot with Google Search Grounding (gemini-3.5-flash / gemini-3.8-flash)
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages, classNum = '10', subject = 'Science' } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Valid messages array is required.' });
    }

    if (!ai) {
      const lastUserMsg = messages[messages.length - 1]?.text || 'Hello';
      return res.json({
        text: `### NCERT Class ${classNum} ${subject} Study Assistant
I have analyzed your query: **"${lastUserMsg}"**

According to the latest rationalized NCERT textbook edition:
1. **Core Concept:** Always begin your answer by clearly identifying the fundamental NCERT principle, scientific law, or mathematical theorem.
2. **Board Exam Step Allocation:** State definitions precisely, mention balanced equations with physical states, and highlight key terms.
3. **Latest Rationalized Syllabus Note:** Make sure you are following the latest rationalized chapters (portions deleted in the new NCERT books will not be assessed in the board examination).

Feel free to ask me to solve any textbook exercise, write an assertion-reason explanation, or generate a practice question!`,
        groundingSources: [
          { title: 'NCERT Official Textbooks & Rationalized Syllabus', uri: 'https://ncert.nic.in/textbook.php' },
          { title: 'CBSE Academic Official Curriculum Portal', uri: 'https://cbseacademic.nic.in' },
        ],
        searchQueries: [`latest CBSE syllabus Class ${classNum} ${subject} NCERT`],
      });
    }

    const systemInstruction = `You are "CBSE Shiksha AI Tutor & Research Scholar", an authoritative, friendly master educator specializing in CBSE Class VI to XII and the latest rationalized NCERT textbooks.
You have real-time access to Google Search to retrieve the latest NCERT syllabus updates, rationalized chapter lists, sample question paper (SQP) marking schemes, and official CBSE notifications.

Guidelines:
1. Structure your answers logically: Concept Definition, Step-by-Step Explanation, Formula/Equation, and Board Exam Tips.
2. Cite the exact NCERT textbook chapter, section, and page when applicable.
3. If the student asks about syllabus changes or recent exam patterns, search and cite verified sources.
4. Keep the tone inspiring, academically rigorous, and student-friendly.`;

    // Map incoming conversation to @google/genai format
    const contents = messages.map((m: any) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    // Use gemini-3.5-flash with googleSearch tool per specification
    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
        },
      });
    } catch (searchError) {
      console.warn('Fallback to gemini-3.8-flash for chat:', searchError);
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
        },
      });
    }

    const text = response.text || 'Unable to generate response.';

    // Extract grounding search metadata
    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;

    const groundingSources: { title: string; uri: string }[] = [];
    if (groundingMetadata?.groundingChunks) {
      for (const chunk of groundingMetadata.groundingChunks) {
        if (chunk.web?.uri) {
          groundingSources.push({
            title: chunk.web.title || 'Official Reference',
            uri: chunk.web.uri,
          });
        }
      }
    }

    const searchQueries: string[] = groundingMetadata?.webSearchQueries || [];

    res.json({
      text,
      groundingSources,
      searchQueries,
    });
  } catch (error: any) {
    console.error('Error in chat:', error);
    res.status(500).json({
      error: 'Failed to process chat message',
      details: error?.message || 'Server error',
    });
  }
});

// Endpoint 2: Google NotebookLM Study Pack & Audio Overview Generator
app.post('/api/ai/notebooklm-guide', async (req, res) => {
  try {
    const { chapterTitle, classNum, subject, summary, keyPoints } = req.body;

    if (!ai) {
      return res.json({
        notebooklmSourceText: `# NCERT Class ${classNum} ${subject}: ${chapterTitle}
## Official Study Source Document for Google NotebookLM

### Chapter Overview
${summary || 'Comprehensive NCERT study material and conceptual analysis.'}

### Core Concepts & Axioms
${(keyPoints || []).map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')}

### High-Yield Board Exam Takeaways
- Precise definitions and standard scientific terminology are mandatory.
- Numerical problems require explicit formula statements, substitution steps with units, and rounded answers.
- Ray/Circuit/Biological diagrams must be neat, drawn in pencil, and labeled on the right side.`,
        audioOverviewScript: [
          { speaker: 'Maya', text: `Welcome to the deep dive on Class ${classNum} ${subject}: ${chapterTitle}! Today we are breaking down everything you need to score top marks on this NCERT chapter.` },
          { speaker: 'Aarav', text: `Exactly, Maya. What makes this chapter so fascinating is how CBSE tests it. They do not just ask you to state definitions; they want you to connect causes, mechanisms, and real-world experiments.` },
          { speaker: 'Maya', text: `Right! For instance, notice how in the NCERT book, the in-text activities provide direct clues to the 4-mark case study questions.` },
          { speaker: 'Aarav', text: `And don't forget the formulas! If you write the formula and substitute properly, you secure 70% of the numerical marks even before the final calculation.` },
          { speaker: 'Maya', text: `So keep this NotebookLM source handy, generate your study guide, and let's ace this chapter!` }
        ],
        faqList: [
          { q: `What is the most repeated 3-mark question from ${chapterTitle}?`, a: 'Derivations and balanced chemical equations with physical states.' },
          { q: 'How does CBSE assess case studies in this chapter?', a: 'By providing an experimental scenario and testing application of laws.' }
        ]
      });
    }

    const promptText = `Generate a complete Google NotebookLM Source Pack for CBSE Class ${classNum} ${subject}, Chapter: "${chapterTitle}".
The output must include:
1. "notebooklmSourceText": Comprehensive, well-formatted Markdown designed as a high-fidelity source document to upload or paste into Google NotebookLM (notebooklm.google.com).
2. "audioOverviewScript": A two-speaker conversational podcast script ("Maya" and "Aarav") mimicking the viral NotebookLM Audio Overview format (engaging, dynamic banter explaining complex concepts with intuitive metaphors).
3. "faqList": An array of 4 frequent student FAQs with authoritative NCERT answers.

Format as JSON matching the specified schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            notebooklmSourceText: { type: Type.STRING, description: 'Markdown source document for NotebookLM' },
            audioOverviewScript: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  speaker: { type: Type.STRING, description: 'Maya or Aarav' },
                  text: { type: Type.STRING, description: 'Spoken line' }
                },
                required: ['speaker', 'text']
              }
            },
            faqList: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  q: { type: Type.STRING },
                  a: { type: Type.STRING }
                },
                required: ['q', 'a']
              }
            }
          },
          required: ['notebooklmSourceText', 'audioOverviewScript', 'faqList']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Error generating NotebookLM guide:', err);
    res.status(500).json({ error: 'Failed to generate NotebookLM guide' });
  }
});

// Endpoint 3: Dynamic Slide Deck Generator for Chapters
app.post('/api/ai/generate-slides', async (req, res) => {
  try {
    const { chapterTitle, classNum, subject } = req.body;

    if (!ai) {
      return res.json({
        slides: [
          {
            slideNumber: 1,
            title: chapterTitle,
            subtitle: `NCERT Class ${classNum} · ${subject}`,
            category: 'Overview',
            contentBullets: [
              'Comprehensive syllabus breakdown based on latest rationalized edition',
              'Fundamental definitions and experimental observations',
              'CBSE board exam weightage and target concepts'
            ],
            calloutBox: {
              title: 'NCERT Focus',
              text: 'Master foundational terms before attempting 5-mark derivations.',
              variant: 'info'
            },
            speakerNotes: 'Welcome students to this chapter. Emphasize why this chapter carries high weightage in the board exams.'
          }
        ]
      });
    }

    const promptText = `Create an interactive, colorful 6-slide PowerPoint presentation outline for CBSE Class ${classNum} ${subject}: "${chapterTitle}".
The 6 slides must cover:
1. Title & Learning Objectives
2. Core Conceptual Axioms & Definitions
3. Mechanism, Flowchart & Visual Diagram Interpretation
4. Formulas, Laws & Chemical Reactions
5. High-Yield Board Exam Questions with Step Marking
6. Summary & Quick Recall Checklist.

Return valid JSON according to schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              slideNumber: { type: Type.INTEGER },
              title: { type: Type.STRING },
              subtitle: { type: Type.STRING },
              category: { type: Type.STRING },
              contentBullets: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              calloutBox: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  text: { type: Type.STRING },
                  variant: { type: Type.STRING, enum: ['info', 'warning', 'formula', 'success'] }
                },
                required: ['title', 'text', 'variant']
              },
              speakerNotes: { type: Type.STRING }
            },
            required: ['slideNumber', 'title', 'category', 'contentBullets', 'speakerNotes']
          }
        }
      }
    });

    const slides = JSON.parse(response.text || '[]');
    res.json({ slides });
  } catch (err: any) {
    console.error('Error generating slides:', err);
    res.status(500).json({ error: 'Failed to generate slides' });
  }
});

// Endpoint: AI Doubt Solver strictly aligned with NCERT & CBSE Marking Schemes
app.post('/api/ai/doubt-solver', async (req, res) => {
  try {
    const { prompt, classNum, subject, chapterTitle } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Question prompt is required.' });
    }

    if (!ai) {
      return res.json({
        answer: `### NCERT Conceptual Explanation (Class ${classNum || '10'} - ${subject || 'General'}):
Your question: **${prompt}**

#### 1. Core Principle
According to the latest rationalized NCERT curriculum, this topic tests fundamental understanding and precision in terminology. Always start your CBSE answer with a one-sentence formal definition.

#### 2. Step-by-Step Board Exam Answer:
- **Point 1 (Definition & Law):** State the governing scientific law or mathematical theorem clearly with exact NCERT wording.
- **Point 2 (Mechanism/Proof):** Detail the step-by-step logic, chemical reaction mechanism, or geometrical construction.
- **Point 3 (Physical State / Units):** Mention SI units or physical states (s, l, g, aq) to avoid losing 0.5 marks.

#### 3. Board Examiner Tips:
- Highlight key keywords by underlining them in pencil.
- Draw labeled pencil diagrams for high-weightage questions.`,
        groundedInNcert: true,
      });
    }

    const systemInstruction = `You are 'CBSE Shiksha Guru', a distinguished senior CBSE teacher, NCERT textbook author, and board exam chief evaluator for Classes 6 to 12.
Answer student questions strictly aligned with the latest rationalized NCERT syllabus and official CBSE marking scheme.

Format your response using structured Markdown:
### 1. Conceptual Summary (NCERT Definition)
State the core concept clearly and authoritatively.

### 2. Step-by-Step Board Exam Model Answer
Provide points formatted exactly as expected in 3-mark or 5-mark board exam questions.
Include relevant formulas, balanced chemical equations (with state symbols), or ray/circuit diagram descriptions where applicable.

### 3. Key Keywords & Terms to Underline
List 3-5 crucial terms examiners look for in the answer sheet.

### 4. Common Student Mistakes & Mark Deductions
Explain typical blunders that cause mark loss in CBSE exams.

Keep the tone encouraging, crystal-clear, and academic.`;

    const userContent = `Student Class: Class ${classNum || '10'}
Subject: ${subject || 'Science'}
Chapter: ${chapterTitle || 'General Syllabus'}
Student's Doubt/Question: ${prompt}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userContent,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    const answer = response.text || 'Unable to generate response. Please try again.';
    res.json({ answer, groundedInNcert: true });
  } catch (error: any) {
    console.error('Error in doubt solver:', error);
    res.status(500).json({
      error: 'Failed to process doubt with AI.',
      details: error?.message || 'Server error',
    });
  }
});

// Endpoint: AI Dynamic Quiz Generator
app.post('/api/ai/generate-quiz', async (req, res) => {
  try {
    const { classNum, subject, chapterTitle, count = 3, difficulty = 'Medium' } = req.body;

    if (!ai) {
      return res.json({
        questions: [
          {
            id: `ai-gen-${Date.now()}-1`,
            classNum: classNum || '10',
            subjectId: subject || 'science',
            chapterId: 'custom',
            type: 'mcq',
            question: `In Class ${classNum} ${subject}, which property is directly emphasized in NCERT for ${chapterTitle || 'this topic'}?`,
            options: [
              'Fundamental conservation law and balanced condition',
              'Transient unpredictable fluctuations',
              'Arbitrary non-standard measurements',
              'Purely subjective qualitative impressions',
            ],
            correctOptionIndex: 0,
            explanation: 'NCERT strictly stresses standardized quantitative conservation principles and verified experimental laws.',
            ncertReference: `NCERT Class ${classNum} ${subject}`,
            difficulty: difficulty,
          },
        ],
      });
    }

    const promptText = `Generate ${count} authentic CBSE Board pattern multiple choice and assertion-reason questions for Class ${classNum}, Subject: ${subject}, Chapter: ${chapterTitle}. Difficulty: ${difficulty}.
Questions must strictly follow the latest rationalized NCERT textbook style and include step-by-step educational explanations.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          description: 'List of CBSE quiz questions',
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: 'Question text or assertion-reason statement' },
              type: { type: Type.STRING, description: 'mcq or assertion-reason' },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '4 distinct options'
              },
              correctOptionIndex: { type: Type.INTEGER, description: 'Index 0, 1, 2, or 3 of correct answer' },
              explanation: { type: Type.STRING, description: 'Detailed step-by-step NCERT explanation' },
              ncertReference: { type: Type.STRING, description: 'NCERT chapter and section citation' },
              difficulty: { type: Type.STRING, description: 'Easy, Medium, or Hard' }
            },
            required: ['question', 'options', 'correctOptionIndex', 'explanation', 'ncertReference'],
          },
        },
      },
    });

    const text = response.text || '[]';
    const parsed = JSON.parse(text);
    const enriched = parsed.map((q: any, idx: number) => ({
      ...q,
      id: `ai-gen-${Date.now()}-${idx}`,
      classNum: classNum || '10',
      subjectId: subject || 'science',
      chapterId: 'ai-generated',
      difficulty: q.difficulty || difficulty,
      type: q.type || 'mcq',
    }));

    res.json({ questions: enriched });
  } catch (error: any) {
    console.error('Error generating quiz:', error);
    res.status(500).json({ error: 'Failed to generate quiz questions' });
  }
});

// Vite middleware for development or static serving for production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`CBSE Shiksha server running at http://localhost:${port}`);
  });
}

startServer();
