export type CBSEClass = '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface Subject {
  id: string;
  name: string;
  code?: string;
  icon: string;
  color: string;
  description: string;
  classes: CBSEClass[];
}

export interface SlideItem {
  id: string;
  slideNumber: number;
  title: string;
  subtitle?: string;
  category: 'Overview' | 'Core Concept' | 'Diagram & Mechanism' | 'Formulas & Laws' | 'Board Questions' | 'Summary';
  badgeColor?: string;
  contentBullets: string[];
  calloutBox?: {
    title: string;
    text: string;
    variant: 'info' | 'warning' | 'formula' | 'success';
  };
  diagramType?: 'chemical_reaction' | 'human_heart' | 'ray_optics' | 'trig_circle' | 'projectile_parabola' | 'nephron' | 'electric_circuit';
  diagramTitle?: string;
  speakerNotes: string;
}

export interface ChapterSlideDeck {
  id: string;
  chapterId: string;
  title: string;
  subjectName: string;
  classNum: CBSEClass;
  slides: SlideItem[];
}

export interface Chapter {
  id: string;
  classNum: CBSEClass;
  subjectId: string;
  chapterNumber: number;
  title: string;
  ncertBookName: string;
  editionYear?: string;
  weightageMarks: number;
  estimatedReadTimeMinutes: number;
  summary: string;
  keyPoints: string[];
  keyDefinitions: { term: string; definition: string }[];
  formulasOrLaws?: { title: string; expression: string; explanation: string }[];
  ncertSolutions: {
    questionNumber: string;
    question: string;
    type: 'In-Text' | 'Exercise' | 'Exemplar';
    answer: string;
    markingPoints?: string[];
  }[];
  commonMistakes: string[];
  boardExamTips: string[];
  resourceMaterials?: {
    title: string;
    type: 'NCERT Official' | 'Exemplar' | 'Diksha' | 'Lab Manual' | 'Mind Map';
    description: string;
    url?: string;
  }[];
  slideDeck?: ChapterSlideDeck;
}

export interface QuizQuestion {
  id: string;
  classNum: CBSEClass;
  subjectId: string;
  chapterId: string;
  type: 'mcq' | 'assertion-reason' | 'case-based';
  casePassage?: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  ncertReference: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface PYQPaper {
  id: string;
  classNum: CBSEClass;
  subjectId: string;
  year: number;
  title: string;
  examType: 'Board Exam' | 'Sample Question Paper (SQP)' | 'Compartment' | 'Annual School Exam';
  totalMarks: number;
  timeAllowedMinutes: number;
  instructions: string[];
  sections: {
    name: string;
    description: string;
    questions: {
      qNumber: number;
      marks: number;
      questionText: string;
      subQuestions?: string[];
      modelAnswer: string;
      markingPoints?: string[];
      markingScheme: string[];
    }[];
  }[];
}

export interface FormulaItem {
  id: string;
  classNum: CBSEClass;
  subjectId: string;
  chapterTitle: string;
  title: string;
  formula: string;
  variables: string;
  application: string;
}

export interface UserProgress {
  selectedClass: CBSEClass;
  targetScore: number;
  completedChapters: string[];
  bookmarkedChapterIds: string[];
  bookmarkedPyqIds: string[];
  studyStreakDays: number;
  lastActiveDate: string;
  quizResults: {
    quizId: string;
    chapterId?: string;
    subjectId: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    timestamp: number;
  }[];
  notesNotesNotes?: Record<string, string>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  groundingSources?: {
    title: string;
    uri: string;
  }[];
  searchQueries?: string[];
}
